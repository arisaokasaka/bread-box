<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class Store extends Model
{
    use HasFactory;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    public function all_stores() {
        return $this->newQuery()->select("*")->get();
    }

    public function find_keyword($keyword){
        return $this
        ->newQuery()
        ->join('store_menus', 'stores.uuid', '=', 'store_menus.stores_uuid')
        ->select(['stores.uuid AS stores_uuid', 'stores.name AS stores_name'])
        ->where('stores.name', 'like', '%' . $keyword. '%')
        ->orWhere('stores.message', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.bread_name', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.bread_kind', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.bread_detail', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.advantage', 'like', '%' .$keyword. '%')
        ->orWhere('store_menus.spirit', 'like', '%' .$keyword. '%')
        ->get();
    }

    public function create_store($store_user_uuid){
        $this->uuid = Str::uuid();
        $this->user_uuid = $store_user_uuid;
        $this->save();
    }
}

// $this->tel = $store_info['tel'];
// $this->business_day = $store_info['business_day'];
// $this->business_memo = json_encode(['123' => 123]); //←stringに変更したい
// $this->message = $store_info['message'];
// $this->url = $store_info['url'];
// $this->sns = json_encode($sns_array);