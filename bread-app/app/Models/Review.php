<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Review extends Model
{
    use HasFactory;

    /**
     * レビュー新規作成
     *
     * @param object $request
     * @return void
     */
    public function create_review(object $request){
        $this->uuid = Str::uuid();
        $this->user_uuid = $request['user_uuid'];
        $this->store_uuid = $request['store_uuid'];
        $this->star = $request['star'];
        $this->comment = $request['comment'];
        $this->reply = $request['reply'];
        $this->save();
    }
}
