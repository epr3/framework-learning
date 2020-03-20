<?php

use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
  'endpoints' => [
    'test.json' => function () {
      return [
        'elementType' => Entry::class,
        'criteria' => ['section' => 'test'],
        'transformer' => function (Entry $entry) {
          return [
            'title' => $entry->title,
            'url' => $entry->url,
            'jsonUrl' => UrlHelper::url("test/{$entry->id}.json"),
          ];
        },
      ];
    },
    'test/<entryId:\d+>.json' => function ($entryId) {
      return [
        'elementType' => Entry::class,
        'criteria' => ['id' => $entryId],
        'one' => true,
        'transformer' => function (Entry $entry) {
          return [
            'title' => $entry->title,
            'url' => $entry->url
          ];
        },
      ];
    },
  ]
];
