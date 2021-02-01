import React from 'react';
import Score from '../atoms/Score';

type ReviewProps = ({
    ReviewInfo: Array<any>;
});

const ReviewList: React.FC<ReviewProps> = ({ReviewInfo}) => (
    <div className ="m-review-list">
        {ReviewInfo.map((el)=>{
            return(
                <div className ="m-review-list__item" key={el.uuid}>
                    <img src="" alt="投稿者のアイコン"/>
                    <div className ="m-review-list__item__content">
                        <Score ScoreStar = {el.star}/>
                        <p>{el.comment}</p>
                    </div>
                </div>
            );
        })}
    </div>
);

export default ReviewList;