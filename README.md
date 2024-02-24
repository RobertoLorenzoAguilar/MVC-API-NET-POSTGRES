# Guía de Configuración de Base de Datos y Entorno de Desarrollo

Este documento proporciona una guía paso a paso para configurar la base de datos y el entorno de desarrollo necesarios para el proyecto.

## 1. Diseño de la Base de Datos

El diseño de la base de datos debe incluir todas las tablas necesarias, relaciones entre tablas y campos pertinentes para el proyecto. A continuación, se detalla el diseño propuesto:

- Tabla 1: 
  - Campos: 
  - Relaciones: 

- Tabla 2:
  - Campos:
  - Relaciones:

[//]: # (Añadir más tablas según sea necesario)

## 2. Crear Rol de Usuario y Asignarlo a la Base de Datos

Es importante asignar un rol de usuario con los permisos adecuados para acceder y administrar la base de datos. Ejecutar el siguiente comando en PostgreSQL:

```sql
CREATE USER robert WITH SUPERUSER LOGIN PASSWORD 'root';
```

## 3. Crear la Base de Datos en PostgreSQL

Utilizando el comando `createdb`, podemos crear la base de datos con el propietario especificado:

```bash
createdb contrato_db --owner=robert --template=template0
```

## 4. Importar en Caso de Ya Tenerla

En caso de tener una base de datos existente, se puede importar utilizando herramientas como `pg_restore` o `psql`.

## 5. Conexión con DataGrip

Utilizar DataGrip u otro cliente PostgreSQL para conectarse a la base de datos recién creada.

## 6. Restaurar la Base de Datos en Caso de Tener un Backup

En caso de tener un respaldo de la base de datos, se puede restaurar utilizando herramientas como `pg_restore` o `psql`.

## 7. Checar el Diagrama desde el Gestor de BD

Se puede generar un diagrama de la base de datos desde el mismo gestor de base de datos para tener una visualización clara de la estructura.

## 8. Instalación de Microsoft Visual Studio y Herramientas de Asp.net Web

Para el desarrollo del proyecto, es necesario instalar Microsoft Visual Studio y seleccionar las herramientas de Asp.net Web durante la instalación.

¡El entorno de desarrollo y la base de datos ahora están configurados y listos para comenzar a trabajar en el proyecto!

[//]: # (Añadir más pasos según sea necesario)
