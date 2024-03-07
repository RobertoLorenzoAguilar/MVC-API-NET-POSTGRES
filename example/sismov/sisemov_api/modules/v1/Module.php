<?php

namespace v1;

use Yii;

/**
 * v1 module definition class
 */
class Module extends \yii\base\Module {

  /**
   * {@inheritdoc}
   */
  public $controllerNamespace = 'v1\controllers';

  /**
   * {@inheritdoc}
   */
  public function init() {
    parent::init();
    $response = Yii::$app->getResponse();
    $headers = $response->getHeaders();
    
    $headers->set('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    $headers->set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization,X-Requested-With');
    $headers->set('Access-Control-Allow-Origin', '*');
    $headers->set('Access-Control-Request-Method', 'POST, GET, DELETE, PUT, OPTIONS');
    $headers->set('Access-Control-Allow-Credentials', 'true');
    $headers->set('Access-Control-Max-Age', 86400);
    if (Yii::$app->getRequest()->isOptions) {
      Yii::$app->end();
    } // */
    Yii::$app->getUser()->enableSession = false;
    Yii::$app->getUser()->identityClass = 'common\models\Usuario';
  }

}
