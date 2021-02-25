import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Score from '../atoms/Score';

type ReviewProps = ({
    store_uuid: string
})

const ReviewList: React.FC<ReviewProps> = ({store_uuid}) => {
    const [ review, setReview ] = useState([]);
    let review_list: any = [];
    let review_count: number = 0;

    useEffect(()=>{
        getReviewInfo();
    },[])

    if(review){
        review_list = review;
        review_count = review_list.length;
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
        <div className ="m-review-list">
            <h4>{review_count}件</h4>
            {review_list.map((el)=>{
                return(
                    <div className ="m-review-list__item" key={el.uuid}>
                        <img src="/images/croissant.jpg" alt="投稿者のアイコン"/>
                        <div className ="m-review-list__item__content">
                            <Score
                                score= {el.star}
                                store_uuid = {el.store_uuid}
                            />
                            <p>{el.comment}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewList;