<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailBuilder extends Mailable {
    use Queueable, SerializesModels;

    public function __construct() {
        //
    }

    public function build() {
        return $this->view('view.name');
    }
}