<?php

use function PHPSTORM_META\map;

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
  'id' => 'basic',
  'basePath' => dirname(__DIR__),
  'language' => 'es',
  'bootstrap' => ['log'],
  'aliases' => [
    '@bower' => '@vendor/bower-asset',
    '@npm' => '@vendor/npm-asset',
  ],
  'components' => [
    'request' => [
      'cookieValidationKey' => 'MwDzyBzzBQMMA8d_tiCkX-h5oMhAg8jK',
      'parsers' => [
        'application/json' => 'yii\web\JsonParser',
      ],
    ],
    'cache' => [
      'class' => 'yii\caching\FileCache',
    ],
    'user' => [
      'identityClass' => 'app\models\User',
      'enableAutoLogin' => true,
    ],
    'errorHandler' => [
      'errorAction' => 'site/error',
    ],
    'mailer' => [
      'class' => 'yii\swiftmailer\Mailer',
      'useFileTransport' => false,
      'transport' => [
        'class' => 'Swift_SmtpTransport',
        'host' => 'smtp.gmail.com',
        'username' => 'correo@gmail.com',
        'password' => 'contraseña',
        'port' => '587',
        'encryption' => 'tls',
      ],
    ],
    'log' => [
      'traceLevel' => YII_DEBUG ? 3 : 0,
      'targets' => [
        [
          'class' => 'yii\log\FileTarget',
          'levels' => ['error', 'warning'],
        ],
      ],
    ],
    'db' => $db,
    'urlManager' => [
      'enablePrettyUrl' => true,
      'showScriptName' => false,
      'rules' => [
        [
          'class' => 'common\rest\UrlRule',
          'controller' => [
            'v1/perfil',
            'v1/usuario',
            'v1/media',
            'v1/subir-archivo',
            'v1/modulo',
            'v1/permiso',
            'v1/coleccion-permiso',
          ],
        ]
      ],
    ],
  ],
  'params' => $params,
  'modules' => [
    'v1' => ['class' => 'v1\Module'],
    'pdf' => ['class' => 'pdf\Module'],
    'excel' => ['class' => 'excel\Module'],
    'mail' => ['class' => 'app\modules\mail\Module'],
    'publico' => ['class' => 'app\modules\publico\Module'],
  ]
];

if (YII_ENV_DEV) {
  // configuration adjustments for 'dev' environment
  $config['bootstrap'][] = 'debug';
  $config['modules']['debug'] = [
    'class' => 'yii\debug\Module',
    // uncomment the following to add your IP if you are not connecting from localhost.
    //'allowedIPs' => ['127.0.0.1', '::1'],
  ];

  $config['bootstrap'][] = 'gii';
  $config['modules']['gii'] = [
    'class' => 'yii\gii\Module',
    // uncomment the following to add your IP if you are not connecting from localhost.
    //'allowedIPs' => ['127.0.0.1', '::1'],
  ];
}

return $config;
