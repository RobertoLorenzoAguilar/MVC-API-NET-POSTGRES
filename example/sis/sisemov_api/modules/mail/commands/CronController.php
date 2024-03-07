<?php

namespace app\modules\mail\commands;

use app\modules\mail\models\NotificacionCorreo;
use app\modules\mail\models\NotificacionCorreoAdjunto;
use yii\console\Controller;
use yii\db\Expression;

class CronController extends Controller {

  // ¿Cuántos correos se enviarán por minuto?
  # TODO: Se debe enviar uno cada 3 minutos para 
  private $limite = 1;
  # Este debe venir de un archivo de configuración o de alguna tabla
  private $correoDesde = ["siistai@transparenciasonora.org" => "Notificación SIISTAI"];
  private $correoAResponder = "transparenciasonora22@gmail.com";

  public function actionCheck() {
    $this->stdout("checked \n");
  }

  public function actionIndex() {

    $notificaciones = NotificacionCorreo::find()
      ->andWhere([
        "estatus" => NotificacionCorreo::ESTATUS_NUEVO,
        "enviado" => null
      ])
      ->orderBy(["prioridad" => SORT_ASC])
      ->limit($this->limite);

    foreach ($notificaciones->each() as $notif) {
      /** @var NotificacionCorreo $notif */
      # Guardar el que se este procesando
      $notif->estatus = NotificacionCorreo::ESTATUS_PROCESO;
      $notif->modificado = new Expression('now()');
      $notif->save();

      $view = new \yii\web\View();
      $contenido = $view->render("@app/modules/mail/views/layouts/cuerpo", [
        "cuerpo" => $notif->cuerpo
      ]);

      $destinos = $notif->receptor;
      if (!is_array($destinos)) {
        $notif->estatus = NotificacionCorreo::ESTATUS_ERROR;
        $notif->detalle = "No hay destinos para el correo";
        $notif->save();
        continue;
      }
      foreach ($destinos as $indice => $valor) {
        $destino = [$indice => $valor];
        if (is_numeric($indice)) {
          $destino = $valor;
        }
        try {

          $correo = \Yii::$app->mailer->compose()
            ->setFrom($this->correoDesde)
            // ->setReplyTo($this->correoAResponder)
            ->setTo($destino)
            ->setSubject($notif->asunto)
            ->setHtmlBody($contenido);

          foreach ($notif->adjuntos as $adjunto) {
            $ruta = str_replace("https://sistai.web.app/", \Yii::getAlias("@app"), $adjunto->ruta);
            if (is_file($ruta)) {
              $correo->attach($ruta);
            }
          }

          $resultado = $correo->send();

          if ($resultado) {
            $notif->enviado = new Expression('now()');
            $notif->estatus = NotificacionCorreo::ESTATUS_ENVIADO;
          } else {
            $notif->estatus = NotificacionCorreo::ESTATUS_ERROR;
            $notif->detalle = $correo->toString(); # Buscar la manera de obtener el error
          }
          $notif->save();

          $this->stdout("\n");
        } catch (\Exception $e) {

          $notif->estatus = $notif::ESTATUS_ERROR;
          $notif->detalle = $e->getMessage();
          $notif->save();

          $this->stdout(" Ocurrió un error al guardar {$e->getMessage()}\n");
        }
      }
    }
  }
}
