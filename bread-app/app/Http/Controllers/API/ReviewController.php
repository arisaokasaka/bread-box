<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    /**
     * レビュー新規作成
     *
     * @param Request $request
     * @return void
     */
    public function create_review(Request $request){
        $review = new Review();
        $review->create_review($request);
    }

    /**
     * レビュー情報取得
     *
     * @param string $store_uuid
     * @return void
     */
    public function index_review(Request $request) {
        Log::info($request);
        $review = new Review;
        $store_uuid = $request->input('store_uuid');
        Log::info($review->index_review($store_uuid));
        return $review->index_review($store_uuid);
    }
}
