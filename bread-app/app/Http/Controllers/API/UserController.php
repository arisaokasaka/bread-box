<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function create_user(UserRequest $request){
        $user = new User();
        $user->create_user($request);
    }

    // 更新：店舗基本情報
    public function update_basicInfo_usersTable(Request $request){
        $user = new User();
        $user->update_basicInfo_usersTable($request);
    }
}
