<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use app\models\Usuario;

class PerfilController extends AuthController {

  public function actionIndex() {

    $id = \Yii::$app->getUser()->getId();

    $usuario = Usuario::find()
      ->andWhere(["id" => $id]);

    return new Respuesta($usuario, $this->limite, $this->pagina, $this->ordenar);

    /* $usuario = $this->usuario;

    return (new Respuesta())
      ->detalle($usuario->toArray()); */
  }
}
