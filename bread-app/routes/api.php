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
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
    return ['token' => $token->plainTextToken];
});

//UserContoller
Route::post('/create_user', 'Api\UserController@create_user');
Route::post('/update_user', 'Api\UserController@update_user');
Route::post('/update_basicInfo_usersTable', 'Api\UserController@update_basicInfo_usersTable');
Route::post('/index_user', 'Api\UserController@index_user');

//StoreController
Route::post('/create_store', 'Api\StoreController@create_store');
Route::get('/search_store', 'Api\StoreController@search_store');
Route::post('/index_storeInfo', 'Api\StoreController@index_storeInfo');
Route::post('/update_basicInfo_storesTable', 'Api\StoreController@update_basicInfo_storesTable');
Route::post('/update_businessMemo', 'Api\StoreController@update_businessMemo');
Route::post('/update_homepage', 'Api\StoreController@update_homepage');
Route::post('/update_sns', 'Api\StoreController@update_sns');
Route::post('/update_businessDay', 'Api\StoreController@update_businessDay');
Route::post('/save_storeImages', 'Api\StoreController@save_storeImages');
Route::post('/store_pickup', 'Api\StoreController@store_pickup');
Route::post('/store_ranking', 'Api\StoreController@store_ranking');

//Store_menuController
Route::post('/create_store_menu', 'Api\StoreMenuController@create_store_menu');
Route::post('/index_menuInfo', 'Api\StoreMenuController@index_menuInfo');
Route::post('/delete_menu', 'Api\StoreMenuController@delete_menu');
Route::post('/update_menu_type_1', 'Api\StoreMenuController@update_menu_type_1');
Route::post('/create_spirit', 'Api\StoreMenuController@create_spirit');
Route::post('/update_spirit', 'Api\StoreMenuController@update_spirit');