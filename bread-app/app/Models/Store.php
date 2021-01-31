<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Store extends Model
{
    use HasFactory;

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

    public function create_store($store_info){
        $this->uuid = Str::uuid();
        $this->name = $store_info['name'];
        $this->email = $store_info['email'];
        $this->password = $store_info['password'];
        $this->address = $store_info['address'];
        $this->business_day = json_encode(['123' => 123]);
        $this->save();
    }
}