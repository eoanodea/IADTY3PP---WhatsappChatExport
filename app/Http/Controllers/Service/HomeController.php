<?php
# @Author: John Carlo M. Ramos
# @Date:   2019-11-07T18:50:46+00:00
# @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
# @Last modified by:   John Carlo M. Ramos
# @Last modified time: 2019-11-08T10:05:58+00:00




namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service;
use App\DefaultTask;
use App\Assignment;

class HomeController extends Controller
{
  public function __construct()
    {
        $this->middleware('auth');
    }  

    /**
     * Get all services with pagination
     * Limits the amount to be returned
     * 
     * @param int limit
     */
    public function index(int $limit = 5) {
      return Service::paginate($limit);
    }

    public function show($id) {
      $service = Service::findOrFail($id);

      return response()->json([
        'status' => 'success',
        'service' => $service->toArray()
      ]);
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

      return response()->json([
        'status'=> 'success',
        'service'=> $service->toArray()
      ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $service = Service::findOrFail($id);
      
      $request->validate([
        'title' => 'max:191',
        'description' => 'max:191',
        'standard_price' => 'numeric|min:0',
      ]);

      $service->title = $request->input('title');
      $service->description = $request->input('description');
      $service->recurring_payment = $request->input('recurring_payment');
      $service->standard_price = $request->input('standard_price');
      $service->is_public = $request->input('is_public');

      $service->save();

      return response()->json([
        'status'=> 'success',
        'service'=> $service->toArray()
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $tasks = $service->task;

        $assignments = Assignment::where('service_id', $id);
        $default_service = Service::where('default', true)->first();

        if($assignments) {
          foreach($assignments as $assignment) {
            $assignment->service_id = $default_service->id;
            $assignment->save();
          }
        }

        if($tasks) {
          foreach($tasks as $task) {
            $task->delete();
          }
        }
        $service->delete();

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
