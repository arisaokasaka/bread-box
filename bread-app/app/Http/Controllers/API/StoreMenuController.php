<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\StoreMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StoreMenuController extends Controller
{
    // パンのメニュー追加
    public function create_store_menu(Request $request){
        $store = new StoreMenu();
        $store->create_store_menu($request);
    }
}