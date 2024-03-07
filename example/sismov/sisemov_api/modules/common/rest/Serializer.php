<?php

namespace common\rest;

use yii\rest\Serializer as YiiSerializer;
use common\data\Respuesta;

class Serializer extends YiiSerializer {

  public function serialize($data) {
    $data = parent::serialize($data);
    if ($data instanceof Respuesta) {
      return $data->cuerpo;
    }

    return $data;
  }

}
