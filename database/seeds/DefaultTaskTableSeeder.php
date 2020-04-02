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

        foreach($services as $service) {
            foreach ($titles as $i=>$title) {
                $task = new DefaultTask();
                $task->title = $title;
                $task->description = $descriptions[$i];
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
