<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Assignment;
use App\ActiveTask;

class ActiveTaskController extends Controller
{
    public function index($assignment) {
        $assignments = Assignment::findOrFail($assignment);
        $tasks = $assignments->task;

        return response()->json([
            'status' => 'success',
            'task' => $tasks
        ]);
    }

    public function show($id) {
        $task = ActiveTask::findOrFail($id);
  
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
    public function store(Request $request, $assignment)
    {
        $request->validate([
            'title' => 'required|max:191',
            'description' => 'required|max:191',
            'percent_done' => 'required|max:100',
        ]);

        $task = new ActiveTask();
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->percent_done = $request->input('percent_done');
        $task->assignment_id = $assignment;

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
      $task = ActiveTask::findOrFail($id);
      
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
        $task = ActiveTask::findOrFail($id);
        $task->delete();

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
