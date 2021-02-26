import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ScoreUser from '../../atoms/ScoreUser';
import ModalCreateReview from '../../atoms/modal/Modal_review';
import ModalReviewReply from '../../atoms/modal/Modal_review_reply';
import ModalReviewReplyEdit from '../../atoms/modal/Modal_review_reply_edit';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type ReviewProps = ({
    store_uuid: string
})

const StoreReview: React.FC<ReviewProps> = ({store_uuid}) => {
    const [ review, setReview ] = useState([]);
    const { state } = useContext(UserAuthContext);
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

    // 返信を削除
    const delete_review_reply = (review_uuid) => {
        if (window.confirm('返信を削除します。よろしいですか？')) {
            axios.post("/api/delete_reply", {review_uuid: review_uuid})
            .then(res => {
                alert('返信を削除しました。')
            })
            .catch(err => {
                alert('削除に失敗しました。')
            })
        }
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
                        {el.image_profile ? 
                        <img src={"/storage/user/"+el.user_uuid+"/profile.jpg"} alt="投稿者のアイコン"/>
                        : <img src="/images/no_image_user.jpg" alt="投稿者のアイコン"/>}
                        <div className ="m-review__item__content">
                            <ScoreUser
                                score={el.star}
                            />
                            {el.comment && <p>{el.comment}</p>}
                            <span>投稿者:&nbsp;{el.user_name}</span>
                            <span>&nbsp;/&nbsp;</span>
                            <span>投稿日:&nbsp;{el.created_at.slice(0, 10)}</span>
                        </div>
                        {el.reply ?
                            <div className ="m-review__item__reply">
                                <p>オーナーからの返信</p>
                                <p>{el.reply}</p>
                                {state.uuid===el.store_uuid &&
                                    <div className="m-review__item__reply__btn--edit">
                                        <ModalReviewReplyEdit
                                            review_uuid={el.uuid}
                                            reply={el.reply}
                                        />
                                        <button className="a-btn-delete-reply" onClick={()=>delete_review_reply(el.uuid)}>削除する</button>
                                    </div>
                                }
                            </div>
                        : state.uuid===el.store_uuid && 
                            <div className="m-review__item__btn">
                                <ModalReviewReply
                                    review_uuid={el.uuid}
                                />
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default StoreReview;