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

        $services = Service::where('default', false)->get();

        foreach($services as $service) {
            for($i = 0; $i < 10; $i++) {
                $task = new DefaultTask();
                $task->title = $faker->sentence($nbWords = 6, $variableNbWords = true);
                $task->description = $faker->sentence();
                $task->percent_done = $faker->randomFloat(2, 0, 100);
                $task->service_id = $service->id;
                $task->save();
            }
            //Attempted to create factory for default task
            //Error thrown, unable to assign it a service ID with the below code
            // factory(App\DefaultTask::class, 5)->create()->each(function ($task) {
            //     $task->service_id = $service->id;
            // });
        }
        
    }
}
