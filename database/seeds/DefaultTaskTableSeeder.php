<?php

use App\DefaultTask;
use App\Service;
use Illuminate\Database\Seeder;

class DefaultTaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $services = Service::all();

        foreach($services as $service) {
            $task = new DefaultTask();
            $task->title = $faker->sentence($nbWords = 6, $variableNbWords = true);
            $task->description = $faker->sentence();
            $task->percent_done = $faker->randomFloat(2, 0, 100);
            $task->service_id = $service->id;
            $task->save();
        }
        
    }
}
