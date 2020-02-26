<?php

use Illuminate\Database\Seeder;
use App\ActiveTask;
use App\Assignment;

class ActiveTaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $assignments = Assignment::all();

        foreach($assignments as $assignment) {

            for($i = 0; $i < 10; $i++) {
                $task = new ActiveTask;
                $task->title = $faker->sentence($nbWords = 6, $variableNbWords = true);
                $task->description = $faker->sentence();
                $task->percent_done = $faker->randomFloat(2, 0, 10);
                $task->assignment_id = $assignment->id;
                $task->save();
            }
            
        }
    }
}
