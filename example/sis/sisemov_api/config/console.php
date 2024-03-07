<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
  'id' => 'basic-console',
  'basePath' => dirname(__DIR__),
  'bootstrap' => ['log', 'mail'],
  'controllerNamespace' => 'app\commands',
  'aliases' => [
    '@bower' => '@vendor/bower-asset',
    '@npm'   => '@vendor/npm-asset',
    '@tests' => '@app/tests',
  ],
  'components' => [
    'cache' => [
      'class' => 'yii\caching\FileCache',
    ],
    'log' => [
      'targets' => [
        [
          'class' => 'yii\log\FileTarget',
          'levels' => ['error', 'warning'],
        ],
      ],
    ],
    'mailer' => [
      'class' => 'yii\swiftmailer\Mailer',
      'useFileTransport' => false,
      'transport' => [
        'class' => 'Swift_SmtpTransport',
        'host' => 'smtp.gmail.com',
        'username' => 'transparenciasonora22@gmail.com',
        'password' => 'kzzeysxfeknljkbi',
        'port' => '587',
        'encryption' => 'tls',
      ],
    ],
    'db' => $db,
  ],
  'params' => $params,
  'modules' => [
    'mail' => ['class' => 'app\modules\mail\Module']
  ],
  /*
  'controllerMap' => [
      'fixture' => [ // Fixture generation command line.
          'class' => 'yii\faker\FixtureController',
      ],
  ],
  */
];

if (YII_ENV_DEV) {
  // configuration adjustments for 'dev' environment
  $config['bootstrap'][] = 'gii';
  $config['modules']['gii'] = [
    'class' => 'yii\gii\Module',
  ];
}

return $config;
