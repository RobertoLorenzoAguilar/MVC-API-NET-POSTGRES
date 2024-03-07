<?php

$params = \Yii::$app->params;
$baseUrl = $url = "https://sistai.web.app/";
$anoActual = intval(date("Y"));

$fecha = new \DateTime('now', new \DateTimeZone('America/Hermosillo'));
$meses = [
  "01" => "Enero",
  "02" => "Febrero",
  "03" => "Marzo",
  "04" => "Abril",
  "05" => "Mayo",
  "06" => "Junio",
  "07" => "Julio",
  "08" => "Agosto",
  "09" => "Septiembre",
  "10" => "Octubre",
  "11" => "Noviembre",
  "12" => "Diciembre",
];
$mes = "";
$m = $fecha->format("m");
if (isset($meses[$m])) {
  $mes = $meses[$m];
}

?>
<style type="text/css">
  @media only screen and (min-width: 620px) {
    .u-row {
      width: 1000px !important;
    }

    .u-row .u-col {
      vertical-align: top;
    }

    .u-row .u-col-49p17 {
      width: 295.02px !important;
    }

    .u-row .u-col-50p83 {
      width: 304.98px !important;
    }

    .u-row .u-col-100 {
      width: 1000px !important;
    }

  }

  @media (max-width: 620px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }

    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }

    .u-row {
      width: calc(100% - 40px) !important;
    }

    .u-col {
      width: 100% !important;
    }

    .u-col>div {
      margin: 0 auto;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }

  p {
    margin: 0;
  }

  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }

  * {
    line-height: inherit;
  }

  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }

  @media (max-width: 480px) {
    .hide-mobile {
      max-height: 0px;
      overflow: hidden;
      display: none !important;
    }

  }

  table,
  td {
    color: #000000;
  }

  a {
    color: #0000ee;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    #u_content_image_1 .v-src-width {
      width: auto !important;
    }

    #u_content_image_1 .v-src-max-width {
      max-width: 44% !important;
    }

    #u_content_image_2 .v-container-padding-padding {
      padding: 30px 40px 0px 0px !important;
    }

    #u_content_heading_1 .v-container-padding-padding {
      padding: 30px 22px 10px !important;
    }

    #u_content_heading_1 .v-text-align {
      text-align: center !important;
    }

    #u_content_text_1 .v-container-padding-padding {
      padding: 10px 22px 20px !important;
    }

    #u_content_text_1 .v-text-align {
      text-align: center !important;
    }

    #u_content_button_2 .v-text-align {
      text-align: center !important;
    }

    #u_content_heading_2 .v-container-padding-padding {
      padding: 50px 22px 10px !important;
    }

    #u_content_heading_2 .v-text-align {
      text-align: left !important;
    }

    #u_content_text_2 .v-container-padding-padding {
      padding: 10px 22px !important;
    }

    #u_content_text_3 .v-container-padding-padding {
      padding: 10px 22px 60px !important;
    }

    #u_content_menu_2 .v-padding {
      padding: 6px 20px !important;
    }

    #u_content_text_4 .v-container-padding-padding {
      padding: 10px 22px 40px !important;
    }
  }

  body {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }
</style>



<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet" type="text/css">
<!--<![endif]-->

<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f1f1f1;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f1f1f1;"><![endif]-->


        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1000px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #0d3880;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!-->
                  <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <table id="u_content_image_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 30px 33px;font-family:arial,helvetica,sans-serif;" align="left">

                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px; width:30%;" align="left">
                                  <a href="<?= $url ?>" target="_blank">
                                    <img align="left" border="0" src="<?= $baseUrl ?>/logo.png" alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 200px;" class="v-src-width v-src-max-width" />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 10px; vertical-align: middle; text-align: right;">
                                  <p style="font-size: 14px; line-height: 170%;">
                                    <span style="font-family: Lato, sans-serif; font-size: 18px; line-height: 30.6px;">
                                      <strong>Hermosillo, Sonora a <?= $fecha->format("d") ?> de <?= $mes ?> de <?= $anoActual ?></strong>
                                    </span>
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%;">
                                    <span style="font-family: Lato, sans-serif; font-size: 14px; line-height: 18px;">
                                      <strong>Sistema de notificaciones del Instituto Sonorense de Transparencia,<br />Acceso a la Información Pública y Datos Personales</strong>
                                    </span>
                                  </p>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>

        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1000px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!-->
                  <div style="padding: 10px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <?= $cuerpo ?>
                    <br>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>


        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1000px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #2a2929;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #2a2929;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!-->
                  <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;width: 70%" align="left">
                            <div class="v-text-align" style="color: #adadac; line-height: 190%; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 100%;"><span style="font-family: Lato, sans-serif; font-size: 14px; color: #fff; line-height: 10px;">Este correo es una notificación automatizada de información interna del Instituto Sonorense de Transparencia, Acceso a la Información Pública y Datos Personales. Si usted no debió recibir este correo, reporte de inmediato su situación a los números y datos de contacto que anexamos a este pie de página. <a style="color: #fff" href="mailto:transparenciasonora22@gmail.com">transparenciasonora22@gmail.com</a></span></p>
                            </div>
                          </td>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                            <div class="v-text-align" style="color: #adadac; line-height: 190%; text-align: right; word-wrap: break-word;">
                              <p style="font-size: 14px; line-height: 100%;"><span style="font-family: Lato, sans-serif; font-size: 12px; color: #fff; line-height: 10px;">Instituto Sonorense de Transparencia</span></p>
                              <p style="font-size: 14px; line-height: 100%;"><span style="font-family: Lato, sans-serif; font-size: 12px; color: #fff; line-height: 10px;">Blvd. Luis Encinas J. 258, Valle Hermoso</span></p>
                              <p style="font-size: 14px; line-height: 100%;"><span style="font-family: Lato, sans-serif; font-size: 12px; color: #fff; line-height: 10px;">Hermosillo, Sonora. C.P. 83209</span></p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>



        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1000px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!-->
                  <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <tbody>
                                <tr style="vertical-align: top">
                                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span>&#160;</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div>
                  <!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>


        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->