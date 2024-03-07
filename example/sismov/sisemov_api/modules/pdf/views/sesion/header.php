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
<table>
  <tr>
    <td width="220px" style="text-align: left">
      <img src="/img/logoCongresoSolo.png" width="18%" height="18%">
    </td>
    <td width="480px">
      <h1>
        Congreso del Estado de Sonora<br/>
      </h1>
    </td>
    <td width="220px" style="text-align: right">
      <img src="<?= $ordenDia->legislatura->foto ?>" width="20%" height="15%" alt="<?= $ordenDia->legislatura->foto ?>">
    </td>
  </tr>
</table>
