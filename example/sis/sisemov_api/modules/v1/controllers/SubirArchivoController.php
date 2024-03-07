<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use Ramsey\Uuid\Uuid;
use v1\models\Media;
use Yii;
use yii\db\Expression;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\UploadedFile;

class SubirArchivoController extends AuthController {

  public function actionGuardar() {
    if (!$this->req->isPost) {
      throw new NotFoundHttpException();
    }

    $usuario = $this->usuario;

    $transaccion = \Yii::$app->db->beginTransaction();
    try {
      $this->res->format = Response::FORMAT_JSON;
      $archivo = UploadedFile::getInstanceByName('archivo');
      if ($archivo === null) {
        $transaccion->rollBack();
        return (new Respuesta())
          ->esError()
          ->mensaje("No se recibió el archivo");
      }

      $sec = Yii::$app->getSecurity();
      $base = Yii::getAlias("@app") . "/web/assets/";

      $ruta = "recurso/";
      if (!is_dir($base . $ruta)) {
        mkdir($base . $ruta);
      }

      $ruta .= date("Y/");
      if (!is_dir($base . $ruta)) {
        mkdir($base . $ruta);
      }

      $ruta .= date("m/");
      if (!is_dir($base . $ruta)) {
        mkdir($base . $ruta);
      }

      $dominio = Yii::$app->getRequest()->getHostInfo() . "/assets/";
      do {
        $nombreArchivo = str_replace("-", "", $ruta . $sec->generateRandomString());
        if ($archivo->extension) {
          $nombreArchivo .= "." . $archivo->extension;
        }
      } while (is_file($base . $nombreArchivo));
      if (!$archivo->saveAs($base . $nombreArchivo)) {
        $transaccion->rollBack();
        return (new Respuesta())
          ->esError()
          ->mensaje("Ocurrió un problema al guardar el archivo");
      }

      $uuid = Uuid::uuid1();

      $modelo = new Media();

      if (strlen($archivo->name) > 255) {
        $transaccion->rollBack();
        return (new Respuesta())
          ->esError()
          ->mensaje("El nombre del archivo es demasiado largo (máximo 255 caracteres)");
      }
      $modelo->uuid();
      $modelo->creado = new Expression('now()');
      $modelo->idUsuario = $usuario->id;
      $modelo->uuid = $uuid->toString();
      $modelo->nombre = $archivo->name;
      $modelo->extension = $archivo->extension;
      $modelo->mimetype = $archivo->type;
      $modelo->ruta = $dominio . $nombreArchivo;

      $modelo->load($this->req->getBodyParams(), '');
      if (!$modelo->save()) {
        return (new Respuesta($modelo))
          ->mensaje("Hubo un problema al guardar Media");
      }

      $transaccion->commit();
      $modelo->refresh();
      // $modelo->save();

      return (new Respuesta())
        ->mensaje("Archivo subido correctamente")
        ->detalle($modelo);
      // ->detalle(["idUsuario" => $usuario->id, "uuid" => $sec->generateRandomString(), "nombre" => $archivo->name, "extension" => $archivo->extension, "ruta" => $dominio . $nombreArchivo ]);
      // ->detalle(["ruta" => $dominio . $nombreArchivo]);
    } catch (\Exception $e) {
      $transaccion->rollBack();
      return (new Respuesta())
        ->esError($e)
        ->mensaje("Hubo un error en el servidor");
    }
  }
}
