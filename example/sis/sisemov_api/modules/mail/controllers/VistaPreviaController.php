<?php

namespace app\modules\mail\controllers;

use v1\models\RecursoRevision;
use v1\models\Solicitud;
use v1\models\SolicitudAcuse;

class VistaPreviaController extends \yii\web\Controller {

  public function actionIndex() {
    $req = \Yii::$app->getRequest();
    $archivo = $req->get("archivo", "ejemplo/html");

    return $this->render("@app/modules/mail/views/{$archivo}");
  }

  public function actionCuerpo() {
    return $this->render("@app/modules/mail/views/layouts/cuerpo", ["cuerpo" => "<h1>Hola mundo</h1>"]);
  }

  public function actionPruebaCorreo() {
    $modelo = Solicitud::findOne('1172c366-2c5d-42a9-b3f4-3c8a2a9ef439');
    return $this->render("@app/modules/mail/views/layouts/cuerpo", ["cuerpo" => $this->renderPartial("@app/modules/v1/views/solicitud/acuse", ["solicitud" => $modelo, "usuario" => $modelo->usuario])]);
  }

  public function actionPruebaCorreoRr() {
    $modelo = RecursoRevision::findOne('e411573d-3592-410c-b829-49329a2ce07c');
    return $this->render("@app/modules/mail/views/layouts/cuerpo", ["cuerpo" => $this->renderPartial("@app/modules/v1/views/recurso-revision/acuse", ["recurso" => $modelo/* , "usuario" => $modelo->usuario */])]);
  }

  public function actionPruebaAcuse() {
    $modelo = SolicitudAcuse::findOne('e1a66644-81b7-4824-838b-85ef34f83f75');
    return $this->render("@app/modules/mail/views/layouts/cuerpo", ["cuerpo" => $this->renderPartial("@app/modules/v1/views/solicitud-acuse/correo", ["modelo" => $modelo])]);
  }
}
