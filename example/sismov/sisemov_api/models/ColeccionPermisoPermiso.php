<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "ColeccionPermisoPermiso".
 *
 * @property string $idColeccion
 * @property string $idPermiso
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property ColeccionPermiso $idColeccion0
 * @property Permiso $idPermiso0
 */
class ColeccionPermisoPermiso extends ModeloBase {
  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'ColeccionPermisoPermiso';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['idColeccion', 'idPermiso'], 'required'],
      [['creado', 'modificado', 'eliminado'], 'safe'],
      [['idColeccion', 'idPermiso'], 'string', 'max' => 50],
      [['idColeccion', 'idPermiso'], 'unique', 'targetAttribute' => ['idColeccion', 'idPermiso']],
      [['idColeccion'], 'exist', 'skipOnError' => true, 'targetClass' => ColeccionPermiso::class, 'targetAttribute' => ['idColeccion' => 'id']],
      [['idPermiso'], 'exist', 'skipOnError' => true, 'targetClass' => Permiso::class, 'targetAttribute' => ['idPermiso' => 'id']],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function attributeLabels() {
    return [
      'idColeccion' => 'Id Coleccion',
      'idPermiso' => 'Id Permiso',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  public function getColeccion() {
    return $this->hasOne(ColeccionPermiso::class, ['id' => 'idColeccion']);
  }

  public function getPermiso() {
    return $this->hasOne(Permiso::class, ['id' => 'idPermiso']);
  }
}
