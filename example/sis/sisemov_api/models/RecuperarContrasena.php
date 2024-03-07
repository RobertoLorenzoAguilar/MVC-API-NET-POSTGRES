<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "RecuperarContrasena".
 *
 * @property string $id
 * @property string|null $idUsuario
 * @property int|null $token
 * @property string|null $utilizado
 * @property string|null $cancelado
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property Usuario $usuario
 */
class RecuperarContrasena extends ModeloBase {
  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'RecuperarContrasena';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id'], 'required'],
      [['token'], 'default', 'value' => null],
      [['token'], 'integer'],
      [['utilizado', 'cancelado', 'creado', 'modificado', 'eliminado'], 'safe'],
      [['id', 'idUsuario'], 'string', 'max' => 36],
      [['id'], 'unique'],
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
      'token' => 'Token',
      'utilizado' => 'Utilizado',
      'cancelado' => 'Cancelado',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  /**
   * Gets query for [[IdUsuario0]].
   *
   * @return \yii\db\ActiveQuery
   */
  public function getUsuario() {
    return $this->hasOne(Usuario::class, ['id' => 'idUsuario']);
  }
}
