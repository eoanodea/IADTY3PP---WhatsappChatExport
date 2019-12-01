<?php

namespace App\Http\Controllers\Task;

use App\DefaultTask;
use App\Http\Controllers\Controller;
use App\Service;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index($service) {
        $services = Service::findOrFail($service);
        $tasks = $services->task;

        return response()->json([
            'status' => 'success',
            'task' => $tasks
        ]);
    }

    public function show($id) {
        $task = DefaultTask::findOrFail($id);
  
        return response()->json([
          'status' => 'success',
          'task' => $task->toArray()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $service)
    {
        $request->validate([
            'title' => 'required|max:191',
            'description' => 'required|max:191',
            'percent_done' => 'required|max:100',
        ]);

        $task = new DefaultTask();
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->percent_done = $request->input('percent_done');
        $task->service_id = $service;

        $task->save();

        return response()->json([
            'status'=> 'success',
            'task'=> $task->toArray()
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
      $task = DefaultTask::findOrFail($id);
      
      $request->validate([
        'title' => 'max:191',
        'description' => 'max:191',
        'percent_done' => 'max:100',
        ]);

        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->percent_done = $request->input('percent_done');

        $task->save();

        return response()->json([
        'status'=> 'success',
        'task'=> $task->toArray()
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
        $task = DefaultTask::findOrFail($id);
        $task->delete();

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
