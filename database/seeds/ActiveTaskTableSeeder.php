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
        $titles = [
            'Initial meeting with client',
            'Design Wireframe',
            'Agree on project price',
            'Backend foundation build',
            'Backend functional testing',
            'Frontend build',
            'Frontend functional testing',
            'Frontend user testing',
            'V1 Prototype'
        ];
        $descriptions = [
            'Meet with the client to discuss the functional requirements of the project',
            'Develop a wireframe design for the project, and send to the client for approval',
            'Agree on the price of the project',
            'Begin the foundation bulid of the project. Sorting the database, data types, migrations, seeds, controllers, models, and all database relationships',
            'Run tests on the backend, including testing all API routes, and asserting funcional logic',
            'Begin the frontend build, starting with the functionality. After this the design can be implemented.',
            'Testing all frontend functionality, and routing. Ensuring that all API requests sent either return data or are handled correctly, ensuring all routes land on a corresponding component and funcional logic testing.',
            'Send the application to several users and preform indept user testing.',
            'Send a V1 prototype to the client for feedback and approval.'
        ];

        foreach($assignments as $assignment) {

            for($i = 0; $i < 5; $i++) {
                foreach ($titles as $i=>$title) {
                    $task = new ActiveTask;
                    $task->title = $title;
                    $task->description = $descriptions[$i];
                    $task->percent_done = $faker->numberBetween(0, 20);
                    $task->assignment_id = $assignment->id;
                    $task->save();
                }
            }
            
        }
    }
}
