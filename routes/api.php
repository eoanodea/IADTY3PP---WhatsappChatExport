<?php
# @Author: John Carlo M. Ramos
# @Date:   2019-11-03T22:20:18+00:00
# @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
# @Last modified by:   John Carlo M. Ramos
# @Last modified time: 2019-11-07T19:21:08+00:00




use App\Http\Controllers\Admin\AdminController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/user/all', 'Admin\AdminController@index');
Route::post('/user/new', 'Admin\AdminController@store');
Route::put('/user/{id}', 'Admin\AdminController@update');
Route::delete('/user/{id}', 'Admin\AdminController@destroy');

Route::get('/user/{id}', 'User\UserController@show');

Route::get('/service/all', 'Service\HomeController@index');
Route::post('/service/new', 'Service\HomeController@store');
Route::get('/service/{id}', 'Service\HomeController@show');
Route::put('/service/{id}', 'Service\HomeController@update');
Route::delete('/service/{id}', 'Service\HomeController@destroy');

Route::get('/task/by/{service}', 'Task\HomeController@index');
Route::post('/task/{service}/new', 'Task\HomeController@store');
Route::get('/task/{id}', 'Task\HomeController@show');
Route::put('/task/{id}', 'Task\HomeController@update');
Route::delete('/task/{id}', 'Task\HomeController@destroy');

Route::get('/task/by/{service}', 'Task\HomeController@index');
Route::post('/task/{service}/new', 'Task\HomeController@store');
Route::get('/task/{id}', 'Task\HomeController@show');
Route::put('/task/{id}', 'Task\HomeController@update');
Route::delete('/task/{id}', 'Task\HomeController@destroy');

Route::get('/assignment/all', 'Assignment\AssignmentController@index');
Route::get('/assignment/by/{client}', 'Assignment\AssignmentController@indexByClient');
Route::post('/assignment/{serviceId}/{clientId}', 'Assignment\AssignmentController@store');
Route::get('/assignment/{id}', 'Assignment\AssignmentController@show');
Route::put('/assignment/{id}', 'Assignment\AssignmentController@update');
Route::delete('/assignment/{id}', 'Assignment\AssignmentController@destroy');

// Route::middleware('auth:api')->get('/user', 'UserController@AuthRouteAPI');

// Route::post('register', 'Auth\RegisterController@register');
// Route::post('login', 'Auth\LoginController@login');
// Route::post('logout', 'Auth\LoginController@logout');
