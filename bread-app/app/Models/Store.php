<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class Store extends Model
{
    use HasFactory;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */


    /**
     * 店舗検索
     *
     * @param $keyword
     * @return $query
     */
    public function find_keyword($keyword){
        $query = $this
        ->newQuery()
        ->leftjoin('users', 'stores.user_uuid', '=', 'users.uuid')
        ->leftjoin('store_menus', 'stores.user_uuid', '=', 'store_menus.store_uuid');

        if($keyword){
            $query = 
            $query
            ->where(function($query) use ($keyword) {
                $query
                ->orWhere('stores.message', 'ilike', '%' .$keyword. '%')
                ->orWhere('store_menus.bread_name', 'ilike', '%' .$keyword. '%')
                ->orWhere('store_menus.bread_kind', 'ilike', '%' .$keyword. '%')
                ->orWhere('store_menus.bread_detail', 'ilike', '%' .$keyword. '%')
                ->orWhere('store_menus.advantage', 'ilike', '%' .$keyword. '%')
                ->orWhere('store_menus.spirit', 'ilike', '%' .$keyword. '%')
                ->orWhere('users.name', 'ilike', '%' .$keyword. '%')
                ->orWhere('users.address', 'ilike', '%' .$keyword. '%');
            })
            ->select([
                'users.name',
                'users.address',
                'stores.user_uuid',
                'store_menus.bread_kind',
                'stores.business_day',
                'stores.business_memo',
                'stores.message',
            ]);
        } else {
            $query = 
            $query
            ->select([
                'users.name',
                'users.address',
                'stores.user_uuid',
                'store_menus.bread_kind',

                'stores.business_day',
                'stores.business_memo',
                'stores.message',
            ]);
        }
        return $query->get();
    }

    public function search_by_district($district) {
        $query_district = $this
        ->newQuery()
        ->leftjoin('users', 'stores.user_uuid', '=', 'users.uuid')
        ->where('users.address', 'ilike', '%' .$district. '%')
        ->select([
            'users.name',
            'users.address',
            'stores.user_uuid',
            'stores.business_day',
            'stores.business_memo',
            'stores.message',
        ])
        ->get();
        return $query_district;
    }

    public function search_by_bread($bread_kind) {
        $query_bread = $this
        ->newQuery()
        ->leftjoin('users', 'stores.user_uuid', '=', 'users.uuid')
        ->leftjoin('store_menus', 'stores.user_uuid', '=', 'store_menus.store_uuid')
        ->where('store_menus.bread_kind', 'ilike', '%' .$keyword. '%')
        ->select([
            'users.name',
            'users.address',
            'stores.user_uuid',
            'stores.business_day',
            'stores.business_memo',
            'stores.message',
        ])
        ->get();

        return $query_bread;
    }

    /**
     * 全ての店舗のUUIDを取得
     *
     * @return void
     */
    public function get_all_store_uuid() {
        return $this
        ->newQuery()
        ->leftjoin('users', 'stores.user_uuid', '=', 'users.uuid')
        ->select(['stores.user_uuid', 'users.name'])
        ->get();
    }

    /**
     * ピックアップ店舗（ランダム）
     * @param int $count
     * @return $query
     */
    public function store_pickup(int $count) {
        $query = $this
        ->newQuery()
        ->leftjoin('users', 'stores.user_uuid', '=', 'users.uuid')
        ->inRandomOrder()
        ->take($count)
        ->select([
            'users.name',
            'stores.user_uuid',
        ])
        ->get();
        return $query;
    }

    /**
     * 店舗ランキング（星の点数順）
     *
     * @param integer $count
     * @return $query
     */
    public function store_ranking(int $count) {
        $query = $this
        ->newQuery()
        ->leftjoin('reviews', 'stores.user_uuid', '=', 'reviews.store_uuid')
        ->leftjoin('users', 'stores.user_uuid', '=', 'users.uuid')
        ->orderBy('reviews.star', 'asc')
        ->take($count)
        ->select([
            'users.name',
            'stores.user_uuid',
        ]);
        return $query->get();
    }

    /**
     * 【作成】店舗レコード作成（店舗の新規登録時に実行）
     *
     * @param $store_user_uuid
     * @return void
     */
    public function create_store(string $store_user_uuid){
        $this->uuid = Str::uuid();
        $this->user_uuid = $store_user_uuid;
        $this->save();
    }

    /**
     * 【取得】usersテーブルとstoresテーブルをjoinのうえ、そのレコード情報を取得
     *
     * @param $request
     * @return void
     */
    public function index_storeInfo($request){
        return $this
        ->newQuery()
        ->select([
            'users.name',
            'users.email',
            'users.address',
            'stores.user_uuid',
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

    /**
     * 【更新】店舗基本情報(電話番号、メッセージ)
     *
     * @param $request
     * @return void
     */
    public function update_basicInfo_storesTable($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update([
            'tel' => $request['tel'],
            'message' => $request['message'],
        ]);
    }

    
    /**
     * 【更新】店舗からのお知らせ
     *
     * @param $request
     * @return void
     */
    public function update_businessMemo($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update(['business_memo' => $request['business_memo']]);
    }

    /**
     * 【更新】ホームページ
     *
     * @param $request
     * @return void
     */
    public function update_homepage($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update(['url' => $request['url']]);
    }

    /**
     * 【更新】SNS
     *
     * @param $request
     * @return void
     */
    public function update_sns($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update(['sns' => $request['sns']]);
    }

    /**
     * 【更新】営業日・営業時間
     *
     * @param $request
     * @return void
     */
    public function update_businessDay($request){
        return $this
        ->where('user_uuid', '=', $request['user_uuid'])
        ->update(['business_day' => $request['business_day']]);
    }

    /**
     * 指定するuser_uuidのレコード削除
     *
     * @param string $request
     * @return void
     */
    public function delete_store(string $request) {
        return $this
        ->newQuery()
        ->where('user_uuid', '=', $request)
        ->delete();
    }
}