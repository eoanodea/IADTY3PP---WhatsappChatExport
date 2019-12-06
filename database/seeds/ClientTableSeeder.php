<?php

use App\Client;
use Illuminate\Database\Seeder;
use App\Role;

class ClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_client = Role::where('name', 'client')->first();

        foreach($role_client->users as $user) {
            $client = new Client();
            $client->user_id = $user->id;

            $client->save();
        }
    }
}
