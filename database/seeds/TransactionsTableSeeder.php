<?php

use Illuminate\Database\Seeder;
use App\Transaction;

class TransactionsTableSeeder extends Seeder
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
            $transaction = new Transaction;
            $transaction->amount = $faker->randomFloat(2, 0, 500);
            $transaction->assignment_id = $assignment->id;

            $transaction->save();
        }
    }
}
