<?php
/**
 * @var  \v1\models\OrdenDia $ordenDia
 * @var  \v1\models\OrdenDiaTema $ordenDiaTema
 * @var  \v1\models\OrdenDiaAsistencia $ordenDiaAsistencia
 * @var  \v1\models\OrdenDiaMesaDirectiva $ordenDiaMesaDirectiva
 * @var  \v1\models\OrdenDiaEvento $ordenDiaEvento
 */

?>
<table style="margin-top:60px; width:1200px; font-size: 22px">
  <tr style="background-color:#242424; color:#fff !important; padding: 3px 3px">
    <th style="color:#fff !important; padding: 3px 3px">Creado</th>
    <th style="color:#fff !important; padding: 3px 3px">Actor</th>
    <th style="color:#fff !important; padding: 3px 3px">Tipo</th>
    <th style="color:#fff !important; padding: 3px 3px">Descripción</th>
  </tr>
  <?php
  $r = 0;
  foreach ($ordenDiaEvento as $evento):
    $horaInicio = new \DateTime($evento->creado);
    $horaInicio->setTimezone(new \DateTimeZone('America/Hermosillo'));
    ?>
    <tr class="odd" style="margin:7px; <?= $r == 1 ? 'background: #d1d1d1' : '' ?>">
      <td><?= $evento->creado ? $horaInicio->format('d m Y H:i') : '-' ?></td>
      <td><?= $evento->diputado->nombre ?> <?= $evento->diputado->primerApellido ?> <?= $evento->diputado->segundoApellido ?></td>
      <td><?= $evento->tipo ?></td>
      <td><?= $evento->descripcion ?></td>
    </tr>
    <?php
    if ($r === 0)
      $r = 1;
    else
      $r = 0;
  endforeach; ?>
</table>
