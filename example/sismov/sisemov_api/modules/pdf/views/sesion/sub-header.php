<?php
/**
 * @var  \v1\models\OrdenDia $ordenDia
 * @var  \v1\models\OrdenDiaTema $ordenDiaTema
 * @var  \v1\models\OrdenDiaAsistencia $ordenDiaAsistencia
 * @var  \v1\models\OrdenDiaMesaDirectiva $ordenDiaMesaDirectiva
 * @var  \v1\models\OrdenDiaSolicitudPalabra $ordenDiaSolicitudPalabra
 */
setlocale(LC_ALL, 'es_ES');

$fechaSesion = new \DateTime($ordenDia->fechaSesion);
$fechaSesion->setTimezone(new \DateTimeZone('America/Hermosillo'));

$i = 0;

$a = 0;
$r = 0;
$rj = 0;
$fj = 0;

$temas = 0;

foreach ($ordenDiaAsistencia as $asistencia) {
  $i++;
  if ($asistencia->asistio === 1) {
    $a++;
  }
  if ($asistencia->retardo === 1) {
    $r++;
  }
  if ($asistencia->retardoJustificado === 1) {
    $rj++;
  }
  if ($asistencia->faltaJustificada === 1) {
    $fj++;
  }
}

$asistentes = $a + $r + $rj;
$porcentajeAsistencia = $asistentes * 100 / $i;

?>
<table style=" width:1200px; font-size: 22px">
  <tr>
    <td colspan="4">
      <strong>Orden del día de la sesión</strong>
    </td>
    <td colspan="6">
      <?= $ordenDia->minutaSesionNombre ?>
    </td>
    <td colspan="2">
      <?= $ordenDia->ultimoEstatus->nombre ?>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="width:200px">
      <strong>Fecha:</strong>
    </td>
    <td colspan="2" style="width:200px">
      <?= $fechaSesion->format('d m Y H:i') ?>
    </td>
    <td colspan="2" style="width:200px">
      <strong>No. de asistentes</strong>
    </td>
    <td colspan="2" style="width:200px">
      <?= $asistentes ?> de <?= $i ?>
    </td>
    <td colspan="2" style="width:200px">
      <strong>Quorum:</strong>
    </td>
    <td colspan="2" style="width:200px">
      <?= $ordenDia->quorum ?>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>No. de Temas:</strong>
    </td>
    <td colspan="3">
      <?= count($ordenDia->temas) ?>
    </td>
    <td colspan="3">
      <strong>Porcentaje de Asistencia:</strong>
    </td>
    <td colspan="3">
      <?= number_format($porcentajeAsistencia, 2, '.', ',') ?>
    </td>
  </tr>
</table>
