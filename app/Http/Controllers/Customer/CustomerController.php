<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class CustomerController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource by assignment.
     *
     * @param  int  $assignmentId
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $user = User::findOrFail($id);

        return Customer::where('assignment_id', $id)->get();
    }

    public function create($id, $amount) {
        
    }

    public function charge($id, $amount) {
        $user = User::findOrFail($id);

        $paymentMethod = $user->defaultPaymentMethod();

        return $user->charge($amount, $paymentMethod);
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
        
        if ($user->hasPaymentMethod()) {

            $paymentMethod = $user->defaultPaymentMethod();

            return response()->json([
                'status'=> 'success',
                'paymentMethod' => $user->createSetupIntent()
            ], 200);
        }

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

        $Customer = new Customer;
        $Customer->amount = $request->input('amount');
        $Customer->assignment_id = $request->input('assignmentId');
        $Customer->user_id = $request->input('userId');

        $Customer->save();

        return response()->json([
            'status'=> 'success',
            'Customer' => $Customer->toArray()
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
        $Customer = Customer::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'Customer' => $Customer->toArray()
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

        $Customer = Customer::findOrFail($id);
        $Customer->amount = $request->input('amount');

        $Customer->save();

        return response()->json([
            'status'=> 'success',
            'Customer' => $Customer->toArray()
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
        $Customer = Customer::findOrFail($id);

        $Customer->delete();

        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
