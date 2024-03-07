<?php

namespace app\models;

class Sesion extends \common\models\Usuario {

  public function fields() {
    return [
      'id',
      'correo',
      'nombre',
      'estatus',
      'token' => function($model) {
        return $model->getAuthKey();
      }
    ];
  }

}