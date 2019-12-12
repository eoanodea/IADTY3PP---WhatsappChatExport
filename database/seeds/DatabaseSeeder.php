<?php
# @Author: John Carlo M. Ramos
# @Date:   2019-11-03T22:20:18+00:00
# @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
# @Last modified by:   John Carlo M. Ramos
# @Last modified time: 2019-11-08T09:42:41+00:00




use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ServicesTableSeeder::class);
        $this->call(DefaultTaskTableSeeder::class);
        $this->call(AssignmentsTableSeeder::class);
        $this->call(ActiveTaskTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
    }
}
