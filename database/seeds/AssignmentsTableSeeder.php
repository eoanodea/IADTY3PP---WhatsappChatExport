<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\Service;
use App\Assignment;

class AssignmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Define faker for filling visit with fake data
        $faker = \Faker\Factory::create();

        $role_client = Role::where('name', 'client')->first();
        $services = Service::all();
        
        foreach($role_client->users as $user) {
            //Get a random service and assign it to the Assignment
            $service = $services[rand(0, count($services) -1)];

            $assignment = new Assignment;
            $assignment->title = $faker->domainName;
            $assignment->total_price = $faker->numberBetween($min = 10, $max = 500);
            $assignment->deposit = $faker->numberBetween($min = 0, $max = 100);
            $assignment->discount = $faker->numberBetween($min = 0, $max = 100);
            $assignment->date_of_completion = $faker->date($format="Y-m-d", $startDate = 'today');
            $assignment->deadline = $faker->date($format="Y-m-d", $startDate = 'today');
            
            $assignment->service_id = $service->id;
            $assignment->client_id = $user->id;

            $assignment->save();
        }
    }
}
