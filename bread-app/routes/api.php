<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

//UserLoginController
Route::post('/login', 'Api\Auth\UserLoginController@login')->name('login');
Route::get('/logout', 'Api\Auth\UserLoginController@logout')->name('logout');

//Auth
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    Log::info('auth:sanctum');
    Log::info($request);
    Log::info(Auth::user());

    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

//UserContoller
Route::post('/create_user', 'Api\UserController@create_user');

//StoreController
Route::post('/create_store', 'Api\StoreController@create_store');
Route::post('/index_storeInfo', 'Api\StoreController@index_storeInfo');
Route::post('/store_all', 'Api\StoreController@search_store');
Route::post('/index_store', 'Api\StoreController@index_store');
Route::post('/update_businessMemo', 'Api\StoreController@update_businessMemo');

//Store_menuController
Route::post('/create_store_menu', 'Api\StoreMenuController@create_store_menu');