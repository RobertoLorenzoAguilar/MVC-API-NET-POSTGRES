<?php

use yii\db\Migration;

/**
 * Class m220310_234138_inicio
 */
class m220310_234138_inicio extends Migration {

  /**
   * {@inheritdoc}
   */
  public function safeUp() {

    $this->createTable('Usuario', [
      "id" => $this->string(36),
      "correo" => $this->string(100)->notNull(),
      "clave" => $this->string(100)->notNull(),
      "nombre" => $this->string(100)->notNull(),
      "primerApellido" => $this->string(100),
      "segundoApellido" => $this->string(100),
      "estatus" => $this->string(10)->comment("inactivo, activo"),
      "telefono" => $this->string(10),
      "foto" => $this->string(300),
      "rol" => $this->string(100)->notNull(),
      "creado" => $this->timestamp() . " with time zone",
      "modificado" => $this->timestamp() . " with time zone",
      "eliminado" => $this->timestamp() . " with time zone",
    ]);

    $this->addPrimaryKey("UsuarioPK", "Usuario", "id");

    $this->createTable('Media', [
      "id" => $this->string(36),
      "uuid" => $this->string(100),
      "idUsuario" => $this->string(36),
      "nombre" => $this->string(100)->notNull(),
      "extension" => $this->string(5),
      "size" => $this->string(100),
      "mimetype" => $this->string(100),
      "ruta" => $this->string(100),
      "descripcion" => $this->string(500),
      "creado" => $this->timestamp() . " with time zone",
      "modificado" => $this->timestamp() . " with time zone",
      "eliminado" => $this->timestamp() . " with time zone",
    ]);

    $this->addPrimaryKey("MediaPK", "Media", "id");
    $this->addForeignKey("MediaIdUsuarioFK", "Media", "idUsuario", "Usuario", "id");

    $this->createTable('Modulo', [
      'id' => $this->string(50),
      'nombre' => $this->string(100),
      'creado' => $this->timestamp() . ' with time zone',
      'modificado' => $this->timestamp() . ' with time zone',
      'eliminado' => $this->timestamp() . ' with time zone'
    ]);

    $this->addPrimaryKey('pk_Modulo', 'Modulo', 'id');

    $this->createTable('Permiso', [
      'id' => $this->string(50),
      'idModulo' => $this->string(50),
      'nombre' => $this->string(100),
      'descripcion' => $this->string(100),
      'creado' => $this->timestamp() . ' with time zone',
      'modificado' => $this->timestamp() . ' with time zone',
      'eliminado' => $this->timestamp() . ' with time zone'
    ]);

    $this->addPrimaryKey('pk_Permiso', 'Permiso', 'id');
    $this->addForeignKey('fk_Permiso_Modulo', 'Permiso', 'idModulo', 'Modulo', 'id');

    $this->createTable('PermisoUsuario', [
      'id' => $this->string(50),
      'idUsuario' => $this->string(50),
      'idPermiso' => $this->string(50),
      'asignado' => $this->timestamp() . ' with time zone',
      'modificado' => $this->timestamp() . ' with time zone',
      'eliminado' => $this->timestamp() . ' with time zone'
    ]);

    $this->addPrimaryKey('pk_PermisoUsuario', 'PermisoUsuario', 'id');
    $this->addForeignKey('fk_PermisoUsuario_Usuario', 'PermisoUsuario', 'idUsuario', 'Usuario', 'id');
    $this->addForeignKey('fk_PermisoUsuario_Permiso', 'PermisoUsuario', 'idPermiso', 'Permiso', 'id');

    $this->createTable('ColeccionPermiso', [
      'id' => $this->string(50),
      'clave' => $this->string(50),
      "nombre" => $this->string(100),
      "descripcion" => $this->string(100),
      "creado" => $this->timestamp() . ' with time zone',
      "modificado" => $this->timestamp() . ' with time zone',
      "eliminado" => $this->timestamp() . ' with time zone'
    ]);

    $this->addPrimaryKey('pk_coleccion_permiso', 'ColeccionPermiso', 'id');

    $this->createTable('ColeccionPermisoPermiso', [
      'idColeccion' => $this->string(50),
      'idPermiso' => $this->string(50),
      "creado" => $this->timestamp() . ' with time zone',
      "modificado" => $this->timestamp() . ' with time zone',
      "eliminado" => $this->timestamp() . ' with time zone'
    ]);
    
    $this->addPrimaryKey('pk_coleccion_permiso_permiso', 'ColeccionPermisoPermiso', ['idColeccion', 'idPermiso']);

    $this->addForeignKey('fk_coleccion_permiso_permiso_coleccion', 'ColeccionPermisoPermiso', 'idColeccion', 'ColeccionPermiso', 'id');
    $this->addForeignKey('fk_coleccion_permiso_permiso_permiso', 'ColeccionPermisoPermiso', 'idPermiso', 'Permiso', 'id');

    $this->createTable('RecuperarContrasena', [
      "id" => $this->string(36),
      "idUsuario" => $this->string(36),
      "token" => $this->integer(),
      "utilizado" => $this->timestamp() . ' with time zone',
      "cancelado" => $this->timestamp() . ' with time zone',
      "creado" => $this->timestamp() . ' with time zone',
      "modificado" => $this->timestamp() . ' with time zone',
      "eliminado" => $this->timestamp() . ' with time zone',
    ]);

    $this->addPrimaryKey('recuperar_contrasena_pk', 'RecuperarContrasena', 'id');
    $this->addForeignKey('recuperar_contrasena_usuario_fk', 'RecuperarContrasena', 'idUsuario', 'Usuario', 'id');
  }

  /**
   * {@inheritdoc}
   */
  public function safeDown() {
    $this->dropForeignKey('recuperar_contrasena_usuario_fk', 'RecuperarContrasena');
    $this->dropPrimaryKey('recuperar_contrasena_pk', 'RecuperarContrasena');

    $this->dropTable('RecuperarContrasena');

    $this->dropForeignKey('fk_coleccion_permiso_permiso_permiso', 'ColeccionPermisoPermiso');
    $this->dropForeignKey('fk_coleccion_permiso_permiso_coleccion', 'ColeccionPermisoPermiso');

    $this->dropPrimaryKey('pk_coleccion_permiso_permiso', 'ColeccionPermisoPermiso');

    $this->dropTable('ColeccionPermisoPermiso');
    
    $this->dropPrimaryKey('pk_coleccion_permiso', 'ColeccionPermiso');

    $this->dropTable('ColeccionPermiso');

    $this->dropForeignKey('fk_PermisoUsuario_Permiso', 'PermisoUsuario');
    $this->dropForeignKey('fk_PermisoUsuario_Usuario', 'PermisoUsuario');
    $this->dropPrimaryKey('pk_PermisoUsuario', 'PermisoUsuario');
    
    $this->dropTable('PermisoUsuario');

    $this->dropForeignKey('fk_Permiso_Modulo', 'Permiso');
    $this->dropPrimaryKey('pk_Permiso', 'Permiso');

    $this->dropTable('Permiso');

    $this->dropPrimaryKey('pk_Modulo', 'Modulo');

    $this->dropTable('Modulo');
    
    $this->dropForeignKey("MediaIdUsuarioFK", "Media");
    $this->dropPrimaryKey("MediaPK", "Media");

    $this->dropTable('Media');

    $this->dropPrimaryKey("UsuarioPK", "Usuario");

    $this->dropTable('Usuario');
  }
}
