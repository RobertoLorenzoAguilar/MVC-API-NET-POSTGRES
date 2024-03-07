<?php

namespace excel\web;

use Mpdf\Mpdf;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\QueryParamAuth;
use yii\filters\Cors;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class Controller extends \yii\web\Controller {

  /**
   * Si es verdadero imprime el contenido en el web
   * @var boolean $html
   */
  public $html = false;

  /**
   * Mostrar vista previa del pdf o descargar
   * true = descargar
   * @var boolean $descargar
   */
  public $descargar = false;

  /**
   * Configuración para la librería mpdf
   * @var array $configuracion
   */
  public $configuracion = [
    "format" => "letter",
    "default_font" => "Roboto",
  ];

  /**
   * Texto para la marca de agua
   * @var string $marcaDeAguaTexto
   */
  public $marcaDeAguaTexto = "";

  /**
   * Habilitar la marca de agua
   * @var boolean $html
   */
  public $marcaDeAgua = false;

  /**
   * Encoger las tablas para que quepan
   * @var int $encogerTablas
   */
  public $encogerTablas = 0;

  /**
   * Mantener proporciones de tabla
   * @var boolean $mantenerProporcionTabla
   */
  public $mantenerProporcionTabla = true;

  /**
   * Nombre del archivo al descargar
   * @var string $nombreArchivo
   */
  public $nombreArchivo = "";

  /**
   * Estilos para el pdf
   * @var string $hojaDeEstilo
   */
  public $hojaDeEstilo = "";

  /**
   * header para el pdf
   * @var string $header
   */
  public $header;

  /**
   * @var \yii\web\Request $req
   */
  public $req;

  /**
   * @var \yii\web\Response $res
   */
  public $res;

  //*
  /* public function behaviors() {
    $behavior = parent::behaviors();
    $behavior["authenticator"] = [
      "class" => CompositeAuth::className(),
      "authMethods" => [
        QueryParamAuth::className(),
      ]
    ];
    return $behavior;
  }  */// */

  public function beforeAction($action) {
    parent::beforeAction($action);

    $basePath = \Yii::getAlias("@app");
    $this->req = \Yii::$app->getRequest();
    $this->res = \Yii::$app->getResponse();
    $this->html = intval($this->req->get("html", 0)) === 1;

    if ($this->html) {
      $this->res->format = \yii\web\Response::FORMAT_HTML;
    }

    $this->descargar = intval($this->req->get("descargar", "")) === 1;
    $this->marcaDeAgua = false; // intval($this->req->get("wm", 0)) === 1;
    $this->hojaDeEstilo = file_get_contents("{$basePath}/web/css/pdf.css");

    return true;
  }

  public static function crearPDF($nombreArchivo, $contenido, $configuracion, $descargar = true, $header = "", $footer = "", $marcaAgua = "") {
    $basePath = \Yii::getAlias("@app");

    $mpdf = new Mpdf($configuracion);
    //$mpdf->WriteHTML($hojaDeEstilo, \Mpdf\HTMLParserMode::HEADER_CSS);
    $mpdf->showWatermarkText = false;
    $mpdf->watermarkTextAlpha = 0.30;
    $mpdf->shrink_tables_to_fit = 0;
    $mpdf->keep_table_proportions = true;
    $mpdf->SetTitle($nombreArchivo);
    $mpdf->SetDisplayMode('default');

    $mpdf->SetHTMLHeader($header); //SetHTMLFooter($footer);

    if ($footer !== "") {
      $mpdf->SetHTMLFooter($footer); //SetHTMLFooter($footer);
    } else {
      $mpdf->SetFooter('Pag. {PAGENO} de {nbpg}');
    }
    if ($marcaAgua !== "") {
      $mpdf->SetWatermarkText($marcaAgua);
      $mpdf->showWatermarkText = true;
    }
    $mpdf->keep_table_proportions = TRUE;
    $stylesheet = file_get_contents("{$basePath}/web/css/pdf/pdf.css");
    $mpdf->WriteHTML($stylesheet, \Mpdf\HTMLParserMode::HEADER_CSS);

    $mpdf->showImageErrors = false;
    $mpdf->useSubstitutions = false;
    $mpdf->simpleTables = false;
    $mpdf->WriteHTML($contenido, \Mpdf\HTMLParserMode::HTML_BODY, ini_set("pcre.backtrack_limit", (strlen($contenido) * 5000)));
    if ($descargar == true) {
      return $mpdf->Output($nombreArchivo . ".pdf", \Mpdf\Output\Destination::STRING_RETURN);
    } else {
      $mpdf->Output($nombreArchivo . ".pdf", "I");
      \Yii::$app->end();
    }
  }

  public function exportarPdf($contenido) {
    try {
      // $config = array_merge($this->configuracion, ['format' => 'A4']);
      $mpdf = new Mpdf($this->configuracion);
      if (!empty($this->header)) {
        $mpdf->SetHTMLHeader($this->header);
      }
      $mpdf->WriteHTML($this->hojaDeEstilo, \Mpdf\HTMLParserMode::HEADER_CSS);
      $mpdf->SetWatermarkText($this->marcaDeAguaTexto);
      $mpdf->watermark_font = 'DejaVuSansCondensed';
      $mpdf->showWatermarkText = $this->marcaDeAgua;
      $mpdf->watermarkTextAlpha = 0.30;
      $mpdf->shrink_tables_to_fit = $this->encogerTablas;
      $mpdf->keep_table_proportions = $this->mantenerProporcionTabla;
      $mpdf->SetTitle($this->nombreArchivo);
      $mpdf->SetDisplayMode('default');
      $mpdf->SetFooter('Pag. {PAGENO} de {nbpg}');
      $mpdf->showImageErrors = false;
      $mpdf->useSubstitutions = false;
      $mpdf->simpleTables = false;
      $mpdf->WriteHTML($contenido, \Mpdf\HTMLParserMode::HTML_BODY);
      $dest = $this->descargar ? "D" : "I";
      if (strpos($this->nombreArchivo, '.pdf') === false) {
        $this->nombreArchivo .= ".pdf";
      }
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Expose-Headers: *');
      $mpdf->Output($this->nombreArchivo, $dest);
    } catch (\Exception $exception) {
      throw $exception;
    }
    \Yii::$app->end();
  }

  public function afterAction($action, $result) {
    if (!$this->html) {
      $result = str_replace('disabled="disabled"', '', $result);
      return $this->exportarPdf($result);
    }
    $this->marcaDeAgua = intval($this->req->get("wm", 1)) === 1;
    $watermark = "background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' " .
      "height='100px' width='100px'><text transform='translate(20, 100) rotate(-45)' fill='rgb(210,210,210)' " .
      "font-size='18'>{$this->marcaDeAguaTexto}</text></svg>\");";
    if (!$this->marcaDeAgua) {
      $watermark = "";
    }
    $fondo = ".fondo-privado { background-color: rgb(141,216,169,0.7) !important; }";
    $result = str_replace("<pagebreak>", "<br>", $result);
    $result = "<style type=\"text/css\">{$this->hojaDeEstilo}\nbody{{$watermark}}\n{$fondo}</style>{$result}";
    return $result;
  }

  /**
   * funcion para generar cualquier Excel
   */
  public static function Excel(
    $titulo = "Reporte",
    $pestania = "Reporte", $nombre = "Reporte", $etiquetas = [], $campos = [], $datos, $usarApuntador = true, $isArray = false, $respaldo = false) {
    // Create new Spreadsheet object
    $basePath = \Yii::getAlias("@app");

    $spreadsheet = new Spreadsheet();
    $spreadsheet->setActiveSheetIndex(0);
    $spreadsheet->getSecurity()->setLockWindows(false);
    $spreadsheet->getSecurity()->setLockStructure(false);
    $spreadsheet->getActiveSheet()->getProtection()->setSheet(false);
    $spreadsheet->getActiveSheet()->getProtection()->setSort(false);
    $spreadsheet->getActiveSheet()->getProtection()->setInsertRows(false);
    $spreadsheet->getActiveSheet()->getProtection()->setFormatCells(false);

    // Set document properties
    $spreadsheet->getProperties()->setCreator('ISTAI')->setLastModifiedBy('ISTAI')->setTitle($titulo)
      ->setDescription($titulo);

    $spreadsheet->getActiveSheet()->setTitle($pestania);
    $style_titulo = [
      'font' => [
        'bold' => true,
        'size' => 13,
      ],
      'alignment' => [
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
      ]
    ];

    $style_titulo_etiquestas = [
      'font' => [
        'bold' => true,
        'size' => 11,
        'color' => ['rgb' => '000000'],
        'background' => ['rgb' => '4c5966'],
      ],
      'alignment' => [
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER_CONTINUOUS,
      ],
      'fill' => [
        'type' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
        'rotation' => 90,
        'startcolor' => ['argb' => '000000',],
        'endcolor' => ['argb' => '000000',],
      ],
    ];

    $spreadsheet->setActiveSheetIndex(0);
    $i = $respaldo ? 1 : 7;
    $ltrs = [];
    $ltr2 = 65;
    $ltr = 65;
    foreach ($etiquetas as $v) {
      if ($ltr > 90) {
        $letra = "A" . chr($ltr2);
      } else {
        $letra = chr($ltr);
      }
      $ltrs[] = $letra;

      $spreadsheet->getActiveSheet()->setCellValue($letra . $i, $v);
      if ($ltr > 90) {
        $ltr2++;
      }
      $ltr++;
    }

    // Add some data
    $i++; //Es el renglón inicial
    if ($usarApuntador) {
      /* @var $datos ActiveQuery */
      if (!$isArray) {
        foreach ($datos->each() as $v) {
          $l = 0;
          foreach ($campos as $k => $a) {
            $spreadsheet
              ->getActiveSheet()
              ->setCellValue($ltrs[$l] . $i, isset($v[$a]) ? $v[$a] : "")
              ->getColumnDimension($ltrs[$l])
              ->setAutoSize(true);
            $l++;
          }
          $i++;
        }
      } else {
        foreach ($datos as $v) {
          $l = 0;
          foreach ($campos as $k => $a) {
            $spreadsheet
              ->getActiveSheet()
              ->setCellValue($ltrs[$l] . $i, isset($v[$a]) ? $v[$a] : "")
              ->getColumnDimension($ltrs[$l])
              ->setAutoSize(true);
            $l++;
          }
          $i++;
        }
      }

    } else {
      foreach ($datos as $v) {
        $l = 0;
        foreach ($campos as $k => $a) {
          $spreadsheet
            ->getActiveSheet()
            ->setCellValue($ltrs[$l] . $i, isset($v[$a]) ? $v[$a] : "")
            ->getColumnDimension($ltrs[$l])
            ->setAutoSize(true);
          $l++;
        }
        $i++;
      }

    }
    // Rename worksheet

    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $spreadsheet->setActiveSheetIndex(0);

    $ultima_letra = array_pop($ltrs);

    $style_titulo_etiquestas = [
      'font' => [
        'bold' => true,
        'size' => 14,
        'color' => ['rgb' => 'ffffff'],
      ],
      'alignment' => [
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER_CONTINUOUS,
      ],
      'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'startColor' => [
          'argb' => '00736c',
        ],
      ],
    ];
    $spreadsheet->getActiveSheet()->getStyle("A7:" . $ultima_letra . "7")->applyFromArray($style_titulo_etiquestas);



    if (!$respaldo) {
      $spreadsheet->getActiveSheet()->mergeCells('A3:' . $ultima_letra . "3");
      $spreadsheet->getActiveSheet()->getStyle("A3:" . $ultima_letra . "3")->applyFromArray($style_titulo);
      $spreadsheet->getActiveSheet()->setCellValue('A3', $titulo);
      //$spreadsheet->getActiveSheet()->setCellValue('A2', '=HIPERVINCULO("http://www.google.com/","Google")');

      $objDrawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
      $objDrawing->setName('Logo');
      $objDrawing->setDescription('Logo');
      $objDrawing->setPath($basePath . '/web/img/logo_istai_lg.png');
      $objDrawing->setWidth(200);
      $objDrawing->setCoordinates('A1');
      $objDrawing->setWorksheet($spreadsheet->getActiveSheet());

      /*$objDrawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
      $objDrawing->setName('Logo');
      $objDrawing->setDescription('Logo');
      $objDrawing->setPath($basePath . '/web/img/logo_istai_lg.png');
      $objDrawing->setWidth(150);
      $objDrawing->setCoordinates('M1');
      $objDrawing->setWorksheet($spreadsheet->getActiveSheet());
      $spreadsheet->getActiveSheet()->setCellValue('N3', " ");
      $spreadsheet->getActiveSheet()->setCellValue('O3', " ");*/

      //$spreadsheet->getActiveSheet()->getStyle("A7:" . $ultima_letra . "7")->applyFromArray($style_titulo_etiquestas);
    }


    // Redirect output to a client's web browser (Xlsx)
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $nombre . '.xlsx"');
    header('Cache-Control: max-age=0');

    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->save('php://output');
    exit;
  }

  public function excelMir($datos = []) {
    // Create new Spreadsheet object
    $nombre = "excels.xlsx";
    $titulo = "Matriz de Indicadores para Resultados (2022)";
    $pestania = "pestania";

    $spreadsheet = new Spreadsheet();
    $spreadsheet->setActiveSheetIndex(0);
    $spreadsheet->getSecurity()->setLockWindows(false);
    $spreadsheet->getSecurity()->setLockStructure(false);
    $spreadsheet->getActiveSheet()->getProtection()->setSheet(false);
    $spreadsheet->getActiveSheet()->getProtection()->setSort(false);
    $spreadsheet->getActiveSheet()->getProtection()->setInsertRows(false);
    $spreadsheet->getActiveSheet()->getProtection()->setFormatCells(false);

    // Set document properties
    $spreadsheet->getProperties()->setCreator('pbr')->setLastModifiedBy('pbr')->setTitle($titulo)->setDescription($titulo);

    $spreadsheet->getActiveSheet()->setTitle($pestania);
    $style_titulo = [
      'font' => [
        'bold' => true,
        'size' => 13,
      ],
      'alignment' => [
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
      ]
    ];

    $spreadsheet->setActiveSheetIndex(0);
    $spreadsheet->getActiveSheet()->setCellValue("A8", "Dependencia y/o Entidad:");
    $spreadsheet->getActiveSheet()->setCellValue("A9", "Programa Presupuestario:");//Eje De PED:
    $spreadsheet->getActiveSheet()->setCellValue("A10", "Eje De PED:");//:
    $spreadsheet->getActiveSheet()->setCellValue("A11", "Objetivo del PED:");
    $spreadsheet->getActiveSheet()->setCellValue("A12", "Beneficiarios:");

    // Rename worksheet
    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $spreadsheet->setActiveSheetIndex(0);

    $spreadsheet->getActiveSheet()->mergeCells('F4:K4');
    $spreadsheet->getActiveSheet()->getStyle('F4:K4')->applyFromArray($style_titulo);
    $spreadsheet->getActiveSheet()->setCellValue('F4', $titulo);
    $losbenificiarios = "";
    if (count($datos["benificiarios"]) > 0) {
      foreach ($datos["benificiarios"] as $ben) {
        $losbenificiarios .= "{$ben->beneficiario->nombre}, ";
      }
    }

    $spreadsheet->setActiveSheetIndex(0);
    $spreadsheet->getActiveSheet()->setCellValue("C8", $datos["dependencia"]->nombre);
    $spreadsheet->getActiveSheet()->setCellValue("C9", $datos["programa"]->nombre);
    $spreadsheet->getActiveSheet()->setCellValue("C10", $datos["eje"]->nombre);
    $spreadsheet->getActiveSheet()->setCellValue("C11", $datos["mir"]->objetivo->nombre);
    $spreadsheet->getActiveSheet()->setCellValue("C12", $losbenificiarios);

    $spreadsheet->getActiveSheet()->setCellValue("A14", "");
    $spreadsheet->getActiveSheet()->setCellValue("B14", "Resumen Narrativo\n(Objetivos)");
    $spreadsheet->getActiveSheet()->mergeCells('B14:B15');
    $spreadsheet->getActiveSheet()->setCellValue("C14", "Indicadores");
    $spreadsheet->getActiveSheet()->mergeCells('C14:E14');

    $spreadsheet->getActiveSheet()->setCellValue("F14", "Programación");
    $spreadsheet->getActiveSheet()->mergeCells('F14:J14');
    $spreadsheet->getActiveSheet()->setCellValue("K14", "Meta % de Anua");
    $spreadsheet->getActiveSheet()->setCellValue("L14", "% de Avance");
    $spreadsheet->getActiveSheet()->setCellValue("M14", "Linea Base (año base)");
    $spreadsheet->getActiveSheet()->setCellValue("N14", "Sentido");
    $spreadsheet->getActiveSheet()->setCellValue("O14", "Frecuencia");
    $spreadsheet->getActiveSheet()->setCellValue("P14", "Medios de Verificación\n(Fuentes)");
    $spreadsheet->getActiveSheet()->setCellValue("Q14", "Supuestos");
    $spreadsheet->getActiveSheet()->mergeCells('K14:K15');
    $spreadsheet->getActiveSheet()->mergeCells('L14:L15');
    $spreadsheet->getActiveSheet()->mergeCells('M14:M15');
    $spreadsheet->getActiveSheet()->mergeCells('N14:N15');
    $spreadsheet->getActiveSheet()->mergeCells('O14:O15');
    $spreadsheet->getActiveSheet()->mergeCells('P14:P15');
    $spreadsheet->getActiveSheet()->mergeCells('Q14:Q15');

    $spreadsheet->getActiveSheet()->getStyle('A14:Q14')->applyFromArray($style_titulo);
    $spreadsheet->getActiveSheet()->getStyle('A15:Q15')->applyFromArray($style_titulo);
    $spreadsheet->getActiveSheet()->setCellValue("C15", "Nombre");
    $spreadsheet->getActiveSheet()->setCellValue("D15", "Unidad de\nMedida");
    $spreadsheet->getActiveSheet()->setCellValue("E15", "Fórmula");
    $spreadsheet->getActiveSheet()->setCellValue("F15", "I");
    $spreadsheet->getActiveSheet()->setCellValue("G15", "II");
    $spreadsheet->getActiveSheet()->setCellValue("H15", "III");
    $spreadsheet->getActiveSheet()->setCellValue("I15", "IV");
    $spreadsheet->getActiveSheet()->setCellValue("J15", "Avance\nAcumulado");

    $objDrawing = $this->cargarImagen($spreadsheet, '/web/img/logo-salud.png', 300, "A1");
    $objDrawing = $this->cargarImagen($spreadsheet, '/web/img/sa.png', 150, "Q5");
    $spreadsheet->getActiveSheet()->setCellValue('R3', " ");

    $i = 16;
    if ($datos["mir"] != null) {
      $nuevoNiveles = [];
      foreach ($datos["niveles"] as $nivel) {
        if (!isset($nuevoNiveles[$nivel->nivel])) {
          $nuevoNiveles[$nivel->nivel] = [];
        }
        $nuevoNiveles[$nivel->nivel][] = $nivel;
      }

      $ordenNivel = [
        "FIN",
        "PROPÓSITO",
        "COMPONENTE",
        "ACTIVIDAD"
      ];

      foreach ($ordenNivel as $k => $v) {
        $inicio = $i;
        $spreadsheet->getActiveSheet()->setCellValue("A" . $i, $v);
        $fin = 0;
        foreach ($nuevoNiveles[$v] as $nivel) {
          $spreadsheet->getActiveSheet()->setCellValue("B" . $i, $nivel->resumen);
          foreach ($nivel->matrizMIRIndicadores as $indicador) {
            $spreadsheet->getActiveSheet()->setCellValue("C" . $i, $indicador->nombre);
            $spreadsheet->getActiveSheet()->setCellValue("D" . $i, $indicador->unidadMedida->nombre);
            $spreadsheet->getActiveSheet()->setCellValue("E" . $i, $indicador->numerador);
            $spreadsheet->getActiveSheet()->setCellValue("E" . ($i + 1), $indicador->denominador);
            $spreadsheet->getActiveSheet()->setCellValue("F" . $i, $indicador->numeradorT1);
            $spreadsheet->getActiveSheet()->setCellValue("G" . $i, $indicador->numeradorT2);
            $spreadsheet->getActiveSheet()->setCellValue("H" . $i, $indicador->numeradorT3);
            $spreadsheet->getActiveSheet()->setCellValue("I" . $i, $indicador->numeradorT4);

            $spreadsheet->getActiveSheet()->setCellValue("F" . ($i + 1), $indicador->denominadorT1);
            $spreadsheet->getActiveSheet()->setCellValue("G" . ($i + 1), $indicador->denominadorT2);
            $spreadsheet->getActiveSheet()->setCellValue("H" . ($i + 1), $indicador->denominadorT3);
            $spreadsheet->getActiveSheet()->setCellValue("I" . ($i + 1), $indicador->denominadorT4);

            $spreadsheet->getActiveSheet()->setCellValue("J" . $i, $indicador->avanceAcumulado);
            $spreadsheet->getActiveSheet()->setCellValue("K" . $i, $indicador->metaAnual);
            $spreadsheet->getActiveSheet()->setCellValue("L" . $i, $indicador->porcentajeAvance);
            $spreadsheet->getActiveSheet()->setCellValue("M" . $i, $indicador->lineaBase);
            $spreadsheet->getActiveSheet()->setCellValue("N" . $i, $indicador->sentido->valor);
            $spreadsheet->getActiveSheet()->setCellValue("O" . $i, $indicador->frecuencia->nombre);
            $spreadsheet->getActiveSheet()->setCellValue("P" . $i, $indicador->metodoVerificacion);
            $spreadsheet->getActiveSheet()->setCellValue("Q" . $i, $indicador->supuestos);
            $spreadsheet->getActiveSheet()->setCellValue("R" . $i, " ");
            $i += 2;
          }
          //$spreadsheet->getActiveSheet()->mergeCells("B{$inicio}:B{$f}");
        }
        //$fin = $i+1;
        $spreadsheet->getActiveSheet()->mergeCells("A{$inicio}:A17");
      }
    }
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $nombre . '"');
    header('Cache-Control: max-age=0');

    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->save('php://output');
    exit;
  }

  function cargarImagen($spreadsheet, $imagen = "/web/img/logo-salud.png", $width = 300, $ubicacion = "A1") {
    $basePath = \Yii::getAlias("@app");
    $objDrawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
    $objDrawing->setName('Logo');
    $objDrawing->setDescription('Logo');
    $objDrawing->setPath($basePath . $imagen);
    $objDrawing->setWidth($width);
    $objDrawing->setCoordinates($ubicacion);
    $objDrawing->setWorksheet($spreadsheet->getActiveSheet());
  }
}