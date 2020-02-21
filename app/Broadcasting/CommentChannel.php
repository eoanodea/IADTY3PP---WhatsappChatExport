<?php

namespace App\Broadcasting;

use App\User;
use App\Comment;

class CommentChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $user, Comment $comment)
    {

        return $user->id === $comment->assignment->client_id || $user->role->role_id === 1;
    }
}
