<?php

namespace App\Http\Controllers\Task;

use App\DefaultTask;
use App\Http\Controllers\Controller;
use App\Service;
use Illuminate\Http\Request;

class DefaultTaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Get all default tasks with pagination
     * Limits the amount to be returned
     * 
     * @param int limit
     */
    public function index($service, $limit = 5) {
        return DefaultTask::where('service_id', $service)->paginate($limit);
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
            'parentId' => $task->service_id
        ], 200);
    }

    /**
     * Remove multiple resources from storage 
     * from an array of IDs.
     *
     * @param  Array  $ids
     * @return \Illuminate\Http\Response
     */
    public function batchDestroy($ids)
    {
        $deletes = 0; 
        $errors = $ids.count();
        foreach($ids as $id) {
            $task = DefaultTask::findOrFail($id);
            $task->delete();
            $deletes++;
            $errors--;
        }

        return response()->json([
            'status' => 'success',
            'deletes' => $deletes,
            'errors' => $errors
        ], 200);
    }
}
