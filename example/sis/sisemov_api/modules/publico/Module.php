<?php

namespace app\modules\publico;

use Yii;

/**
 * v1 module definition class
 */
class Module extends \yii\base\Module {

  /**
   * {@inheritdoc}
   */
  public $controllerNamespace = 'app\modules\publico\controllers';

  /**
   * {@inheritdoc}
   */
  public function init() {
    parent::init();
    $response = Yii::$app->getResponse();
    $headers = $response->getHeaders();
    
    $headers->set('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    $headers->set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    $headers->set('Access-Control-Allow-Origin', '*');
    $headers->set('Access-Control-Request-Method', 'POST, GET, DELETE, PUT, OPTIONS');
    $headers->set('Access-Control-Allow-Credentials', 'true');
    $headers->set('Access-Control-Max-Age', 86400);
    if (Yii::$app->getRequest()->isOptions) {
      Yii::$app->end();
    } // */
    Yii::$app->getUser()->enableSession = false;
  }

}
