<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\StoreController;
use App\Http\Controllers\API\StoreMenuController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\ResetPasswordController;
use App\Http\Controllers\API\Auth\UserLoginController;

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

// UserLoginController
Route::post('/login', [UserLoginController::class, 'login'])->name('login');
Route::get('/logout', [UserLoginController::class, 'logout'])->name('logout');

// Auth
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
    return ['token' => $token->plainTextToken];
});

// UserContoller
Route::post('/create_user', [UserController::class, 'create_user']);
Route::post('/update_user', [UserController::class, 'update_user']);
Route::post('/update_basicInfo_usersTable', [UserController::class, 'update_basicInfo_usersTable']);
Route::post('/index_user', [UserController::class, 'index_user']);
Route::post('/update_favorite', [UserController::class, 'update_favorite']);
Route::post('/index_favorite_list', [UserController::class, 'index_favorite_list']);
Route::post('/update_interested', [UserController::class, 'update_interested']);
Route::post('/index_interested_list', [UserController::class, 'index_interested_list']);
Route::post('/delete_user_account', [UserController::class, 'delete_user_account']);
Route::post('/delete_store_account', [UserController::class, 'delete_store_account']);

// StoreController
Route::post('/create_store', [StoreController::class, 'create_store']);
Route::get('/search_store', [StoreController::class, 'search_store']);
Route::post('/index_storeInfo', [StoreController::class, 'index_storeInfo']);
Route::post('/update_basicInfo_storesTable', [StoreController::class, 'update_basicInfo_storesTable']);
Route::post('/update_businessMemo', [StoreController::class, 'update_businessMemo']);
Route::post('/update_homepage', [StoreController::class, 'update_homepage']);
Route::post('/update_sns', [StoreController::class, 'update_sns']);
Route::post('/update_businessDay', [StoreController::class, 'update_businessDay']);
Route::post('/save_storeImages', [StoreController::class, 'save_storeImages']);
Route::post('/store_pickup', [StoreController::class, 'store_pickup']);
Route::post('/store_ranking', [StoreController::class, 'store_ranking']);
Route::post('/get_uuid', [StoreController::class, 'get_uuid']);

// Store_menuController
Route::post('/create_store_menu', [StoreMenuController::class, 'create_store_menu']);
Route::post('/index_menuInfo', [StoreMenuController::class, 'index_menuInfo']);
Route::post('/delete_menu', [StoreMenuController::class, 'delete_menu']);
Route::post('/update_menu_type_1', [StoreMenuController::class, 'update_menu_type_1']);
Route::post('/update_spirit_advantage', [StoreMenuController::class, 'update_spirit_advantage']);

// ReviewController
Route::post('/create_review', [ReviewController::class, 'create_review']);
Route::post('/index_review', [ReviewController::class, 'index_review']);
Route::post('/get_score', [ReviewController::class, 'get_score']);
Route::post('/register_reply', [ReviewController::class, 'register_reply']);
Route::post('/delete_reply', [ReviewController::class, 'delete_reply']);
Route::post('/index_review_by_user', [ReviewController::class, 'index_review_by_user']);
Route::post('/delete_review', [ReviewController::class, 'delete_review']);
Route::post('/update_review', [ReviewController::class, 'update_review']);

// ResetPasswordController
Route::post('/change_password', [ResetPasswordController::class, 'change_password']);
Route::post('/send_mail', [ResetPasswordController::class, 'send_mail']);
Route::post('/check_token', [ResetPasswordController::class, 'check_token']);