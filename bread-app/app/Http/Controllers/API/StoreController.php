<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreRequest;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function index_store() {
       
        Log::info(Auth::user());
        $info = new Store();
        return $info->all_stores();
    }

    public function search_store() {
        $info = new Store();
        return $info->find_keyword('');
    }

    // 作成：店舗レコード作成（店舗の新規登録時に実行）
    public function create_store(Request $request){
        $store = new Store();
        $store->create_store($request->input('user_uuid'));
    }

    // 取得：usersテーブルとstoresテーブルをjoinのうえ、そのレコード情報を取得
    public function index_storeInfo(Request $request){
        $store = new Store();
        $get_info = $store->index_storeInfo($request->input('user_uuid'));
        return $get_info;
    }

    // 更新：店舗基本情報
    public function update_basicInfo_storesTable(Request $request){
        $store = new Store();
        $store->update_basicInfo_storesTable($request);
    }

    // 更新：店舗からのお知らせ
    public function update_businessMemo(Request $request){
        $store = new Store();
        $store->update_businessMemo($request);
    }
    
    // 更新：ホームページ
    public function update_homepage(Request $request){
        $store = new Store();
        $store->update_homepage($request);
    }
}