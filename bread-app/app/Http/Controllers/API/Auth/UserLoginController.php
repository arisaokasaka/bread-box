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
        
        Log::info('$credentials');
        Log::info($credentials);
        Log::info('$credentials');
        
        if (Auth::attempt($credentials)) {
            Log::info('Auth::attempt');
            $user = Auth::user();
            $user->tokens()->where('name', 'token-name')->delete();
            $token = $user->createToken('token-name')->plainTextToken;
            Log::info('$token');
            Log::info($token);
        }

        Log::info(Auth::user());
        Log::info(Auth::check());

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
        Log::info($request);
        Log::info(Auth::user());
        Log::info(Auth::check());

        Auth::logout();
        // Auth::user()->currentAccessToken()->delete();
        Log::info('ログアウトしました');

        Log::info(Auth::user());
        Log::info(Auth::check());
    }
}
