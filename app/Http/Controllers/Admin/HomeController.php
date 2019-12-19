<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
        // $this->middleware('role:admin');
    }

    public function redirect() {
        echo('yeh');
        return redirect()->route('admin.home');
    }

    public function index() {
        echo('admin home');
        return view('admin.home');
    }
}
