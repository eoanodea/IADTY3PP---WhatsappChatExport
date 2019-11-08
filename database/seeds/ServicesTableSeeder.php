<?php
# @Author: John Carlo M. Ramos
# @Date:   2019-11-07T18:46:43+00:00
# @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
# @Last modified by:   John Carlo M. Ramos
# @Last modified time: 2019-11-08T10:10:38+00:00




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

        $service = new Service ();
        $service->title = 'Web. Development';
        $service->description = 'Developing websites for any desires.';
        $service->recurring_payment = false;
        $service->standard_price = 300.00;
        $service->is_public = true;
        $service->save();

        $service = new Service ();
        $service->title = 'Catering';
        $service->description = 'Cooking desired cusines for your event.';
        $service->recurring_payment = false;
        $service->standard_price = 9999.99;
        $service->is_public = false;
        $service->save();
    }
}
