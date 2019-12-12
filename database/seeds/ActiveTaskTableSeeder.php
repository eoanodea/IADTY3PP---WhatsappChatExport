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
            $task = new ActiveTask;
            $task->title = $faker->title;
            $task->description = $faker->sentence();
            $task->percent_done = $faker->randomFloat(2, 0, 100);
            $task->assignment_id = $assignment->id;
            $task->save();
        }
    }
}
