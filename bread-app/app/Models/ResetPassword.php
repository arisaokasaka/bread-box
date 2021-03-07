<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ResetPassword extends Model
{
    use HasFactory;

    /**
     * トークンと生成時間を記録
     *
     * @param $email
     * @param $token
     * @return void
     */
    public static function saveToken($email, $token) {
        ResetPassword::query()
        ->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    /**
     * トークンが有効時間内であればレコードを取得
     *
     * @param $token
     * @return void
     */
    public static function getInfoByToken($token) {
        return ResetPassword::query()
        ->where('token', $token)
        ->where('created_at', '>=', Carbon::now()->subMinutes(30))
        ->first();
    }
}
