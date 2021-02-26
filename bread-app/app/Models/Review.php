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
    public function create_review(object $request) {
        $this->uuid = Str::uuid();
        $this->user_uuid = $request['user_uuid'];
        $this->store_uuid = $request['store_uuid'];
        $this->star = $request['star'];
        $this->comment = $request['comment'];
        $this->reply = $request['reply'];
        $this->save();
    }

    /**
     * レビュー情報取得(store_uuidより)
     *
     * @param string $store_uuid
     * @return void
     */
    public function index_review(string $store_uuid) {
        return $this
        ->newQuery()
        ->where('store_uuid', '=', $store_uuid)
        ->select([
            'uuid',
            'user_uuid',
            'store_uuid',
            'star',
            'comment',
            'reply',
            'created_at'
        ])
        ->get();
    }

    /**
     * レビュー情報取得(user_uuidより)
     *
     * @param string $user_uuid
     * @return void
     */
    public function index_review_by_user(string $user_uuid) {
        return $this
        ->newQuery()
        ->where('user_uuid', '=', $user_uuid)
        ->select([
            'uuid',
            'user_uuid',
            'store_uuid',
            'star',
            'comment',
            'reply',
            'created_at'
        ])
        ->get();
    }

    /**
     * レビュー情報カウント(user_uuidより)
     *
     * @param string $user_uuid
     * @return void
     */
    public function count_review(string $user_uuid) {
        return $this
        ->newQuery()
        ->where('user_uuid', '=', $user_uuid)
        ->select([
            'uuid',
        ])
        ->get();
    }

    /**
     * スコアのみ取得
     *
     * @param string $store_uuid
     * @return void
     */
    public function get_star(string $store_uuid) {
        return $this
        ->newQuery()
        ->where('store_uuid', '=', $store_uuid)
        ->select([
            'star',
        ])
        ->get();
    }

    /**
     * 返信を登録
     *
     * @param [type] $request
     * @return void
     */
    public function register_reply($request) {
        return $this
        ->where('uuid', '=', $request['review_uuid'])
        ->update([
            'reply' => $request['reply'],
        ]);
    }

    /**
     * 返信を削除
     *
     * @param 
     * @return void
     */
    public function delete_reply($review_uuid) {
        return $this
        ->where('uuid', '=', $review_uuid)
        ->update(['reply' => null]);
    }   
}
