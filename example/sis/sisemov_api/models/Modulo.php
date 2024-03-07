<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Modulo".
 *
 * @property string $id
 * @property string|null $nombre
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property Permiso[] $permisos
 */
class Modulo extends ModeloBase {
  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'Modulo';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id'], 'required'],
      [['creado', 'modificado', 'eliminado'], 'safe'],
      [['id'], 'string', 'max' => 50],
      [['nombre'], 'string', 'max' => 100],
      [['id'], 'unique'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function attributeLabels() {
    return [
      'id' => 'ID',
      'nombre' => 'Nombre',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  public function getPermisos() {
    return $this->hasMany(Permiso::class, ['idModulo' => 'id']);
  }
}
