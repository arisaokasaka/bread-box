<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\User;

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

    public function login(Request $request) {
        $this->validateLogin($request);      
        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            // Log::info($user)
            $user = Auth::user();

            $user->tokens()->where('name', 'token-name')->delete();
            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json([
                'user' => $user, 
                'access_token' => $token,
            ]);    
        }
    }

    /**
     * ログアウト
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */

    public function logout(Request $request) {   
        Auth::logout();
        // Auth::user()->currentAccessToken()->delete();
    }

    /**
     * ログイン時のバリデーション
     *
     * @param Request $request
     * @return void
     */
    protected function validateLogin(Request $request) {
        $request->validate([
            'email' => 'required|string|exists:users',
            'password' => 'required|string',
        ]);
    
        $user = User::where('email', $request['email'])->first();
    
        if (!Auth::attempt(['email' => $request['email'], 'password' => $request['password']])) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
    }

}
