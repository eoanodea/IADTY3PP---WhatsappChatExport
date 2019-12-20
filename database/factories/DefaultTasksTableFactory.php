<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\DefaultTask;

$factory->define(DefaultTask::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'description' => $faker->sentence(),
        'percent_done' => $faker->randomFloat(2, 0, 100),
    ];
});
