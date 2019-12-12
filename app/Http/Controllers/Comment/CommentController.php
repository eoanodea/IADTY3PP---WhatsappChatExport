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
        $comment = Comment::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'comment' => $comment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $user) {
        if(!$request->input('assignment_id') && !$request->input('task_id')) {
            return response()->json([
                'status' => 'success',
                'error' => 'You must provide either an assignment ID or task ID'
            ], 400);
        }

        $request->validate([
            'progress' => 'required|min:0|max:100',
            'comment' => 'required|string',
        ]);

        $comment = new Comment;
        $comment->comment = $request->input('comment');
        $comment->progress = $request->input('progress');
        $comment->user_id = $user;

        if($request->input('assignment_id')) {
            $comment->assignment_id = $request->input('assignment_id');
        } else $comment->task_id = $request->input('task_id');

        $comment->save();

        return response()->json([
            'status' => 'success',
            'comment' => $comment->toArray()
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $request->validate([
            'progress' => 'required|min:0|max:100',
            'comment' => 'required|string',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->comment = $request->input('comment');
        $comment->progress = $request->input('progress');

        $comment->save();

        return response()->json([
            'status' => 'success',
            'comment' => $comment->toArray()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
