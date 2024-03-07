<?php

namespace app\models;

use Yii;
use yii\db\Query;

/**
 * This is the model class for table "Usuario".
 *
 * @property string $id
 * @property string $correo
 * @property string $clave
 * @property string $nombre
 * @property string|null $primerApellido
 * @property string|null $segundoApellido
 * @property int|null $estatus 0:inactivo, 1:activo
 * @property string $telefono
 * @property string|null $alias
 * @property string|null $foto
 * @property string $rol
 * @property string|null $creado
 * @property string|null $modificado
 * @property string|null $eliminado
 *
 * @property Media[] $media
 * @property PermisoUsuario[] $permisoUsuarios
 * @property RecuperarContrasena[] $recuperarContrasenas
 */
class Usuario extends ModeloBase {

  public const ACTIVO = 'activo';
  public const INACTIVO = 'inactivo';

  const ROL_ADMIN = "admin";
  const ROL_USUARIO = "usuario";

  private $_permisos = [];

  /**
   * {@inheritdoc}
   */
  public static function tableName() {
    return 'Usuario';
  }

  /**
   * {@inheritdoc}
   */
  public function rules() {
    return [
      [['id', 'correo', 'clave', 'nombre', 'rol'], 'required'],
      [['creado', 'modificado', 'eliminado'], 'safe'],
      [['id'], 'string', 'max' => 36],
      [['correo', 'clave', 'nombre', 'primerApellido', 'segundoApellido', 'rol'], 'string', 'max' => 100],
      [['estatus', 'telefono'], 'string', 'max' => 10],
      [['foto'], 'string', 'max' => 300],
      [['id'], 'unique'],
    ];
  }
  /**
   * {@inheritdoc}
   */
  public function attributeLabels() {
    return [
      'id' => 'ID',
      'correo' => 'Correo',
      'clave' => 'Clave',
      'nombre' => 'Nombre',
      'primerApellido' => 'Primer Apellido',
      'segundoApellido' => 'Segundo Apellido',
      'estatus' => 'Estatus',
      'telefono' => 'Telefono',
      'foto' => 'Foto',
      'rol' => 'Rol',
      'creado' => 'Creado',
      'modificado' => 'Modificado',
      'eliminado' => 'Eliminado',
    ];
  }

  /**
   * Gets query for [[Media]].
   *
   * @return \yii\db\ActiveQuery
   */
  public function getMedia() {
    return $this->hasMany(Media::class, ['idUsuario' => 'id']);
  }

  /**
   * Gets query for [[permisos]].
   *
   * @return \yii\db\ActiveQuery
   */
  public function getPermisos() {
    return $this->hasMany(PermisoUsuario::class, ['idUsuario' => 'id'])
      ->select("idPermiso")
      ->column();
  }

  /**
   * Gets query for [[RecuperarContrasenas]].
   *
   * @return \yii\db\ActiveQuery
   */
  public function getRecuperarContrasenas() {
    return $this->hasMany(RecuperarContrasena::class, ['idUsuario' => 'id']);
  }

  public function agregarClave($pwd) {
    $this->clave = Yii::$app->getSecurity()->generatePasswordHash($pwd);
  }

  public function validarClave($pwd) {
    return Yii::$app->getSecurity()->validatePassword($pwd, $this->clave);
  }

  /**
   * Consulta si el usuario cuenta con el permiso proporcionado.
   * @param string $permiso Valor del permiso a evaluar.
   * @return bool Regresa cierto si cuenta con permiso, de lo contrario, regresa falso.
   */
  public function tienePermiso($permiso = null) {
    if ($permiso === null) {
      return false;
    }

    $permisos = $this->cargarPermisos($permiso);
    return isset($permisos[$permiso]) && $permisos[$permiso];
  }

  /**
   * Consulta en la base de datos si el usuario cuenta con los permisos proporcionados.
   * @param string|array $permiso Valor del permiso a evaluar | lista de permisos a evaluar.
   * @return array Regresa un arreglo donde especifica, por permiso, si el usuario cuenta con algún permiso.
   * 
   * [
   *  'clave_permiso_encontrado' => true,
   *  'clave_permiso_no_encontrado' => false
   * ]
   */
  public function cargarPermisos($permiso = null) {

    $noEstan = [];
    $permisosVacios = empty($this->_permisos);
    if (!$permisosVacios) {
      if (is_array($permiso)) {
        foreach ($permiso as $p) {
          if (!isset($this->_permisos[$p])) {
            $noEstan[] = $p;
          }
        }
      } else if (!isset($this->_permisos[$permiso])) {
        $noEstan[] = $permiso;
      }
    }

    if ($permisosVacios || !empty($noEstan)) {
      $permisosQuery = (new Query())
        ->select([
          'case when ({{PermisoUsuario}}.[[idUsuario]] is not null) then true else false end as [[idUsuario]]',
          '{{Permiso}}.id',
        ])
        ->from('Permiso')
        ->leftJoin(
          'PermisoUsuario',
          '{{PermisoUsuario}}.[[idPermiso]] = {{Permiso}}.id and {{PermisoUsuario}}.[[idUsuario]] = :idUsuario',
          [':idUsuario' => $this->id]
        )
        ->andWhere([
          // 'idPermiso' => $permiso,
          '{{PermisoUsuario}}.eliminado' => null
        ]);

      if ($permisosVacios) {
        $permisosQuery->andWhere(['{{Permiso}}.id' => $permiso]);
      } else {
        $permisosQuery->andWhere(['{{Permiso}}.id' => $noEstan]);
      }

      $aux = $permisosQuery->indexBy('id')
        ->column();

      if ($permisosVacios) {
        $this->_permisos = $aux;
      } else {
        foreach ($aux as $indice => $valor) {
          $this->_permisos[$indice] = $valor;
        }
      }
    }

    return $this->_permisos;
  }

  public function validarPerfilPermisos() {
    $permisos = $this->cargarPermisos();

    $flag = false;

    foreach ($permisos as $permiso) {
      if ($permiso) {
        $flag = true;
        break;
      }
    }

    return $flag;
  }
}
