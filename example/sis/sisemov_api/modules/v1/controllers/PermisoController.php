<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use yii\db\Expression;

class PermisoController extends AuthController {

	public $modelClass = "app\models\Permiso";

	public function actionIndex() {
		$id = trim($this->req->get("id", ""));
		$idModulo = trim($this->req->get("idModulo", ""));
		$q = trim($this->req->get("buscar", ""));

		$query = $this->queryInicial;

		if ($id !== "") {
			$query->andWhere(["id" => $id]);
		}

		if ($idModulo !== "") {
			$query->andWhere(["idModulo" => $idModulo]);
		}

		if ($q) {
			$query->andWhere([
				"OR",
				'f_unaccent([[id]]) ilike f_unaccent(:q)',
				'f_unaccent([[nombre]]) ilike f_unaccent(:q)',
			])->addParams([':q' => "%{$q}%"]);
		}

		return new Respuesta($query, $this->limite, $this->pagina, $this->ordenar);
	}

	public function actionGuardar() {
		$id = trim($this->req->getBodyParam("id", ""));
		$claveOld = trim($this->req->getBodyParam("claveOld", null));
		$modelo = null;

		if ($id !== "") {
			if ($claveOld !== '' && $id !== $claveOld) {
				return (new Respuesta())
					->esError()
					->mensaje('Ya existe un registro con esta clave');
			}
			$modelo = $this->modelClass::findOne($id);
		}
		if ($modelo === null) {
			$modelo = new $this->modelClass();
			$modelo->uuid();
			$modelo->creado = new Expression('now()');
		} else {
			$modelo->modificado = new Expression('now()');
		}

		$modelo->load($this->req->getBodyParams(), '');
		if (!$modelo->save()) {
			return (new Respuesta($modelo))
				->mensaje("Hubo un problema al guardar el Permiso");
		}

		$modelo->refresh();
		return (new Respuesta($modelo))
			->mensaje("Permiso guardado");
	}

	public function actionEliminar() {
		$id = trim($this->req->getBodyParam("id", ""));
		$modelo = null;

		if ($id !== '') {
			$modelo = $this->modelClass::findOne(["id" => $id]);
		}
		if ($modelo === null) {
			return (new Respuesta())
				->esError()
				->mensaje("Permiso no encontrado");
		}
		$modelo->eliminado = new Expression('now()');
		if (!$modelo->save()) {
			return (new Respuesta($modelo))
				->mensaje("No se pudo eliminar el Permiso");
		}

		return (new Respuesta())
			->mensaje("Permiso eliminado");
	}
}
