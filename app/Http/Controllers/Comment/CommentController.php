<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    /**
     * Retreive comments by assignment
     * @param  int  $assignmentId
     * @return \Illuminate\Http\Response
     */
    public function indexByAssignment($id) {
        $comments = Comment::where('assignment_id', $id)->get();

        return response()->json([
            'status' => 'success',
            'comment' => $comments
        ]);
    }

    /**
     * Retreive comments by task
     * @param  int  $taskId
     * @return \Illuminate\Http\Response
     */
    public function indexByTask($id) {
        $comments = Comment::where('task_id', $id)->get();

        return response()->json([
            'status' => 'success',
            'comment' => $comments
        ]);
    }

    public function show($id) {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $assignmentId
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $assignment, $user) {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {

    }
}
