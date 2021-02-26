<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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
        $review_list = $review->index_review($store_uuid);
        
        foreach($review_list as $review_item){
            $user_uuid = $review_item['user_uuid'];
            $review_item['image_profile'] = Storage::exists("public/user/" . $user_uuid . "/profile.jpg");
        }
        
        return $review_list;
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

    /**
     * 返信を登録
     *
     * @param Request $request
     * @return void
     */
    public function register_reply(Request $request) {
        $review = new Review;
        $review->register_reply($request);
    }
}
