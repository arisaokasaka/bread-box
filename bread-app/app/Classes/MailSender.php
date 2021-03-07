<?php

namespace App\Classes;

use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class MailSender {
    public static function send(Mailable $mail_builder, array $to, $cc =[], array $bcc = []){
        try{
            if(env("APP_ENV") == "testing") Mail::fake();

            Mail::to($to)
            ->cc($cc)
            ->bcc($bcc)
            ->queue($mail_builder);
        } catch (\Exception $exception){
            Log::error($exception);
            throw $exception;
        }
    }
}