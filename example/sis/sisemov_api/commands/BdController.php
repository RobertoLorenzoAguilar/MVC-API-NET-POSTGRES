<?php

namespace app\commands;

use app\models\Diputado;
use app\models\Fraccion;
use yii\console\Controller;
use yii\console\ExitCode;

class BdController extends Controller {

  public function actionInsertarUsuario() {
    $usuario = new \app\models\Usuario();
    $usuario->uuid();
    $usuario->correo = "soporte@edesarrollos.com";
    $usuario->agregarClave("Edes@rrollos2023");
    $usuario->nombre = "Soporte Técnico";
    $usuario->rol = "admin";
    $usuario->estatus = "activo";
    $usuario->telefono = "1234567890";
    if(!$usuario->save()) {
      $this->stdout(json_encode($usuario->getFirstErrors()));
    }
    return ExitCode::OK;
  }

  public function actionFracciones() {
    $fracciones = [
      "MORENA",
      "PAN",
      "PT",
      "PANAL",
      "PVEM",
      "PES",
      "PMC",
      "DIP",
    ];

    foreach($fracciones as $f) {
      $fraccion = new Fraccion();
      $fraccion->uuid();
      $fraccion->clave = $f;
      if(!$fraccion->save()) {
        $this->stdout(json_encode($fraccion->getFirstErrors()) . "\n");
      }
    }
  }

  public function actionDiputados() {
    $diputados = [
      ["Ricardo", "Lugo", "Moreno", "MORENA"],
      ["Oscar Eduardo", "Castro", "Castro", "MORENA"],
      ["Maria Alicia", "Gaytán", "Sánchez", "MORENA"],
      ["Azalia", "Guevara", "Espinoza", "MORENA"],
      ["José Armando", "Gutiérrez", "Jiménez", "PAN"],
      ["Elia Sahara", "Sallard", "Hernández", "MORENA"],
      ["María Jesús", "Castro", "Urquijo", "MORENA"],
      ["Jacobo", "Mendoza", "Ruiz", "MORENA"],
      ["Karina Teresita", "Zárate", "Félix", "MORENA"],
      ["Alejandra", "López", "Noriega", "PAN"],
      ["Ivana Celeste", "Taddei", "Arriola", "MORENA"],
      ["José Rafael", "Ramírez", "Morales", "MORENA"],
      ["Sebastián Antonio", "Orduño", "Fragoza", "PT"],
      ["Rebeca Irene", "Silva", "Gallardo", "MORENA"],
      ["Héctor Raúl", "Castelo", "Montaño", "MORENA"],
      ["Iram Leobardo", "Solís", "Garcia", "PT"],
      ["Ernestina", "Castro", "Valenzuela", "MORENA"],
      ["Fermin", "Trujillo", "Fuentes", "PANAL"],
      ["Próspero", "Valenzuela", "Muñer", "MORENA"],
      ["Luis Arturo", "Robles", "Higuera", "MORENA"],
      ["Claudia Zulema", "Bours", "Corral", "PVEM"],
      ["María Sagrario", "Montaño", "Palomares", "PAN"],
      ["Ernesto", "Roger", "Munro Jr", "PES"],
      ["Natalia", "Rivera", "Grijalva", "PMC"],
      ["Ernesto", "De Lucas", "Hopkins", "PMC"],
      ["Alma Manuela", "Higuera", "Esquer", "DIP"],
      ["Lirio Anahí", "Del Castillo", "Salazar", "PVEM"],
      ["Diana Karina", "Barreras", "Samaniego", "PT"],
      ["Rosa Elena", "Trujillo", "Llanes", "PMC"],
      ["Jorge Eugenio", "Russo", "Salido", "PMC"],
      ["Beatriz", "Cota", "Ponce", "PANAL"],
      ["Paloma María", "Terán", "Villalobos", "PES"],
      ["Griselda Ilian", "López", "Martínez", "MORENA"],
    ];

    foreach($diputados as $d) {
      list($nombre, $primer, $segundo, $f) = $d;
      $fraccion = Fraccion::findOne(["clave" => $f]);
      
      $diputado = new Diputado();
      $diputado->uuid();
      $diputado->nombre = $nombre;
      $diputado->primerApellido = $primer;
      $diputado->segundoApellido = $segundo;
      if($fraccion !== null) {
        $diputado->idFraccion = $fraccion->id;
      }
      if(!$diputado->save()) {
        $this->stdout(json_encode($diputado->getFirstErrors()) . "\n");
      }
    }

    $this->stdout("Proceso terminado\n");
  }

}
