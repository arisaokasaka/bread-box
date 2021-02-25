<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
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
        return $user->index_user($user_uuid);
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
        $result = [];

        if($store_list){
            foreach($store_list as $store_uuid){
                $get_info = $user->get_storeInfo($store_uuid);
                $get_info['favorite_checked'] = true;
                array_push($result, $get_info);
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
        $result = [];

        if($store_list){
            foreach($store_list as $store_uuid){
                $get_info = $user->get_storeInfo($store_uuid);
                $get_info['interested_checked'] = true;
                array_push($result, $get_info);
            }
        }
        return $result;
    }
}
