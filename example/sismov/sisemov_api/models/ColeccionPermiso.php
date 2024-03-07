<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "ColeccionPermiso".
 *
 * @property string $id
 * @property string|null $clave
 * @property string|null $nombre
 * @property string|null $descripcion
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property ColeccionPermisoPermiso[] $coleccionPermisoPermisos
 * @property Permiso[] $idPermisos
 */
class ColeccionPermiso extends ModeloBase {
  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'ColeccionPermiso';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id'], 'required'],
      [['creado', 'modificado', 'eliminado'], 'safe'],
      [['id', 'clave'], 'string', 'max' => 50],
      [['nombre', 'descripcion'], 'string', 'max' => 100],
      [['id'], 'unique'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function attributeLabels() {
    return [
      'id' => 'ID',
      'clave' => 'Clave',
      'nombre' => 'Nombre',
      'descripcion' => 'Descripcion',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  public function getColecciones() {
    return $this->hasMany(ColeccionPermisoPermiso::class, ['idColeccion' => 'id']);
  }

  public function getPermisos() {
    return $this->hasMany(Permiso::class, ['id' => 'idPermiso'])->viaTable('ColeccionPermisoPermiso', ['idColeccion' => 'id']);
  }
}
