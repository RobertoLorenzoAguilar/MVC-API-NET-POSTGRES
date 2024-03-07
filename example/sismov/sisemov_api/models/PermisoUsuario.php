<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "PermisoUsuario".
 *
 * @property string $id
 * @property string|null $idUsuario
 * @property string|null $idPermiso
 * @property string|null $asignado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property Permiso $permiso
 * @property Usuario $usuario
 */
class PermisoUsuario extends ModeloBase {
  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'PermisoUsuario';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id'], 'required'],
      [['asignado', 'modificado', 'eliminado'], 'safe'],
      [['id', 'idUsuario', 'idPermiso'], 'string', 'max' => 50],
      [['id'], 'unique'],
      [['idPermiso'], 'exist', 'skipOnError' => true, 'targetClass' => Permiso::class, 'targetAttribute' => ['idPermiso' => 'id']],
      [['idUsuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuario::class, 'targetAttribute' => ['idUsuario' => 'id']],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function attributeLabels() {
    return [
      'id' => 'ID',
      'idUsuario' => 'Id Usuario',
      'idPermiso' => 'Id Permiso',
      'asignado' => 'Asignado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  public function getPermiso() {
    return $this->hasOne(Permiso::class, ['id' => 'idPermiso']);
  }

  public function getUsuario() {
    return $this->hasOne(Usuario::class, ['id' => 'idUsuario']);
  }
}
