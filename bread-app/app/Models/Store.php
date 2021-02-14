<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class Store extends Model
{
    use HasFactory;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    public function all_stores() {
        return $this->newQuery()->select("*")->get();
    }

    public function find_keyword($keyword){
        return $this
        ->newQuery()
        ->join('store_menus', 'stores.uuid', '=', 'store_menus.stores_uuid')
        ->select(['stores.uuid AS stores_uuid', 'stores.name AS stores_name'])
        ->where('stores.name', 'like', '%' . $keyword. '%')
        ->orWhere('stores.message', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.bread_name', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.bread_kind', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.bread_detail', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.advantage', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.spirit', 'like', '%' .$keyword. '%')
        ->get();
    }

    // 作成：店舗レコード作成（店舗の新規登録時に実行）
    public function create_store($store_user_uuid){
        $this->uuid = Str::uuid();
        $this->user_uuid = $store_user_uuid;
        $this->save();
    }

    // 取得：usersテーブルとstoresテーブルをjoinのうえ、そのレコード情報を取得
    public function index_storeInfo($request){
        return $this
        ->newQuery()
        ->select([
            'users.name',
            'users.email',
            'users.address',
            'stores.tel',
            'stores.business_day',
            'stores.business_memo',
            'stores.message',
            'stores.url',
            'stores.sns'
        ])
        ->join('users', 'stores.user_uuid', '=', 'users.uuid')
        ->where('user_uuid', '=', $request)
        ->first();
    }

    // 更新：店舗基本情報(電話番頭、メッセージ)
    public function update_basicInfo_storesTable($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update([
            'tel' => $request['tel'],
            'message' => $request['message'],
        ]);
    }

    // 更新：店舗からのお知らせ
    public function update_businessMemo($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update(['business_memo' => $request['business_memo']]);
    }

    // 更新：ホームページ
    public function update_homepage($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update(['url' => $request['url']]);
    }
}