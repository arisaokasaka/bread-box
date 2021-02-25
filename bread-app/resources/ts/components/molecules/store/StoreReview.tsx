import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreUser from '../../atoms/ScoreUser';
import ModalCreateReview from '../../atoms/modal/Modal_review';

type ReviewProps = ({
    store_uuid: string
})

const StoreReview: React.FC<ReviewProps> = ({store_uuid}) => {
    const [ review, setReview ] = useState([]);
    let review_list: any = [];
    let review_count: number = 0;
    let message_no_review: any = null;

    useEffect(()=>{
        getReviewInfo();
    },[])

    if(review){
        review_list = review;
        review_count = review_list.length;
    }

    if(review_count===0){
        message_no_review = <p>まだレビューがありません。</p>
    }
    
    const getReviewInfo = () => {
        axios.post("/api/index_review", {store_uuid: store_uuid})
        .then(res => {
            setReview(res.data)
        })
        .catch(err => {
        });
    }

    return (
        <div className ="m-review">
            <div className="m-review__btn">
                <ModalCreateReview
                    store_uuid={store_uuid}
                />
            </div>
            <div className ="m-review__count">
                <p>全<span>{review_count}</span>件</p>
            </div>
            {message_no_review}
            {review_list.map((el, index)=>{
                return(
                    <div className ="m-review__item" key={"review_"+index}>
                        <img src="/images/croissant.jpg" alt="投稿者のアイコン"/>
                        <div className ="m-review__item__content">
                            <ScoreUser
                                score={el.star}
                            />
                            <p>{el.comment}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default StoreReview;