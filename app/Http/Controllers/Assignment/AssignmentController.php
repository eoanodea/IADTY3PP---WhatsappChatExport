<?php

namespace App\Http\Controllers\Assignment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Assignment;
use App\User;

class AssignmentController extends Controller
{
    /**
     * 
     * 
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return Assignment::all();
    }

    /**
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function indexByClient($id) {
        return Assignment::where('client_id', $id)->get();
    }

    /**
     * 
     * 
     * @return \Illuminate\Http\Response
    */
    public function store() {

        $request->validate([
            'total_price' => 'required|numeric|min:0',
            'deposit' => 'min:0|max:100',
            'discount' => 'min:0|max:100',
            'date_of_completion' => 'date|required',
            'deadline' => 'date|required',
            'completed' => 'boolean'
        ]);

        $assignment = new Assignment;
        $assignment->total_price = $request->input('total_price');
        $assignment->deposit = $request->input('deposit');
        $assignment->discount = $request->input('discount');
        $assignment->date_of_completion = $request->input('date_of_completion');
    }

    /**
     * 
     * 
     * @return \Illuminate\Http\Response
    */
    public function show() {

    }

    /**
     * 
     * 
     * @return \Illuminate\Http\Response
    */
    public function update() {

    }

    /**
     * 
     * 
     * @return \Illuminate\Http\Response
    */
    public function destroy() {
        
    }
}
