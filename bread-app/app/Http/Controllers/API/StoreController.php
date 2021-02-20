<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Models\Store;
use App\Http\Requests\StoreRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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

    /**
     * 【作成】店舗レコード作成（店舗の新規登録時に実行）
     *
     * @param Request $request
     * @return void
     */
    public function create_store(Request $request){
        $store = new Store();
        $store->create_store($request->input('user_uuid'));
    }
    
    /**
     * 【取得】usersテーブルとstoresテーブルをjoinのうえ、そのレコード情報を取得
     *
     * @param Request $request
     * @return void
     */
    public function index_storeInfo(Request $request){
        $store = new Store();
        $get_info = $store->index_storeInfo($request->input('user_uuid'));
        return $get_info;
    }

    /**
     * 【更新】店舗基本情報
     *
     * @param Request $request
     * @return void
     */
    public function update_basicInfo_storesTable(Request $request){
        $store = new Store();
        $store->update_basicInfo_storesTable($request);
    }

    /**
     * 【更新】店舗からのお知らせ
     *
     * @param Request $request
     * @return void
     */
    public function update_businessMemo(Request $request){
        $store = new Store();
        $store->update_businessMemo($request);
    }
    
    /**
     * 【更新】ホームページ
     *
     * @param Request $request
     * @return void
     */
    public function update_homepage(Request $request){
        $store = new Store();
        $store->update_homepage($request);
    }

    /**
     * 【更新】SNS
     *
     * @param Request $request
     * @return void
     */
    public function update_sns(Request $request){
        $store = new Store();
        $store->update_sns($request);
    }

    /**
     * 【更新】営業日・営業時間
     *
     * @param Request $request
     * @return void
     */
    public function update_businessDay(Request $request){
        $store = new Store();
        $store->update_businessDay($request);
    }
    
    /**
     * ヘッダー・サムネイル画像の保存・更新
     *
     * @param $request
     * @return void
     */
    public function save_storeImages(Request $request){
        $user_uuid = $request->input('user_uuid');
        $path = '/public/store/' . $user_uuid;
        $file_header = $request->file('img_header');
        $file_thumbnail = $request->file('img_thumbnail');
        if($file_header != null){
            $fileName = 'header.jpg';
            Storage::putFileAs($path, $file_header, $fileName, 'public');
        }
        if($file_thumbnail != null){
            $fileName = 'thumbnail.jpg';
            Storage::putFileAs($path, $file_thumbnail, $fileName, 'public');
        }
    }
}