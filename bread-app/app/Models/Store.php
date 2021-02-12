<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Log;

class Store extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

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
Log::info($store_info);
        // $this->$businessDay_array = [
        //     'monday'=>[$store_info['monday_open'], $store_info['monday_close']], 
        //     'tuesday'=>[$store_info['tuesday_open'], $store_info['tuesday_close']], 
        //     'wednesday'=>[$store_info['wednesday_open'], $store_info['wednesday_close']], 
        //     'thursday'=>[$store_info['thursday_open'], $store_info['thursday_close']], 
        //     'friday'=>[$store_info['friday_open'], $store_info['friday_close']], 
        //     'saturday'=>[$store_info['saturday_open'], $store_info['saturday_close']], 
        //     'sunday'=>[$store_info['sunday_open'], $store_info['sunday_close']], 
        // ];
        
        // $this->$sns_array = [
        //     'twitter'=>$store_info['twitter'],
        //     'instagram'=>$store_info['instagram'],
        //     'facebook'=>$store_info['facebook'],
        //     'other'=>$store_info['other']
        // ];

        $this->uuid = Str::uuid();
        $this->name = $store_info['name'];
        $this->email = $store_info['email'];
        $this->tel = $store_info['tel'];
        $this->password = bcrypt($store_info['password']);
        $this->address = $store_info['address'];
        // $this->business_day = $store_info['business_day'];
        $this->business_memo = json_encode(['123' => 123]); //←stringに変更したい
        // $this->message = $store_info['message'];
        // $this->url = $store_info['url'];
        // $this->sns = json_encode($sns_array);
        $this->save();
    }
}