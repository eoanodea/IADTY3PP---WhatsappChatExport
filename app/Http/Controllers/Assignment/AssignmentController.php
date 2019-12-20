<?php

namespace App\Http\Controllers\Assignment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Assignment;
use App\User;
use App\ActiveTask;

class AssignmentController extends Controller
{
    /**
     * 
     * 
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return Assignment::all();
    }

    /**
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function indexByClient($id) {
        return Assignment::where('client_id', $id)->get();
    }

    /**
     * Creates a new assignment based on the request, service ID and client ID
     * @param  \Illuminate\Http\Request  $request
     * @param int $serviceId
     * @param  int  $clientId
     * @return \Illuminate\Http\Response
    */
    public function store(Request $request, $serviceId, $clientId) {

        $request->validate([
            'title' => 'required|string',
            'total_price' => 'required|numeric|min:0',
            'deposit' => 'required|min:0|max:100',
            'discount' => 'required|min:0|max:100',
            'deadline' => 'date|required',
        ]);

        $assignment = new Assignment;
        $assignment->title = $request->input('title');
        $assignment->total_price = $request->input('total_price');
        $assignment->deposit = $request->input('deposit');
        $assignment->discount = $request->input('discount');
        $assignment->deadline = $request->input('deadline');
        
        $assignment->service_id = $serviceId;
        $assignment->client_id = $clientId;

        $assignment->save();

        if($request->input('tasks')) {
            $tasks = $request->input('tasks');

            foreach($tasks as $task) {
                $newTask = new ActiveTask();
                $newTask->title = $task['title'];
                $newTask->description = $task['description'];
                $newTask->percent_done = $task['percent_done'];
                $newTask->assignment_id = $assignment->id; 
                $newTask->save();
            }
        }

        return response()->json([
            'status'=> 'success',
            'assignment' => $assignment->toArray()
        ], 200);
    }

    /**
     * Get the assignment by it's ID
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */
    public function show($id) {
        $assignment = Assignment::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'assignment' => $assignment->toArray()
        ]);
    }

    /**
     * 
     * Find an assignment by it's ID
     * and update
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */
    public function update(Request $request, $id) {
        
        $request->validate([
            'total_price' => 'required|numeric|min:0',
            'deposit' => 'required|min:0|max:100',
            'discount' => 'required|min:0|max:100',
            'deadline' => 'date|required',
            'completed' => 'boolean',
            'service_id' => 'integer',
            'client_id' => 'integer'
        ]);

        $assignment = Assignment::findOrFail($id);

        $assignment->total_price = $request->input('total_price');
        $assignment->deposit = $request->input('deposit');
        $assignment->discount = $request->input('discount');
        $assignment->deadline = $request->input('deadline');

        if($request->input('completed')) {
            $assignment->completed = true;
            $assignment->date_of_completion = date('Y-m-d');
        } else $assignment->completed = false;
        
        
        $assignment->service_id = $request->input('service_id');
        $assignment->client_id = $request->input('client_id');

        $assignment->save();

        return response()->json([
            'status'=> 'success',
            'assignment' => $assignment->toArray()
        ], 200);
    }

    /**
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */
    public function destroy($id) {
        $assignment = Assignment::findOrFail($id);

        $assignment->delete();
        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
