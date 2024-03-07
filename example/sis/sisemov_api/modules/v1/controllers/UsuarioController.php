<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use app\models\Permiso;
use app\models\PermisoUsuario;
use app\models\Usuario;
use app\models\UsuarioMedia;
use yii\db\Expression;

class UsuarioController extends AuthController {

  public $modelClass = "app\models\Usuario";

  public function actionIndex() {
    $id = trim($this->req->get("id", ""));
    $buscar = trim($this->req->get("q", ""));
    $in = trim($this->req->get("in", ""));
    $ponencia = intval($this->req->get('ponencia', ''));

    $query = $this->queryInicial;

    if ($ponencia > 0) {
      $permisoUsuario = PermisoUsuario::find()
        ->andWhere(['eliminado' => null]);

      $ids = [];
      foreach ($permisoUsuario->each() as $pu) {
        $ids[] = $pu['idUsuario'];
      }

      $query->andWhere(['id' => $ids]);
    }

    if ($id !== "") {
      $query->andWhere(["id" => $id]);
    }

    if (!empty($in)) {
      $explode = explode(",", $in);
      $query->andWhere(["id" => $explode]);
    }

    if ($buscar) {
      $query->andWhere([
        "OR",
        "f_unaccent([[nombre]]) ilike f_unaccent(:q)",
        "f_unaccent([[clave]]) ilike f_unaccent(:q)",
        "f_unaccent([[correo]]) ilike f_unaccent(:q)"
      ])->addParams([':q' => "%{$buscar}%"]);
    }

    return new Respuesta($query, $this->limite, $this->pagina, $this->ordenar);
  }

  public function actionGuardar() {
    $id = trim($this->req->getBodyParam("id", ""));
    $pwd = trim($this->req->getBodyParam("pwd", ""));
    $permisos = $this->req->getBodyParam("permisos", []);

    $modelo = null;
    if ($id !== "") {
      $modelo = $this->modelClass::findOne($id);
    }

    $tran = \Yii::$app->getDb()->beginTransaction();
    try {
      if ($modelo === null) {
        $modelo = new $this->modelClass();
        $modelo->creado = new Expression('now()');
        $modelo->uuid();
      } else {
        $modelo->modificado = new Expression('now()');
      }
      /** @var \v1\models\Usuario $modelo */

      $modelo->load($this->req->getBodyParams(), '');
      if ($pwd !== "") {
        $modelo->agregarClave($pwd);
      }
      if (!$modelo->save()) {
        return (new Respuesta($modelo))
          ->mensaje("Hubo un problema al guardar Usuario");
      }

      PermisoUsuario::deleteAll(["idUsuario" => $modelo->id]);
      foreach ($permisos as $permiso) {
        $permisoUsuario = new PermisoUsuario();

        $permisoUsuario->idUsuario = $modelo->id;
        $permisoUsuario->idPermiso = $permiso;
        $permisoUsuario->uuid();
        $permisoUsuario->asignado = new Expression('now()');

        if (!$permisoUsuario->save()) {
          $tran->rollBack();
          return (new Respuesta($permisoUsuario))
            ->mensaje("Hubo un problema al guardar la permisos");
        }
      }

      $tran->commit();
      $modelo->refresh();

      return (new Respuesta($modelo))
        ->mensaje("Usuario guardado con éxito.");
    } catch (\Exception $e) {
      $tran->rollBack();
      return (new Respuesta())
        ->esError()
        ->mensaje("Hubo un error en el servidor");
    }
  }

  public function actionEditar() {
    $modelo = null;
    $usuario = $this->usuario;

    if ($usuario) {
      $modelo = $this->modelClass::findOne($usuario->id);
    }

    $tran = \YII::$app->getDb()->beginTransaction();
    if ($modelo === null) {
      return (new Respuesta($modelo))
        ->mensaje("No se encontró el usuario.");
    } else {
      $modelo->modificado = new Expression('now()');
    }
    $modelo->load($this->req->getBodyParams(), '');
    if (!$modelo->save()) {
      $tran->rollBack();
      return (new Respuesta($modelo))
        ->mensaje("Hubo un problema al guardar Usuario");
    }
    $tran->commit();
    $modelo->refresh();
    return (new Respuesta($modelo))
      ->mensaje("Perfil actualizado.");
  }

  public function actionDesbloquearClave() {
    $id = intval($this->req->getBodyParam("id", ""));
    $usuario = Usuario::findOne($id);

    $usuario->falloClave = 0;
    $usuario->ultimoFallo = new Expression('now()');

    if (!$usuario->save())
      return (new Respuesta())
        ->esError()
        ->mensaje("Hubo un error en el servidor");


    return (new Respuesta())
      ->mensaje("Cuenta reestablecida con Éxito");
  }

  public function actionEliminar() {
    $id = intval($this->req->getBodyParam("id", ""));
    $modelo = null;

    if ($id !== '') {
      $modelo = $this->modelClass::findOne(["id" => $id]);
    }
    if ($modelo === null) {
      return (new Respuesta())
        ->esError()
        ->mensaje("Usuario no encontrado");
    }
    $modelo->eliminado = new Expression('now()');
    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("No se pudo eliminar Usuario");
    }

    return (new Respuesta())
      ->mensaje("Usuario eliminado");
  }

  public function actionCambiarClave() {
    $idUsuario =  intval($this->req->getBodyParam("idUsuario", ""));
    $claveActual = trim($this->req->getBodyParam("claveActual", ""));
    $clave = trim($this->req->getBodyParam("clave", ""));

    $modelo = Usuario::find()
      ->andWhere(["id" => $idUsuario])
      ->one();

    if ($modelo === null) {
      return (new Respuesta())
        ->esError()
        ->mensaje("Ocurrió un error al leer el perfil");
    }
    /** @var \v1\models\Usuario $modelo */
    if (!$modelo->validarClave($claveActual)) {
      $modelo->addError("clave", "La clave actual no es correcta");
      return (new Respuesta($modelo));
    }

    $modelo->agregarClave($clave);
    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("Ocurrió un error al guardar el perfil");
    }

    $modelo->refresh();
    return (new Respuesta($modelo))
      ->mensaje("Contraseña actualizada");
  }

  public function actionCambiarFoto() {
    $foto = $this->req->getBodyParam("foto", "");

    $modelo = Usuario::find()
      ->andWhere(["id" => \Yii::$app->getUser()->getId()])
      ->one();

    if ($modelo === null) {
      return (new Respuesta())
        ->esError()
        ->mensaje("Ocurrió un error al leer el perfil");
    }

    UsuarioMedia::deleteAll(["idUsuario" => $modelo->id]);
    $mediaUsuario = new UsuarioMedia();

    $mediaUsuario->idMedia = $foto["id"];
    $mediaUsuario->idUsuario = $modelo->id;

    if (!$mediaUsuario->save()) {
      return (new Respuesta($mediaUsuario))
        ->mensaje("Hubo un problema al guardar Foto de Perfil");
    }

    return (new Respuesta($mediaUsuario))
      ->mensaje("Foto de Perfil Actualizada");
  }
}
