<?php

namespace app\modules\publico\controllers;

use app\modules\mail\models\NotificacionCorreo;
use common\data\Respuesta;
use common\rest\JsonController;
use DateTime;
use DateTimeZone;
use v1\models\RecuperarContrasena;
use v1\models\Usuario;
use yii\db\Expression;

class RecuperarContrasenaController extends JsonController {

	public $modelClass = 'v1\models\RecuperarContrasena';

	public function actionIndex() {
		$correo = trim($this->req->getBodyParam("correo", ""));
		$usuario = null;
		if ($correo !== "") {
			$usuario = Usuario::find()->andWhere(["correo" => $correo])->one();
		}

		if ($usuario === null) {
			return (new Respuesta())
				->esError()
				->mensaje('No se ha encontrado el Usuario, favor de verificar el correo.');
		}
		try {
			$recuperarContrasena = new RecuperarContrasena();
			$recuperarContrasena->uuid();
			$recuperarContrasena->idUsuario = $usuario->id;
			$recuperarContrasena->token = mt_rand(10000000, 99999999);
			$recuperarContrasena->creado = new Expression('now()');

			$recuperarContrasena->load($this->req->getBodyParams(), '');

			if (!$recuperarContrasena->save()) {
				return (new Respuesta())
					->esError()
					->mensaje('No fue posible crear el código de recuperación');
			}

			$tz = new DateTimeZone('America/Hermosillo');
			$fechaNotificacion = new DateTime();
			$fechaNotificacion->setTimezone($tz);
			$fechaNotificacion = $fechaNotificacion->format('d/m/Y H:i a');

			$parametros = [
				"prioridad" => NotificacionCorreo::PRIORIDAD_2,
				"asunto" => "Notificación SIISTAI Recuperar Contraseña: " . $fechaNotificacion,
				"cuerpo" => $this->renderPartial('correo', ["datos" => $recuperarContrasena, "usuario" => $usuario]),
				"receptores" => [$correo],
				"adjuntos" => []
			];
			$resultado = NotificacionCorreo::enviarMultiple($parametros);

			$recuperarContrasena->refresh();
			return (new Respuesta())
				->mensaje("Se ha enviado un correo con los datos necesarios para recuperar su contraseña.");
		} catch (\Exception $e) {
			return (new Respuesta())
				->esError()
				->mensaje($e->getMessage());
		}
	}

	public function actionVerificar() {
		$correo = trim($this->req->get("correo", ""));
		$token = intval($this->req->get("token", 0));
		$usuario = null;

		if ($correo !== "") {
			$usuario = Usuario::find()->andWhere(["correo" => $correo])->one();
		}

		if ($usuario !== null) {

			$recuperarContrasena = RecuperarContrasena::find()
				->andWhere([
					"idUsuario" => $usuario->id,
					"token" => $token,
					'utilizado' => null
				])
				->one();

			if ($recuperarContrasena !== null) {
				return (new Respuesta())
					->mensaje('Token válido');
			} else {
				return (new Respuesta())
					->esError()
					->mensaje('Error: Token no coincide');
			}
		} else {
			return (new Respuesta())
				->esError()
				->mensaje('Ha ocurrido un error');
		}
	}

	public function actionCambiar() {
		$correo = trim($this->req->getBodyParam("correo", ""));
		$token = intval($this->req->getBodyParam("token", null));
		$pwd = trim($this->req->getBodyParam("pwd", ""));
		$usuario = null;

		if ($correo !== "") {
			$usuario = Usuario::find()->andWhere(["correo" => $correo])->one();
		}

		/** @var \v1\models\Usuario $usuario */
		if ($usuario !== null) {
			$validarToken = RecuperarContrasena::find()
				->andWhere([
					'token' => $token,
					'idUsuario' => $usuario->id
				])
				->one();

			if ($validarToken !== null) {
				$usuario->agregarClave($pwd);
				$usuario->modificado = new Expression('now()');
				if (!$usuario->save()) {
					return (new Respuesta($usuario))
						->mensaje("Ocurrió un error al guardar al recuperar su contraseña, favor de intentarlo de nuevo");
				}

				$validarToken->utilizado = new Expression('now()');
				if (!$validarToken->save()) {
					return (new Respuesta($usuario))
						->mensaje("Ocurrió un error al guardar al recuperar su contraseña, favor de intentarlo de nuevo");
				}

				$usuario->refresh();
				return (new Respuesta($usuario))
					->mensaje("Contraseña actualizada");
			} else {
				return (new Respuesta())
					->esError()
					->mensaje('Error al intentar cambiar su contraseña, favor de intentar de nuevo');
			}
		}
	}
}
