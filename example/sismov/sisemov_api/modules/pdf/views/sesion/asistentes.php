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
?>
<table style="margin-top:60px; width:1200px; font-size: 22px">
  <?php foreach ($ordenDiaAsistencia as $asistencia): ?>
    <tr>
      <td style="width:200px"><img src="<?= $asistencia->diputado->foto ?>" style="width:120px; height:auto"></td>
      <td style="width:600px"><?= $asistencia->diputado->nombre ?> <?= $asistencia->diputado->primerApellido ?> <?= $asistencia->diputado->segundoApellido ?></td>
      <td style="width:400px">
        <?= $asistencia->asistio === 1 ? "Asistio" : '' ?>
        <?= $asistencia->retardo === 1 ? "Retardo" : '' ?>
        <?= $asistencia->retardoJustificado === 1 ? "Retardo Justificado" : '' ?>
        <?= $asistencia->faltaJustificada === 1 ? "Falta Justificada" : '' ?>
        <?= $asistencia->faltaJustificada === 0 && $asistencia->retardoJustificado === 0 && $asistencia->retardo === 0 && $asistencia->asistio === 0 ? "Falta" : '' ?>
      </td>
    </tr>
  <?php endforeach; ?>
</table>
