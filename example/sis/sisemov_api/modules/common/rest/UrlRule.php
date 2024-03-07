<?php

namespace common\rest;

class UrlRule extends \yii\rest\UrlRule {

  public $pluralize = false;

  public $patterns = [
    'PUT' => 'guardar',
    'DELETE' => 'eliminar',
    'GET,HEAD' => 'index',
    'POST' => 'guardar',
    'GET,HEAD' => 'index',
    '' => 'options',
  ];

}