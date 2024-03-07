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
  if ($asistencia->asistio = 1) {
    $a++;
  }
  if ($asistencia->retardo = 1) {
    $r++;
  }
  if ($asistencia->retardoJustificado = 1) {
    $rj++;
  }
  if ($asistencia->faltaJustificada = 1) {
    $fj++;
  }
}

$asistentes = $a + $r + $rj;

?>
<table style="margin-top:60px; width:1200px; font-size: 22px">
  <?php
  foreach ($ordenDiaTema as $temaDia):
    $horaInicio = new \DateTime($temaDia->horaInicio);
    $horaFin = new \DateTime($temaDia->horaFin);
    $horaInicio->setTimezone(new \DateTimeZone('America/Hermosillo'));
    $horaFin->setTimezone(new \DateTimeZone('America/Hermosillo'));
    ?>
    <tr>
      <td><?= $temaDia->clave ?></td>
      <td><?= $temaDia->descripcion ?></td>
      <td><?= $temaDia->horaInicio ? $horaInicio->format('d m Y H:i') : '-' ?> / <?= $temaDia->horaFin ? $horaFin->format('d m Y H:i') : '-' ?></td>
      <td><?= $temaDia->ultimoEstatus->nombre ?></td>
    </tr>
  <?php endforeach; ?>
</table>