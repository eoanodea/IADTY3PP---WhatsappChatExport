<?php
# @Author: John Carlo M. Ramos
# @Date:   2019-11-07T18:50:46+00:00
# @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
# @Last modified by:   John Carlo M. Ramos
# @Last modified time: 2019-11-07T19:20:39+00:00




namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service;

class HomeController extends Controller
{
    public function index() {
      return Service::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $request->validate([
        'title' => 'required|max:191',
        'description' => 'required|max:191',
        'recurring_payment' => 'required',
        'standard_price' => 'required|numeric|min:0',
        'is_public' => 'required'
      ]);

      $service = new Service();
      $service->title = $request->input('title');
      $service->description = $request->input('description');
      $service->recurring_payment = $request->input('recurring_payment');
      $service->standard_price = $request->input('standard_price');
      $service->is_public = $request->input('is_public');

      $service->save();

      return $service;
    }
}
