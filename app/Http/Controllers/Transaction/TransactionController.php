<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Transaction;
use App\User;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource by assignment.
     *
     * @param  int  $assignmentId
     * @return \Illuminate\Http\Response
     */
    public function indexByAssignment($id)
    {
        return Transaction::where('assignment_id', $id)->get();
    }

    /**
     * Creates a Payment Method Intent with Stripe
     * Before displaying form to user
     *
     * @return \Illuminate\Http\Response
     */
    public function createIntent($user)
    {
        $user = User::findOrFail($user);

        return response()->json([
            'status'=> 'success',
            'intent' => $user->createSetupIntent()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $assignmentId
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'userId' => 'required|numeric',
            'assignmentId' => 'required|numeric',
            'token' => 'required|string'
        ]);

        $user = User::findOrFail($request->input('userId'));
        
        if(!$user->stripe_id) $user->createAsStripeCustomer();
        $user->addPaymentMethod($request->input('token'));
dd($user);

        $transaction = new Transaction;
        $transaction->amount = $request->input('amount');
        $transaction->assignment_id = $request->input('assignmentId');
        $transaction->user_id = $request->input('userId');

        $transaction->save();

        return response()->json([
            'status'=> 'success',
            'transaction' => $transaction->toArray()
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'transaction' => $transaction->toArray()
        ]);
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
        $request->validate([
            'amount' => 'required|numeric|min:0'
        ]);

        $transaction = Transaction::findOrFail($id);
        $transaction->amount = $request->input('amount');

        $transaction->save();

        return response()->json([
            'status'=> 'success',
            'transaction' => $transaction->toArray()
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
        $transaction = Transaction::findOrFail($id);

        $transaction->delete();

        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
