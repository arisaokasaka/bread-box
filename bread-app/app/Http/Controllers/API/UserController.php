<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Models\Store;
use App\Models\Review;
use App\Models\StoreMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * ユーザー新規登録（店舗含む）
     *
     * @param UserRequest $request
     * @return void
     */
    public function create_user(UserRequest $request){
        $user = new User();
        $user->create_user($request);
    }

    /**
     *　店舗基本情報更新
     *
     * @param Request $request
     * @return void
     */
    public function update_basicInfo_usersTable(Request $request){
        $user = new User();
        $user->update_basicInfo_usersTable($request);
    }

    /**
     * ユーザー情報更新
     *
     * @param Request $request
     * @return void
     */
    public function update_user(Request $request) {
        $user = new User();
        $user->update_user($request);

        // 画像をstorageに保存
        $image = $request->file('image');
        if($image){
            $uuid = $request->input('uuid');
            $path = '/public/user/' . $uuid;
            $fileName = 'profile.jpg';
            Storage::putFileAs($path, $image, $fileName, 'public');
        }
    }

    /**
     * ユーザー情報取得
     *
     * @param Request $request
     * @return $user->index_user($user_uuid)
     */
    public function index_user(Request $request) {
        $user_uuid = $request->input('uuid');
        $user = new User();
        $review = new Review();
        $review_list = $review->count_review($user_uuid);
        $get_info = $user->index_user($user_uuid);
        $get_info[0]['profile'] = Storage::exists("public/user/" . $user_uuid . "/profile.jpg");
        $get_info[0]['review_count'] = count($review->count_review($user_uuid));
        return $get_info;
    }

    /**
     * お気に入り情報更新
     *
     * @param Request $request
     * @return void
     */
    public function update_favorite(Request $request) {
        $user = new User();
        $user_uuid = $request->input('uuid');
        $store_uuid = $request->input('store_uuid');
        $get_info = $user->index_favorite($user_uuid);
        $favorite_info = $get_info[0]->favorite;

        if($favorite_info) {
            $store_list = json_decode($favorite_info);
            $key = array_search($store_uuid, $store_list);
            
            if($key !== false) {
                array_splice($store_list, $key, 1);
            }else{
                array_push($store_list, $store_uuid);
            }

            if(empty($store_list)){
                $json_store = null;
            }else{
                $json_store = json_encode($store_list);
            }

        }else{
            $array_store = [];
            array_push($array_store, $store_uuid);
            $json_store = json_encode($array_store);
        }
        $user->update_favorite($user_uuid, $json_store);
    }

    /**
     * お気に入り済店舗情報を取得
     *
     * @param Request $request
     * @return $user->index_favorite_list($user_uuid)
     */
    public function index_favorite_list(Request $request) {
        $user = new User();
        $user_uuid = $request->input('uuid');
        $get_info = $user->index_favorite($user_uuid);
        $store_list = json_decode($get_info[0]->favorite);
        $interested_info = $user->index_interested($user_uuid);
        $interested_info && $interested_list = json_decode($interested_info[0]->interested);
        $result = [];

        if($store_list){
            foreach($store_list as $store_uuid){
                $get_info = $user->get_storeInfo($store_uuid);
                if($get_info) {
                    $get_info['favorite_checked'] = true;
                    $get_info['thumbnail'] = Storage::exists("public/store/" . $store_uuid . "/thumbnail.jpg");
                    $review = new Review;
                    $count = 0;
                    $score_total = 0;
                    $star_list = $review->get_star($get_info['user_uuid']);
                    
                    if(count($star_list)!==0){
                        foreach($star_list as $item) {
                            $score_total = $score_total + $item['star'];
                            $count = $count + 1;
                        }
                        $score = $score_total/$count;
                        $get_info['scoreInfo'] = array( 'score' => $score, 'count' => $count);
                    }else{
                        $get_info['scoreInfo'] = array( 'score' => 0, 'count' => 0);
                    }
    
                    if($interested_list){
                        foreach($interested_list as $interested){
                            if($get_info['user_uuid']===$interested){
                                $get_info['interested_checked'] = true;
                            }                        
                        }
                    }

                    array_push($result, $get_info);
                }
            }
        }
        return $result;
    }

    /**
     * 行ってみたいリストの情報更新
     *
     * @param Request $request
     * @return void
     */
    public function update_interested(Request $request) {
        $user = new User();
        $user_uuid = $request->input('uuid');
        $store_uuid = $request->input('store_uuid');
        $get_info = $user->index_interested($user_uuid);
        $interested_info = $get_info[0]->interested;

        if($interested_info) {
            $store_list = json_decode($interested_info);
            $key = array_search($store_uuid, $store_list);
            
            if($key !== false) {
                array_splice($store_list, $key, 1);
            }else{
                array_push($store_list, $store_uuid);
            }

            if(empty($store_list)){
                $json_store = null;
            }else{
                $json_store = json_encode($store_list);
            }

        }else{
            $array_store = [];
            array_push($array_store, $store_uuid);
            $json_store = json_encode($array_store);
        }

        $user->update_interested($user_uuid, $json_store);
    }

    /**
     * 行ってみたいリストの店舗情報を取得
     *
     * @param Request $request
     * @return void
     */
    public function index_interested_list(Request $request) {
        $user = new User();
        $user_uuid = $request->input('uuid');
        $get_info = $user->index_interested($user_uuid);
        $store_list = json_decode($get_info[0]->interested);
        $favorite_info = $user->index_favorite($user_uuid);
        $favorite_info && $favorite_list = json_decode($favorite_info[0]->favorite);
        $result = [];

        if($store_list){
            foreach($store_list as $store_uuid){
                $get_info = $user->get_storeInfo($store_uuid);

                if($get_info){
                    $get_info['interested_checked'] = true;
                    $get_info['thumbnail'] = Storage::exists("public/store/" . $store_uuid . "/thumbnail.jpg");
                    $review = new Review;
                    $count = 0;
                    $score_total = 0;
                    $star_list = $review->get_star($get_info['user_uuid']);

                    if(count($star_list)!==0){
                        foreach($star_list as $item) {
                            $score_total = $score_total + $item['star'];
                            $count = $count + 1;
                        }
                        $score = $score_total/$count;
                        $get_info['scoreInfo'] = array( 'score' => $score, 'count' => $count);
                    }else{
                        $get_info['scoreInfo'] = array( 'score' => 0, 'count' => 0);
                    }

                    if($favorite_list){
                        foreach($favorite_list as $favorite){
                            if($get_info['user_uuid']===$favorite){
                                $get_info['favorite_checked'] = true;
                            }
                        }
                    }
                    array_push($result, $get_info);
                }
            }
        }
        return $result;
    }

    /**
     * ユーザーアカウント削除
     *
     * @param Request $request
     * @return void
     */
    public function delete_user_account(Request $request) {
        $uuid = $request->input("uuid");
        $user = new User();
        $review = new Review();

        $user->delete_user($uuid);
        $review->delete_review_by_user_uuid($uuid);
    }

    /**
     * 店舗アカウント削除
     *
     * @param Request $request
     * @return void
     */
    public function delete_store_account(Request $request) {
        $uuid = $request->input("uuid");$user = new User();
        $store = new Store();
        $review = new Review();
        $store_menu = new StoreMenu();

        $user->delete_user($uuid);
        $store->delete_store($uuid);
        $review->delete_review_by_store_uuid($uuid);
        $store_menu->delete_menus_by_store_uuid($uuid);
    }
}