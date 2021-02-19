<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class StoreMenu extends Model
{
    use HasFactory;

    /**
     * 【作成】パンのメニューのレコード作成
     *
     * @param array $menu_info
     * @param int $bread_number
     * @return void
     */
    public function create_store_menu(array $menu_info, int $bread_number){
        $this->uuid = Str::uuid();
        $this->store_uuid = $menu_info['store_uuid'];
        $this->menu_type = $menu_info['menu_type'];
        $this->bread_name = $menu_info['bread_name'];
        $this->bread_kind = $menu_info['bread_kind'];
        $this->bread_price = $menu_info['bread_price'];
        $this->bread_detail = $menu_info['bread_detail'];
        $this->bread_order = $bread_number;
        $this->save();
    }

    /**
     * 【作成】こだわり(advantage), 思い(spirit)のレコード作成
     *
     * @param array $menu_info
     * @return void
     */
    public function create_spirit(object $menu_info){
        $this->uuid = Str::uuid();
        $this->store_uuid = $menu_info['store_uuid'];
        $this->menu_type = $menu_info['menu_type'];
        $this->advantage = $menu_info['advantage'];
        $this->spirit = $menu_info['spirit'];
        $this->save();
    }

    // 取得：指定するstore_uuidを持つレコード情報を取得
    public function index_menuInfo($request){
        return $this
        ->newQuery()
        ->where('store_uuid', '=', $request)
        ->select("*")
        ->get();
    }

    //削除：指定するuuidのレコード削除
    public function delete_menu($request){
        return $this
        ->newQuery()
        ->where('uuid', '=', $request)
        ->delete();
    }

    /**
     * 【更新】パンのメニュー
     *
     * @param $request
     * @return void
     */
    public function update_menu_type_1($request){
        return $this
        ->where('store_uuid', '=', $request['store_uuid'])
        ->update([
            'bread_name' => $request['bread_name'],
            'bread_kind' => $request['bread_kind'],
            'bread_detail' => $request['bread_detail'],
            'bread_price' => $request['bread_price'],
        ]);
    }
}
