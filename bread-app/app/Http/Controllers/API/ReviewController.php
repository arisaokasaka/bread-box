<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

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
}
