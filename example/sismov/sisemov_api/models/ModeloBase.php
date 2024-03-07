<?php

namespace app\models;

use Ramsey\Uuid\Uuid;

class ModeloBase extends \yii\db\ActiveRecord {

  public function uuid() {
    $pk = static::primaryKey();
    if (is_array($pk) && count($pk) > 1) {
      return null;
    }
    $pk = $pk[0];
    do {
      $uuid = (Uuid::uuid4())
        ->toString();

      $modelo = static::find()
        ->andWhere([$pk => $uuid]);
    } while ($modelo->exists());
    $this->{$pk} = $uuid;
    return $uuid;
  }

}