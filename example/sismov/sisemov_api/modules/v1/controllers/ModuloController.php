<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use yii\db\Expression;

class ModuloController extends AuthController
{

  public $modelClass = "app\models\Modulo";

  public function actionIndex()
  {
    $id = trim($this->req->get("id", ""));
    $buscar = trim($this->req->get("buscar", ""));
    $notIn = trim($this->req->get("notIn", ""));

    $query = $this->queryInicial;

    if (!empty($id)) {
      $query->andWhere(["id" => $id]);
    }

    if (!empty($notIn)) {
      $explode = explode(",", $notIn);
      $query->andWhere(["NOT IN", "id", $explode]);
    }

    if ($buscar) {
      $query->andWhere([
        "OR",
        "f_unaccent([[nombre]]) ilike f_unaccent(:q)",
        "f_unaccent([[descripcion]]) ilike f_unaccent(:q)"
      ])->addParams([':q' => "%{$buscar}%"]);
    }

    return new Respuesta($query, $this->limite, $this->pagina, $this->ordenar);
  }

  public function actionGuardar()
  {
    $id = trim($this->req->getBodyParam("id", ""));
    $modelo = null;

    if (!empty($id)) {
      $modelo = $this->modelClass::findOne($id);
    }
    if ($modelo === null) {
      $modelo = new $this->modelClass();
      $modelo->creado = new Expression('now()');
      $modelo->uuid();
    } else {
      $modelo->modificado = new Expression('now()');
    }

    $modelo->load($this->req->getBodyParams(), '');
    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("Hubo un problema al guardar el Modulo");
    }

    $modelo->refresh();
    return (new Respuesta($modelo))
      ->mensaje("Modulo guardado");
  }

  public function actionEliminar()
  {
    $id = trim($this->req->getBodyParam("id", ""));
    $modelo = null;

    if ($id !== "") {
      $modelo = $this->modelClass::findOne(["id" => $id]);
    }
    if ($modelo === null) {
      return (new Respuesta())
        ->esError()
        ->mensaje("Modulo no encontrado");
    }
    $modelo->eliminado = new Expression('now()');
    if (!$modelo->save()) {
      return (new Respuesta($modelo))
        ->mensaje("No se pudo eliminar el Modulo");
    }

    return (new Respuesta())
      ->mensaje("Modulo eliminado");
  }
}
