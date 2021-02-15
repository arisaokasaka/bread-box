<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\StoreMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class StoreMenuController extends Controller
{
    // パンのメニュー追加
    public function create_store_menu(Request $request){
        $store_menu = new StoreMenu();
        $store_menu->create_store_menu($request);
    }

    //取得：store_uuidが一致するメニューレコード取得
    public function index_menuInfo(Request $request){
        $store_menu = new StoreMenu();
        $get_info = $store_menu->index_menuInfo($request->input('store_uuid'));
        return $get_info;
    }

    //削除：指定するuuidのレコード削除
    public function delete_menu(Request $request){
        Log::info('controller');
        Log::info($request);
        $store_menu = new StoreMenu();
        $store_menu->delete_menu($request->input('uuid'));
    }
}