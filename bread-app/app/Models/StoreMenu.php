<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class StoreMenu extends Model
{
    use HasFactory;

    // パンのメニューのレコード作成
    public function create_store_menu($menu_info){
        $this->uuid = Str::uuid();
        $this->store_uuid = $menu_info['store_uuid'];
        $this->menu_type = $menu_info['menu_type'];
        $this->bread_name = $menu_info['bread_name'];
        $this->bread_kind = $menu_info['bread_kind'];
        $this->bread_price = $menu_info['bread_price'];
        $this->bread_detail = $menu_info['bread_detail'];
        $this->save();
    }
}
