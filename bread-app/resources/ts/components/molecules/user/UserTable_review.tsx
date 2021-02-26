import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ScoreUser from '../../atoms/ScoreUser';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const UserTable_review: React.FC = () => {
    const [ review, setReview ] = useState([]);
    const { state } = useContext(UserAuthContext);
    let review_list: any = [];
    let review_count: number = 0;
    
    useEffect(()=>{
        getUserReview();
    },[])

    if(review){
        review_list = review;
        review_count = review_list.length;
    }

    const getUserReview = () => {
        axios.post("/api/index_review_by_user", {user_uuid: state.uuid})
        .then(res => {
            setReview(res.data)
        })
        .catch(err => {
        });
    }

    return (
        <div className ="m-userTable-review">
            <div className ="m-userTable-review__count">
                <p>投稿した口コミ&nbsp;&nbsp;全<span>{review_count}</span>件</p>
            </div>
            {review_list.map((el, index)=>{
                return(
                    <div className ="m-userTable-review__item" key={"review_"+index}>
                        {el.thumbnail ? 
                        <img src={"/storage/store/"+el.store_uuid+"/thumbnail.jpg"} alt="店舗のサムネイル"/>
                        : <img src="/images/no_image.jpg" alt="店舗のサムネイル"/>}
                        <div className ="m-userTable-review__item__content">
                            <Link to={"/store/"+el.store_uuid}>{el.store_name}</Link>
                            <ScoreUser
                                score={el.star}
                            />
                            {el.comment && <p>{el.comment}</p>}
                            <span>投稿日:&nbsp;{el.created_at.slice(0, 10)}</span>
                        </div>
                        {el.reply &&
                            <div className ="m-userTable-review__item__reply">
                                <p>オーナーからの返信</p>
                                <p>{el.reply}</p>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default UserTable_review;