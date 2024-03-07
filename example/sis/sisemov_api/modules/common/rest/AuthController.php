<?php

namespace common\rest;

use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;

class AuthController extends JsonController {

  /**
   * @var \common\models\Usuario $usuario
   */
  public $usuario;
  public $permisos = [];

  public function behaviors() {
    $behavior = parent::behaviors();
    $behavior["authenticator"]["authMethods"] = [
      QueryParamAuth::className(),
      HttpBearerAuth::className()
    ];
    return $behavior;
  }

  public function beforeAction($action) {
    parent::beforeAction($action);

    $this->usuario = \Yii::$app->getUser()->getIdentity();

    if (!empty($this->permisos)) {
      $this->usuario->cargarPermisos($this->permisos);
    }

    return true;
  }
}
