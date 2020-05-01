<?php

use Illuminate\Database\Seeder;
use App\ActiveTask;
use App\Assignment;
use App\Comment;
use App\Role;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $tasks = ActiveTask::all();
        $assignments = Assignment::all();

        $role_client = Role::where('name', 'client')->first();
        $clients = $role_client->users;

        // foreach($tasks as $task) {
        //     $comment = new Comment;

        //     $client = $clients[rand(0, count($clients) -1)];

        //     $comment->comment = $faker->sentence();
        //     $comment->progress = $faker->randomFloat(2, 0, 100);
        //     $comment->task_id = $task->id;
        //     $comment->user_id = $client->id;
            
        //     $comment->save();
        // }

        // foreach($assignments as $assignment) {
        //     $comment = new Comment;

        //     $comment->comment = $faker->sentence();
        //     $comment->progress = $faker->randomFloat(2, 0, 100);
        //     $comment->assignment_id = $assignment->id;
        //     $comment->user_id = $assignment->client->id;
            
        //     $comment->save();
        // }
    }
}
