<?php

namespace v1\controllers;

use common\rest\JsonController;

class DefaultController extends JsonController {

  public function actionIndex() {
    return [];
  }

  public function actionGuardar() {
    return ["guardar", "Es post " . \Yii::$app->request->isPost];
  }
  
  public function actionDelete() {
    return "delete";
  }
}