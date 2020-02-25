<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Comment;
use App\Events\MessagePushed;
use App\User;

class CommentController extends Controller
{

    /**
     * Retreive comments by assignment
     * @param  int  $assignmentId
     * @return \Illuminate\Http\Response
     */
    public function indexByAssignment($id) {
        $comments = Comment::with('User')->where('assignment_id', $id)->get();

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
        $comments = Comment::with('User')->where('task_id', $id)->get();
        
        return response()->json([
            'status' => 'success',
            'comment' => $comments
        ]);
    }

    public function show($id) {
        $comment = Comment::with('User')->where('id', $id)->first();

        return response()->json([
            'status' => 'success',
            'comment' => $comment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param String $isAssignment
     * @param  int  $assignmentId / $taskId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $isAssignment, $id) {

        $request->validate([
            'progress' => 'required|min:0|max:100',
            'comment' => 'required|string',
            'user_id' => 'unique:users,id,'.$request->input('user_id')
        ]);

        $comment = new Comment;
        $comment->comment = $request->input('comment');
        $comment->progress = $request->input('progress');
        $comment->user_id = $request->input('user_id');;

        if($isAssignment === 'assignment') {
            $comment->assignment_id = $id;
        } else $comment->task_id = $id;

        $comment->save();
        $user = User::findOrFail($comment->user_id);

        broadcast(new MessagePushed($user, $comment))->toOthers();


        return response()->json([
            'status' => 'success',
            'comment' => $comment,
            'user' => $user
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
