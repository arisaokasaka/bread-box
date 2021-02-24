<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    /**
     * ユーザー新規登録（店舗含む）
     *
     * @param UserRequest $request
     * @return void
     */
    public function create_user(UserRequest $request){
        $user = new User();
        $user->create_user($request);
    }

    // 更新：店舗基本情報
    public function update_basicInfo_usersTable(Request $request){
        $user = new User();
        $user->update_basicInfo_usersTable($request);
    }

    /**
     * ユーザー情報更新
     *
     * @param Request $request
     * @return void
     */
    public function update_user(Request $request) {
        $user = new User();
        $user->update_user($request);
    }

    /**
     * ユーザー情報取得
     *
     * @param Request $request
     * @return void
     */
    public function index_user(Request $request) {
        $user_uuid = $request->input('uuid');
        $user = new User();
        return $user->index_user($user_uuid);
    }
    
}
