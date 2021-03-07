<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ResetPassword;
use App\Mail\ResetPasswordMail;
use App\Classes\MailSender;
use App\Classes\StringEncryptToken;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ResetPasswordController extends Controller
{



    /**
     * メール送信
     *
     * @param Request $request
     * @return void
     */
    public function send_mail(Request $request) {
        try {
            $user = User::getUser_by_email($request->email);
            $info = StringEncryptToken::tokenString();
            ResetPassword::saveToken($request->email, $info);
            $mailContentBuilder = new ResetPasswordMail($user, $info);
            MailSender::send($mailContentBuilder, ["address" => $request->email]);

            return response()->json([
                'message' => 'success'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'fail'
            ], 500);

        }
    } 

    /**
     * Tokenが制限時間内かどうか確認
     *
     * @param Request $request
     * @return void
     */
    public function check_token(Request $request) {
        return ResetPassword::getInfoByToken($request->input('token'));
    }

    /**
     * パスワード変更
     *
     * @param Request $request
     * @return void
     */
    public function change_password(Request $request) {
        DB::beginTransaction();
        
        try{
            User::update_password($request);
            DB::commit();
            $type_user = User::getUser_by_email($request->input('email'))->type_user;
            return response()->json([
                'message' => 'success',
                'type_user' => $type_user
            ], 200);
        } catch(\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'fail'
            ], 500);
        }
    }
}