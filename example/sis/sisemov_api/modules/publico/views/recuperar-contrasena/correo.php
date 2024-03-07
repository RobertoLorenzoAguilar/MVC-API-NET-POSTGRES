<?php

/**
 * @var \v1\models\RecuperarContrasena $datos
 * @var \v1\models\Usuario $usuario
 * 
 */

setlocale(LC_ALL, 'es_Es');
$basePath = \Yii::getAlias('@app') . "/web/";
?>

<style type="text/css">
	.cuerpo {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.titulo {
		margin: 1rem !important;
		text-align: center;
		width: 100%;
	}

	.visualizar-acuse {
		align-self: center;
		background-color: #863695;
		border-radius: .5rem;
		text-align: center;
		color: white;
		font-size: large;
		font-weight: bolder;
		text-decoration: none;
		padding: 1rem;
		width: 50%;
	}

	.informacion {
		align-self: center;
		text-align: center;
		margin: 1rem;
		font-weight: bold;
	}

	.fecha {
		margin: .5rem;
		align-self: center;
		font-weight: bold;
	}
</style>

<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
	<h3>
		Hola,<?= $usuario->nombre ?> Detectamos una petición para cambiar su contraseña
	</h3>
	<p>
		En caso de que usted no haya hecho la petición favor de ingorar el mensaje
	</p>
	<h2>
		<?= $datos->token ?>
	</h2>
	<p style="font-weight:bold; text-align:center;">
		<?php $tz = new DateTimeZone('America/Hermosillo');
		$fechaNotificacion = new DateTime();
		$fechaNotificacion->setTimezone($tz);
		$fechaNotificacion = $fechaNotificacion->format('d/m/Y H:i a');
		echo $fechaNotificacion
		?>
	</p>
</div>