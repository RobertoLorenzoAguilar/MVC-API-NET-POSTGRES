<?php

namespace pdf\controllers;

use pdf\web\Controller;
use v1\models\OrdenDia;
use v1\models\OrdenDiaAsistencia;
use v1\models\OrdenDiaEvento;
use v1\models\OrdenDiaMesaDirectiva;
use v1\models\OrdenDiaSolicitudPalabra;
use v1\models\OrdenDiaTema;

class SesionController extends Controller {


  public function actionIndex() {

  }

  public function actionAsistencia() {
    $request = \Yii::$app->request;
    $id = $request->get('minuta');

    $configuracion = [
      'mode' => 'utf-8',
      'format' => 'letter',
      'margin_top' => '40',
    ];

    $ordenDia = OrdenDia::findOne($id);
    $ordenDiaTema = OrdenDiaTema::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaAsistencia = OrdenDiaAsistencia::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaMesaDirectiva = OrdenDiaMesaDirectiva::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaSolicitudPalabra = OrdenDiaSolicitudPalabra::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();


    $view = new \yii\web\View();
    $nombre = "Asistencia_{$ordenDia->minutaSesionNombre}";

    $header = $view->render("@app/modules/pdf/views/sesion/header", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
      "ordenDiaSolicitudPalabra" => $ordenDiaSolicitudPalabra,
    ]);

    $htmlPDF = $view->render("@app/modules/pdf/views/sesion/sub-header", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
      "ordenDiaSolicitudPalabra" => $ordenDiaSolicitudPalabra,
    ]);

    $htmlPDF .= $view->render("@app/modules/pdf/views/sesion/asistentes", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
      "ordenDiaSolicitudPalabra" => $ordenDiaSolicitudPalabra,
    ]);

    $pdf = self::crearPDF(
      $nombre,
      $htmlPDF,
      $configuracion,
      false,
      $header,
      "",
      ""
    );

    \Yii::$app->getResponse()->sendContentAsFile($pdf, "{$nombre}.pdf");
  }

  public function actionMinuta() {
    $request = \Yii::$app->request;
    $id = $request->get('minuta');

    $configuracion = [
      'mode' => 'utf-8',
      'format' => 'letter',
      'margin_top' => '40',
    ];

    $ordenDia = OrdenDia::findOne($id);
    $ordenDiaTema = OrdenDiaTema::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaAsistencia = OrdenDiaAsistencia::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaMesaDirectiva = OrdenDiaMesaDirectiva::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaSolicitudPalabra = OrdenDiaSolicitudPalabra::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();

    $view = new \yii\web\View();

    $nombre = "Minuta_{$ordenDia->minutaSesionNombre}";

    $header = $view->render("@app/modules/pdf/views/sesion/header", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
      "ordenDiaSolicitudPalabra" => $ordenDiaSolicitudPalabra,
    ]);

    $htmlPDF = $view->render("@app/modules/pdf/views/sesion/sub-header", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
      "ordenDiaSolicitudPalabra" => $ordenDiaSolicitudPalabra,
    ]);

    $htmlPDF .= $view->render("@app/modules/pdf/views/sesion/minuta", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
      "ordenDiaSolicitudPalabra" => $ordenDiaSolicitudPalabra,
    ]);

    $pdf = self::crearPDF(
      $nombre,
      $htmlPDF,
      $configuracion,
      false,
      $header,
      "",
      ""
    );

    \Yii::$app->getResponse()->sendContentAsFile($pdf, "{$nombre}.pdf");
  }

  public function actionOrdenDia() {
    $request = \Yii::$app->request;
    $id = $request->get('minuta');

    $configuracion = [
      'mode' => 'utf-8',
      'format' => 'letter',
      'margin_top' => '40',
    ];

    $ordenDia = OrdenDia::findOne($id);
    $ordenDiaTema = OrdenDiaTema::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->orderBy('consecutivo')->all();
    $ordenDiaAsistencia = OrdenDiaAsistencia::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaMesaDirectiva = OrdenDiaMesaDirectiva::find()->andWhere(['idOrdenDia' => $id, 'eliminado' => null])->all();
    $ordenDiaEvento = OrdenDiaEvento::find()->andWhere(['idOrdenDia' => $id])->orderBy('creado')->all();

    $view = new \yii\web\View();

    $nombre = "Orden_del_dia_{$ordenDia->minutaSesionNombre}";

    $header = $view->render("@app/modules/pdf/views/sesion/header", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaMesaDirectiva" => $ordenDiaMesaDirectiva,
    ]);

    $htmlPDF = $view->render("@app/modules/pdf/views/sesion/sub-header", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
    ]);

    $htmlPDF .= $view->render("@app/modules/pdf/views/sesion/orden-dia", [
      "ordenDia" => $ordenDia,
      "ordenDiaTema" => $ordenDiaTema,
      "ordenDiaAsistencia" => $ordenDiaAsistencia,
      "ordenDiaEvento" => $ordenDiaEvento,
    ]);

    $pdf = self::crearPDF(
      $nombre,
      $htmlPDF,
      $configuracion,
      false,
      $header,
      "",
      ""
    );

    \Yii::$app->getResponse()->sendContentAsFile($pdf, "{$nombre}.pdf");
  }


  public  function fecha($fecha){
    $fechaSesion = new \DateTime($fecha);
    $fechaSesion->setTimezone(new \DateTimeZone('America/Hermosillo'));

    return $fechaSesion->format('d m Y H:i');
  }

}
