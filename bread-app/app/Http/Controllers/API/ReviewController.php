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
        $review = new Review;
        $store_uuid = $request->input('store_uuid');
        return $review->index_review($store_uuid);
    }

    /**
     * 星のスコアをカウント
     *
     * @param Request $request
     * @return $scoreInfo
     */
    public function get_score(Request $request) {
        $score_total = 0;
        $count = 0;
        $review = new Review;
        $store_uuid = $request->input('store_uuid');
        $star_list = $review->get_star($store_uuid);
        
        if(count($star_list)!==0){
            foreach($star_list as $item) {
                $score_total = $score_total + $item['star'];
                $count = $count + 1;
            }
            $score = $score_total/$count;
            $scoreInfo['score'] = $score;
            $scoreInfo['count'] = $count;
        }else{
            $scoreInfo['score'] = 0;
            $scoreInfo['count'] = 0;
        }

        return $scoreInfo;
    }
}
