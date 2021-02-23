<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserLoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * ログイン
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function login(Request $request)
    {
        // バリデーション
        $this->validateLogin($request);      
        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user->tokens()->where('name', 'token-name')->delete();
            $token = $user->createToken('token-name')->plainTextToken;
        }

        return response()->json([
            'user' => $user, 
            'access_token' => $token,
        ]);
    }

    /**
     * ログアウト
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */

    public function logout(Request $request)
    {   
        Auth::logout();
        // Auth::user()->currentAccessToken()->delete();
    }
}
