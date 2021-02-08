<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreRequest;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function index_store() {
       
        Log::info(Auth::user());
        $info = new Store();
        return $info->all_stores();
    }

    public function search_store() {
        $info = new Store();
        return $info->find_keyword('');
    }

    public function create_store(StoreRequest $request){
        $store = new Store();
        $store->create_store($request);
    }
}