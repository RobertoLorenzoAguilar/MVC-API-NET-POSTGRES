<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Permiso".
 *
 * @property string $id
 * @property string|null $idModulo
 * @property string|null $nombre
 * @property string|null $descripcion
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property Modulo $idModulo0
 * @property PermisoUsuario[] $permisoUsuarios
 */
class Permiso extends ModeloBase {

  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'Permiso';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id'], 'required'],
      [['creado', 'modificado', 'eliminado'], 'safe'],
      [['id', 'idModulo'], 'string', 'max' => 50],
      [['nombre', 'descripcion'], 'string', 'max' => 100],
      [['id'], 'unique'],
      [['idModulo'], 'exist', 'skipOnError' => true, 'targetClass' => Modulo::class, 'targetAttribute' => ['idModulo' => 'id']],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function attributeLabels() {
    return [
      'id' => 'ID',
      'idModulo' => 'Id Modulo',
      'nombre' => 'Nombre',
      'descripcion' => 'Descripcion',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  public function getModulo() {
    return $this->hasOne(Modulo::class, ['id' => 'idModulo']);
  }

  public function getPermisoUsuarios() {
    return $this->hasMany(PermisoUsuario::class, ['idPermiso' => 'id']);
  }
}
