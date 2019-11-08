<?php
# @Author: John Carlo M. Ramos
# @Date:   2019-11-07T18:46:43+00:00
# @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
# @Last modified by:   John Carlo M. Ramos
# @Last modified time: 2019-11-08T08:46:54+00:00




use Illuminate\Database\Seeder;
use App\Service;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $service_list = Service::where('title')->first();

        $service = new Service ();
        $service->title = 'Model Photography';
        $service->description = 'A studio-based/public setting photoshoots.';
        $service->recurring_payment = true;
        $service->standard_price = 500.00;
        $service->is_public = true;
        $service->save();
        // $service->services()->attach($service_list);
    }
}
