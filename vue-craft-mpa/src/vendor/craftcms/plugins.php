<?php

$vendorDir = dirname(__DIR__);
$rootDir = dirname(dirname(__DIR__));

return array (
  'nystudio107/craft-twigpack' => 
  array (
    'class' => 'nystudio107\\twigpack\\Twigpack',
    'basePath' => $vendorDir . '/nystudio107/craft-twigpack/src',
    'handle' => 'twigpack',
    'aliases' => 
    array (
      '@nystudio107/twigpack' => $vendorDir . '/nystudio107/craft-twigpack/src',
    ),
    'name' => 'Twigpack',
    'version' => '1.2.0',
    'description' => 'Twigpack is a bridge between Twig and webpack, with manifest.json & webpack-dev-server HMR support',
    'developer' => 'nystudio107',
    'developerUrl' => 'https://nystudio107.com/',
    'changelogUrl' => 'https://raw.githubusercontent.com/craft-nystudio107/twigpack/v1/CHANGELOG.md',
    'hasCpSettings' => false,
    'hasCpSection' => false,
    'components' => 
    array (
      'manifest' => 'nystudio107\\twigpack\\services\\Manifest',
    ),
  ),
);
