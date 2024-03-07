<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Media".
 *
 * @property string $id
 * @property string|null $idUsuario
 * @property string $nombre
 * @property string|null $uuid
 * @property string|null $size
 * @property string|null $mimetype
 * @property string|null $ruta
 * @property string|null $descripcion
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 * @property string|null $extension
 * 
 * @property Usuario $usuario
 */
class Media extends ModeloBase {
  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'Media';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id', 'nombre'], 'required'],
      [['creado', 'modificado', 'eliminado'], 'safe'],
      [['id', 'idUsuario'], 'string', 'max' => 36],
      [['uuid', 'nombre', 'size', 'mimetype'], 'string', 'max' => 100],
      [['ruta'], 'string', 'max' => 255],
      [['extension'], 'string', 'max' => 5],
      [['descripcion'], 'string', 'max' => 500],
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
      'nombre' => 'Nombre',
      'uuid' => 'Uuid',
      'size' => 'Size',
      'mimetype' => 'Mimetype',
      'ruta' => 'Ruta',
      'descripcion' => 'Descripcion',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
      'extension' => 'Extension',
    ];
  }

  public function fields() {
    return [
      'id',
      'idUsuario',
      'nombre',
      'uuid',
      'size',
      'mimetype',
      'ruta',
      'descripcion',
      'creado',
      'modificado',
      'extension',
      'archivo' => function ($model) {
        $aux = explode($_SERVER['SERVER_NAME'], $model->ruta);
        if (isset($aux[1])) {
          return $aux[1];
        }
        return " ";
      }
    ];
  }

  public function extraFields() {
    return [
      'usuario'
    ];
  }

  /**
   * Gets query for [[usuario]].
   *
   * @return \yii\db\ActiveQuery
   */
  public function getUsuario() {
    return $this->hasOne(Usuario::class, ['id' => 'idUsuario']);
  }
}
