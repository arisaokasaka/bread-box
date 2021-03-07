<?php

namespace App\Mail;

use App\Common\Constant;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable {
    use Queueable, SerializesModels;

    public function __construct(User $user, string $info) {
        $this->subject = "【パンBOX】パスワード再設定";
        $this->from = $this->getFromEmail();
        $this->viewData = $this->makeViewData($user, $info);
    }


    public function build() {
        return $this->view('mail.templateResetPassword')
        ->from($this->from)
        ->subject($this->subject)
        ->with($this->viewData);
    }

    private function getFromEmail() {
        return [
            "address" => env("SES_MAIL_FROM"),
            "name" => "パンBOX"
        ];
    }

    private function makeViewData(User $user, $info) {
        return [
            "name" => $user->name,
            "email" => $user->email,
            "reset_url" => env("APP_URL") . "/password_recreate/" . $info,
        ];
    }
}