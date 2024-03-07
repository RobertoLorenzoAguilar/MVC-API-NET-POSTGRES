<?php

namespace v1\controllers;

use common\data\Respuesta;
use common\rest\AuthController;
use app\models\ColeccionPermisoPermiso;
use app\models\ModuloPermisoPerfil;
use yii\db\Expression;

class ColeccionPermisoController extends AuthController {

	public $modelClass = "app\models\ColeccionPermiso";

	public function actionIndex() {
		$id = trim($this->req->get("id", ""));
		$buscar = trim($this->req->get("buscar", ""));
		$notIn = trim($this->req->get("notIn", ""));

		$query = $this->queryInicial;

		if (!empty($id)) {
			$query->andWhere(["id" => $id]);
		}

		if (!empty($notIn)) {
			$explode = explode(",", $notIn);
			$query->andWhere(["NOT IN", "id", $explode]);
		}

		if ($buscar) {
			# Ejemplo de buscador

			$query->andWhere([
				"OR",
				"f_unaccent([[nombre]]) ilike f_unaccent(:q)",
				"f_unaccent([[clave]]) ilike f_unaccent(:q)",
			])->addParams([':q' => "%{$buscar}%"]);
			//
		}


		return new Respuesta($query, $this->limite, $this->pagina, $this->ordenar);
	}

	public function actionGuardar() {
		$id = trim($this->req->getBodyParam("id", ""));
		$permisos = $this->req->getBodyParam("permisos", []);
		$modelo = null;

		$tran = \Yii::$app->getDb()->beginTransaction();
		try {
			if ($id !== "") {
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
				$tran->rollBack();
				return (new Respuesta($modelo))
					->mensaje("Hubo un problema al guardar PerfilPermiso");
			}

			$permisosAnteriores = ColeccionPermisoPermiso::find()->andWhere(['idColeccion' => $modelo->id])->all();

			foreach ($permisos as $permiso) {
				$coleccionPermiso = null;
				$coleccionPermiso = ColeccionPermisoPermiso::find()
					->andWhere(['idColeccion' => $modelo->id])
					->andWhere(['idPermiso' => $permiso])
					->one();

				if ($coleccionPermiso === null) {
					$coleccionPermiso = new ColeccionPermisoPermiso();
					$coleccionPermiso->creado = new Expression('now()');
				} else {
					$coleccionPermiso->modificado = new Expression('now()');
					if ($coleccionPermiso->eliminado) {
						$coleccionPermiso->eliminado = null;
					}
				}

				$coleccionPermiso->idColeccion = $modelo->id;
				$coleccionPermiso->idPermiso = $permiso;

				if (!$coleccionPermiso->save()) {
					$tran->rollBack();
					return (new Respuesta($coleccionPermiso))
						->mensaje("Hubo un problema al guardar Permiso");
				}
			}

			foreach ($permisosAnteriores as $permisoAnterior) {
				if (!in_array($permisoAnterior->idPermiso, $permisos)) {
					$permisoAnterior->eliminado = new Expression('now()');
					if (!$permisoAnterior->save()) {
						$tran->rollBack();
						return (new Respuesta($permisoAnterior))
							->mensaje("Hubo un problema al guardar Permiso");
					}
				}
			}

			$tran->commit();
			$modelo->refresh();
			return (new Respuesta($modelo))
				->mensaje("PerfilPermiso guardado");
		} catch (\Exception $e) {
			$tran->rollBack();
			return (new Respuesta())
				->esError()
				->mensaje($e->getMessage());
		}
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
				->mensaje("PerfilPermiso no encontrado");
		}
		$modelo->eliminado = new Expression('now()');
		if (!$modelo->save()) {
			return (new Respuesta($modelo))
				->mensaje("No se pudo eliminar PerfilPermiso");
		}

		return (new Respuesta())
			->mensaje("PerfilPermiso eliminado");
	}
}
