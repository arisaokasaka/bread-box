<?php

namespace App\Classes;

use Illuminate\Support\Str;

class StringEncryptToken {
    public static function tokenString() {
        return Str::random(32);
    }
}