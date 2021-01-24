<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function index_store() {
        $info = new Store();
        return $info->all_stores();
    }

    public function search_store() {
        $info = new Store();
        return $info->find_keyword('');
    }
}