<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\User;
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
     * レビュー情報取得(store_uuidより)
     *
     * @param Request $request
     * @return void
     */
    public function index_review(Request $request) {
        $review = new Review;
        $user = new User;
        $store_uuid = $request->input('store_uuid');
        $review_list = $review->index_review($store_uuid);
        
        foreach($review_list as $review_item){
            $user_uuid = $review_item['user_uuid'];
            $user_name =  $user->get_name($user_uuid);
            $review_item['image_profile'] = Storage::exists("public/user/" . $user_uuid . "/profile.jpg");
            $review_item['user_name'] = $user_name[0]->name;
        }
        return $review_list;
    }

    /**
     * レビュー情報取得(user_uuidより)
     *
     * @param Request $request
     * @return void
     */
    public function index_review_by_user(Request $request) {
        $review = new Review;
        $user = new User;
        $user_uuid = $request->input('user_uuid');
        $review_list = $review->index_review_by_user($user_uuid);
        
        foreach($review_list as $review_item){
            $store_uuid = $review_item['store_uuid'];
            $store_name =  $user->get_name($store_uuid);
            $review_item['thumbnail'] = Storage::exists("public/store/" . $store_uuid . "/thumbnail.jpg");
            $review_item['store_name'] = $store_name[0]->name;
        }
        return $review_list;
    }

    /**
     * レビューレコード削除
     *
     * @param Request $request
     * @return void
     */
    public function delete_review(Request $request) {
        $review = new Review;
        $review_uuid = $request->input('review_uuid');
        $review->delete_review($review_uuid);
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

    /**
     * 返信を削除
     *
     * @param Request $request
     * @return void
     */
    public function delete_reply(Request $request) {
        $review = new Review;
        $review_uuid = $request['review_uuid'];
        $review->delete_reply($review_uuid);
    }
}
