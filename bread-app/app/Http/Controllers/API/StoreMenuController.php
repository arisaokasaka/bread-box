<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\StoreMenu;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StoreMenuController extends Controller
{
    const NOMAL_MENU = 1;

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
        $fileSave = $request->file('bread_img');
        if($fileSave) {
            $path = '/public/store/' . $store_uuid . '/menu';
            $fileName = 'item_' . $bread_number . '.jpg';
            Storage::putFileAs($path, $fileSave, $fileName, 'public');
        }
        
        // テキストデータをDBに保存
        $store_menu = new StoreMenu();
        $store_menu->create_store_menu($request, $bread_number);
    }

    /**
     * 【作成】こだわり(menu_type2, advantage), 思い(menu_type3, spirit)作成
     *
     * @param Request $request
     * @return void
     */
    public function create_spirit(Request $request){
        // テキストデータをDBに保存
        $store_menu = new StoreMenu();
        $store_menu->create_spirit($request);

        // 画像をstorageに保存
        $menu_type = $request->input('menu_type');
        if($menu_type != null || undefined){
            $store_uuid = $request->input('store_uuid');
            $path = '/public/store/' . $store_uuid . '/menu';
            $fileSave = $request->file('img_spirit');

            if($fileSave){
                switch($menu_type){
                    case 2:
                        $fileName = 'advantage.jpg';
                        Storage::putFileAs($path, $fileSave, $fileName, 'public');
                    break;
                    case 3:
                        $fileName = 'spirit.jpg';
                        Storage::putFileAs($path, $fileSave, $fileName, 'public');
                    break;
                }
            }
        }
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
        foreach($get_info as $menu){
            $menu['image_menu'] = Storage::exists("/public/store/" . $menu->store_uuid . "/menu/item_" . $menu->bread_order . ".jpg");
            $menu['image_advantage'] = Storage::exists("/public/store/" . $menu->store_uuid . "/menu/advantage.jpg");
            $menu['image_spirit'] = Storage::exists("/public/store/" . $menu->store_uuid . "/menu/spirit.jpg");
        }
        return $get_info;
    }

    /**
     * 【削除】指定するuuidのレコード削除
     *
     * @param Request $request
     * @return void
     */
    public function delete_menu(Request $request){
        $store_menu = new StoreMenu();
        $store_uuid = $request->input('store_uuid');
        $bread_order = $request->input('bread_order');

        // Storageの画像削除
        if(Storage::exists("/public/store/" . $store_uuid . '/menu/item_' . $bread_order . '.jpg')){
            $deleteFile = "/public/store/" . $store_uuid . '/menu/item_' . $bread_order . '.jpg';
            Storage::delete($deleteFile);
        }
        
        // bread_order更新
        $select_info = $store_menu->newQuery()
        ->select('uuid', 'bread_order')
        ->where('bread_order', '>', (int)($bread_order))
        ->where('store_uuid', '=',  $store_uuid)
        ->where('menu_type', '=', self::NOMAL_MENU)
        ->get();

        if($select_info != null){
            foreach($select_info as $bread_menu) {
                $bread_order_update = $bread_menu->bread_order-1;
                $image_original = '/public/store/' . $store_uuid . '/menu/item_' . $bread_menu->bread_order . '.jpg';
                $image_update = '/public/store/' . $store_uuid . '/menu/item_' . $bread_order_update . '.jpg';
                StoreMenu::where('uuid', $bread_menu->uuid)->update(['bread_order' => $bread_order_update]);
                if(Storage::exists($image_original)){
                    Storage::move($image_original, $image_update);
                }
            }
        }

        // 指定のメニューレコード削除
        $store_menu->delete_menu($request->input('uuid'));      
    }

    /**
     * 【更新】パンのメニュー更新(画像含む)
     *
     * @param $request
     * @return void
     */
    public function update_menu_type_1(Request $request){
        $image = $request->file('bread_img');
        if($image != null){
            $bread_number = $request->input('bread_order');
            $store_uuid = $request->input('store_uuid');
            $path = '/public/store/' . $store_uuid . '/menu';
            $fileName = 'item_' . $bread_number . '.jpg';
            Storage::putFileAs($path, $image, $fileName, 'public');
        }
        $store_menu = new StoreMenu();
        $store_menu->update_menu_type_1($request);
    }

    /**
     * 【更新】こだわり(advantage), 思い(spirit)のレコード更新
     *
     * @param Request $request
     * @return void
     */
    public function update_spirit(Request $request){
        // テキストデータ更新
        $store_menu = new StoreMenu();
        $store_menu->update_spirit($request);

        // 画像をstorageに保存
        $image = $request->file('img_spirit');
        if($image != null){
            $menu_type = $request->input('menu_type');
            $store_uuid = $request->input('store_uuid');
            $path = '/public/store/' . $store_uuid . '/menu';
            $fileSave = $request->file('img_spirit');
            switch($menu_type){
                case 2:
                    $fileName = 'advantage.jpg';
                    Storage::putFileAs($path, $fileSave, $fileName, 'public');
                break;
                case 3:
                    $fileName = 'spirit.jpg';
                    Storage::putFileAs($path, $fileSave, $fileName, 'public');
                break;
            }
        }   
    }
}