<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use yii\db\Expression;

class MediaController extends AuthController {

  public $modelClass = "app\models\Media";

  public function actionIndex() {
    $id = intval($this->req->get("id", ""));
    $buscar = trim($this->req->get("buscar", ""));

    $query = $this->queryInicial;

    if($id !== '') {
      $query->andWhere(["{{Media}}.id" => $id]);
    }

    if($buscar) {
      # Ejemplo de buscador
      
      $query->andWhere([
        "OR",
        ["ilike", "nombre", $buscar]
      ]);
      //
    }

    return new Respuesta($query, $this->limite, $this->pagina, $this->ordenar);
  }

  public function actionGuardar() {
    $id = intval($this->req->getBodyParam("id", ""));
    $modelo = null;

    if($id !== '') {
      $modelo = $this->modelClass::findOne($id);
    }
    if($modelo === null) {
      $modelo = new $this->modelClass();
      $modelo->creado = new Expression('now()');
    } else {
      $modelo->modificado = new Expression('now()');
    }

    $modelo->load($this->req->getBodyParams(), '');
    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("Hubo un problema al guardar Media");
    }

    $modelo->refresh();
    return (new Respuesta($modelo))
      ->mensaje("Media guardada");
  }

  public function actionEliminar() {
    $id = intval($this->req->getBodyParam("id", ""));
    $modelo = null;

    if($id !== '') {
      $modelo = $this->modelClass::findOne(["id" => $id]);
    }
    if($modelo === null) {
      return (new Respuesta())
        ->esError()
        ->mensaje("Media no encontrada");
    }
    $modelo->eliminado = new Expression('now()');
    if(!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("No se pudo eliminar Media");
    }

    return (new Respuesta())
      ->mensaje("Media eliminada");
  }
}