<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Models\Store;
use App\Models\User;
use App\Models\Review;
use App\Http\Requests\StoreRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Collection;

class StoreController extends Controller
{
    
    /**
     * 店舗検索
     *
     * @param Request $request
     * @return $get_info
     */
    const storage_path = 'public/store/';
    const storage_thumbnail = '/thumbnail.jpg';
    const storage_header = '/header.jpg';
    const storage_menu = '/menu/item_';
    public function search_store(Request $request) {
        Log::info($request);
        $store = new Store();
        $user = new User();
        $review = new Review();
        $keyword = $request->input('key');
        $district = $request->input('di');
        $bread_kind = $request->input('bk');
        $user_uuid = $request->input('id');
        $district && $array_district = explode('-', $district);
        $bread_kind && $array_bread_kind = explode('-', $bread_kind);
        
        $result = [];
        $get_info = [];
        $check_uuid = [];
        $check_user_uuid = $user_uuid !== 'null' && $user_uuid;
        if($check_user_uuid) {
            if($user_uuid) {
                $favorite_info = $user->index_favorite($user_uuid);
                $favorite_info && $favorite_list = json_decode($favorite_info[0]->favorite);
                $interested_info = $user->index_interested($user_uuid);
                $interested_info && $interested_list = json_decode($interested_info[0]->interested);
            }
        }
        
        if($keyword){
            $keyword = str_replace('　', ' ', $keyword);
            $keyword = str_replace('%', ' ', $keyword);
            $array_keyword = explode(' ', $keyword);
            
            foreach($array_keyword as $word){
                $get_info = $store->find_keyword($word);
            
                if($get_info) {
                    foreach($get_info as $el){
                        if(!(in_array($el->user_uuid, $check_uuid))) {
                            array_push($check_uuid, $el->user_uuid);
                            array_push($result, $el);
                        }
                    }
                }
            }
        }else if($district){
            if($bread_kind){
                foreach($array_district as $el){
                    $get_info = $store->search_by_district($el);
                    foreach($array_bread_kind as $el){
                        $get_info = $store->search_by_bread($el);
                        if($get_info) {
                            foreach($get_info as $el){
                                if(!(in_array($el->user_uuid, $check_uuid))) {
                                    array_push($check_uuid, $el->user_uuid);
                                    array_push($result, $el);
                                }
                            }
                        }
                    }
                }
            }else{
                foreach($array_district as $el){
                    $result = $store->search_by_district($el);
                }
            }
        }else if($bread_kind){
            foreach($array_bread_kind as $el){
                $get_info = $store->search_by_bread($el);
                
                if($get_info) {
                    foreach($get_info as $el){
                        if(!(in_array($el->user_uuid, $check_uuid))) {
                            array_push($check_uuid, $el->user_uuid);
                            array_push($result, $el);
                        }
                    }
                }
            }
        }else{
            $result = $store->find_keyword("")->get();
        }

        foreach($result as $store) {
            $store['thumbnail'] = Storage::exists(self::storage_path . $store->user_uuid . self::storage_thumbnail);
            $store['menu1'] = Storage::exists(self::storage_path . $store->user_uuid . self::storage_menu . '1.jpg');
            $store['menu2'] = Storage::exists(self::storage_path . $store->user_uuid . self::storage_menu . '2.jpg');
            $store['menu3'] = Storage::exists(self::storage_path . $store->user_uuid . self::storage_menu . '3.jpg');
            $review = new Review;
            $count = 0;
            $score_total = 0;
            $star_list = $review->get_star($store['user_uuid']);

            if($check_user_uuid) {
                if($favorite_list){
                    foreach($favorite_list as $favorite){
                        if($store['user_uuid']===$favorite){
                            $store['favorite_checked'] = true;
                        }
                    }
                }

                if($interested_list){
                    foreach($interested_list as $interested){
                        if($store['user_uuid']===$interested){
                            $store['interested_checked'] = true;
                        }
                    }
                }
            }
            
            if(count($star_list)!==0){
                foreach($star_list as $item) {
                    $score_total = $score_total + $item['star'];
                    $count = $count + 1;
                }
                $score = $score_total/$count;
                $store['scoreInfo'] = array( 'score' => $score, 'count' => $count);
            }else{
                $store['scoreInfo'] = array( 'score' => 0, 'count' => 0);
            }
        }
        return $result;
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
        $user_type = $request->input('user_type');
        $storeInfo = $store->index_storeInfo($request->input('store_uuid'));
        $storeInfo['header'] = Storage::exists(self::storage_path . $request->input('store_uuid') . self::storage_header);

        if($user_type==="user"){
            $user = new User();
            $user_uuid = $request->input('user_uuid');

            if($user_uuid) {
                $favorite_info = $user->index_favorite($user_uuid);
                $favorite_info && $favorite_list = json_decode($favorite_info[0]->favorite);
                $interested_info = $user->index_interested($user_uuid);
                $interested_info && $interested_list = json_decode($interested_info[0]->interested);

                if($favorite_list){
                    foreach($favorite_list as $favorite){
                        if($storeInfo['user_uuid']===$favorite){
                            $storeInfo['favorite_checked'] = true;
                        }
                    }
                }

                if($interested_list){
                    foreach($interested_list as $interested){
                        if($storeInfo['user_uuid']===$interested){
                            $storeInfo['interested_checked'] = true;
                        }
                    }
                }
            }
        }
        return $storeInfo;
    }

    /**
     * ピックアップ店舗（ランダム）
     *
     * @param Request $request
     * @return $get_info
     */
    public function store_pickup(Request $request) {
        $store = new Store();
        $count = $request->input('count');
        $get_info = $store->store_pickup($count);
        
        foreach($get_info as $store){
            $store['thumbnail'] = Storage::exists(self::storage_path . $store->user_uuid . self::storage_thumbnail);
        }
        
        return $get_info;
    }
    
    /**
     * 店舗ランキング（星の点数順）
     *
     * @param Request $request
     * @return $get_info
     */
    public function store_ranking(Request $request) {
        $store = new Store();
        $review = new Review();
        $count = $request->input('count');
        $store_list = $store->get_all_store_uuid();

        if($store_list){
            $store_array = [];
            foreach($store_list as $el){
                $star_list = $review->get_star($el->user_uuid);
                
                if(count($star_list)!==0){
                    $score_total = 0;
                    $els = 0;
                
                    foreach($star_list as $item) {
                        $score_total = $score_total + $item['star'];
                        $els = $els + 1;
                    }
                    $el['score'] = $score_total/$els;
                }else{
                    $el['score'] = 0;
                }
                array_push($store_array, $el);
            }

            foreach($store_array as $key => $value){
                $sort_keys[$key] = $value['score'];
            }
            
            array_multisort($sort_keys, SORT_DESC, $store_array);
            $result = array_slice($store_array, 0, $count);
    
        }else{
            $result = $store->store_pickup($count);
        }
        
        foreach($result as $result_el){
            $result_el['thumbnail'] = Storage::exists(self::storage_path . $store->user_uuid . self::storage_thumbnail);
        }
        
        return $result;
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

    /**
     * ログインユーザーのUUID取得
     *
     * @param Request $request
     * @return void
     */
    public function get_uuid (Request $request) {
        $uuid = $request->input('uuid');
        return $uuid;
    }
}