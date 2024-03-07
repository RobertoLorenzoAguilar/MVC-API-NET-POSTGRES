<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use yii\db\Expression;

class LegislaturaController extends AuthController {

  public $modelClass = "app\models\Legislatura";

  public function actionIndex() {
    $id = trim($this->req->get("id", ""));
    $actual = intval($this->req->get("actual", ""));
    $buscar = trim($this->req->get("q", ""));

    $query = $this->queryInicial;

    if($id !== '') {
      $query->andWhere(["id" => $id]);
    }

    if ($actual > 0) {
      $query->andWhere(['actual' => true]);
    }

    if($buscar) {
      # Ejemplo de buscador
      
      $query->andWhere([
        "OR",
        ["ilike", "descripcion", $buscar],
        ["ilike", "clave", $buscar]
      ]);
      //
    }

    return new Respuesta($query, $this->limite, $this->pagina, $this->ordenar);
  }

  public function actionGuardar() {
    $id = trim($this->req->getBodyParam("id", ""));
    $actual = intval($this->req->getBodyParam("actual", ''));
    $modelo = null;

    if($id !== '') {
      $modelo = $this->modelClass::findOne($id);
    }
    if($modelo === null) {
      $modelo = new $this->modelClass();
      $modelo->uuid();
      $modelo->creado = new Expression('now()');
    } else {
      $modelo->modificado = new Expression('now()');
    }

    $modelo->load($this->req->getBodyParams(), '');

    if ($actual > 0) {
      $modelo->actual = true;

      $actualAnterior = $this->modelClass::find()
        ->andWhere(['actual' => true])
        ->andWhere(['eliminado' => null])
        ->one();
      
      if ($actualAnterior) {
        $actualAnterior->actual = false;
        $actualAnterior->save();
      }
    } else {
      $modelo->actual = false;
    }
    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("Hubo un problema al guardar Legislatura");
    }

    $modelo->refresh();
    return (new Respuesta($modelo))
      ->mensaje("Legislatura guardado");
  }

  public function actionEliminar() {
    $id = trim($this->req->getBodyParam("id", ""));
    $modelo = null;

    if($id !== '') {
      $modelo = $this->modelClass::findOne(["id" => $id]);
    }
    if($modelo === null) {
      return (new Respuesta())
        ->esError()
        ->mensaje("Legislatura no encontrado");
    }
    $modelo->eliminado = new Expression('now()');
    if(!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("No se pudo eliminar el registro");
    }

    return (new Respuesta())
      ->mensaje("Legislatura eliminada");
  }
}