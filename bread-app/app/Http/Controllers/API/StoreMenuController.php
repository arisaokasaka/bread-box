<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\StoreMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class StoreMenuController extends Controller
{
    /**
     * 【作成】パンのメニュー作成
     *
     * @param Request $request
     * @return void
     */
    public function create_store_menu(Request $request){
        // メニュー番号を作成
        $menu_count = (new StoreMenu())->newQuery()->select('*')
        ->where('store_uuid', $request->input('store_uuid'))
        ->where('menu_type', 1)
        ->count();
        if($menu_count === 0) {
            $bread_number = 1;
        }else{
            $bread_number = $menu_count + 1;
        }

        // 画像ファイルをStorageに保存
        $store_uuid = $request->input('store_uuid');
        $path = '/public/store/' . $store_uuid . '/menu';
        $file = $request->file('bread_img');
        $fileExtension = $file->getClientOriginalExtension();
        $fileName = 'item_' . $bread_number . '.' . $fileExtension;
        Storage::putFileAs($path, $file, $fileName, 'public');

        // テキストデータをDBに保存
        $store_menu = new StoreMenu();
        $store_menu->create_store_menu($request, $bread_number);
    }

    /**
     * 【取得】store_uuidが一致するメニューレコード取得
     * 
     * @param Request $request
     * @return $get_info
     */
    public function index_menuInfo(Request $request){
        $store_menu = new StoreMenu();
        $get_info = $store_menu->index_menuInfo($request->input('store_uuid'));
        return $get_info;
    }

    /**
     * 【削除】指定するuuidのレコード削除
     *
     * @param Request $request
     * @return void
     */
    public function delete_menu(Request $request){
        Log::info('controller');
        Log::info($request);
        $store_menu = new StoreMenu();
        $store_menu->delete_menu($request->input('uuid'));
    }
}