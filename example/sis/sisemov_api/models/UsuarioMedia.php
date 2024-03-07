<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "UsuarioMedia".
 *
 * @property string $idUsuario
 * @property string $idMedia
 */
class UsuarioMedia extends ModeloBase
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'UsuarioMedia';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idUsuario', 'idMedia'], 'required'],
            [['idUsuario', 'idMedia'], 'string', 'max' => 36],
            [['idUsuario', 'idMedia'], 'unique', 'targetAttribute' => ['idUsuario', 'idMedia']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'idUsuario' => 'Id Usuario',
            'idMedia' => 'Id Media',
        ];
    }
}
