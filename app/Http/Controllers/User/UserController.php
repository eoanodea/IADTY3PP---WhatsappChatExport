<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\User;
use App\Client;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $client = Client::where('user_id', $id)->first();
        $user = User::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'user' => $user->toArray(),
            'client' =>  $client->toArray()
        ]);
    }
}
