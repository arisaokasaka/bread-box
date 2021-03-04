import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ScoreUser from '../../atoms/ScoreUser';
import ModalCreateReview from '../modal/Modal_create_review';
import ModalReviewReply from '../../molecules/modal/Modal_review_reply';
import ModalReviewReplyEdit from '../../molecules/modal/Modal_review_reply_edit';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import ReactPaginate from 'react-paginate';

type ReviewProps = ({
    store_uuid: string
})

const StoreReview: React.FC<ReviewProps> = ({store_uuid}) => {
    const [ review, setReview ] = useState([]);
    const [ offset, setOffset ] = useState(0);
    const [ sort, setSort ] = useState('default');
    const { state } = useContext(UserAuthContext);
    let review_list: any = [];
    let review_count: number = 0;
    let message_no_review: any = null;
    const perPage = 10;

    const handlePageChange = (data) => {
        let page_number = data['selected'];
        setOffset(page_number*perPage);
    }

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

    // 並び替え
    const changeSorting = (sort_type) => {
        let newArray: any;
        switch (sort_type) {
            case 'star_from_high':
                newArray = review.sort((el1, el2) => {
                    if (el1['star'] < el2['star']) {
                        return 1;
                    }
                    if (el1['star'] > el2['star']) {
                        return -1;
                    }
                    return 0;
                });
            break;
            case 'star_from_low':
                newArray = review.sort((el1, el2) => {
                    if (el1['star'] < el2['star']) {
                        return 1;
                    }
                    if (el1['star'] > el2['star']) {
                        return -1;
                    }
                    return 0;
                });
            break;
            case 'date_from_new':
                newArray = review.sort((el1, el2) => {
                    if (el1['created_at'] < el2['created_at']) {
                        return 1;
                    }
                    if (el1['created_at'] > el2['created_at']) {
                        return -1;
                    }
                    return 0;
                })
            break;
            case 'date_from_old':
                newArray = review.sort((el1, el2) => {
                    if (el1['created_at'] > el2['created_at']) {
                        return 1;
                    }
                    if (el1['created_at'] < el2['created_at']) {
                        return -1;
                    }
                    return 0;
                })
            break;
            case 'default':
                newArray = review.sort((el1, el2) => {
                    if (el1['uuid'] < el2['uuid']) {
                        return 1;
                    }
                    if (el1['uuid'] > el2['uuid']) {
                        return -1;
                    }
                    return 0;
                })
            break;
        }
        setSort(sort_type);
        setReview(newArray);
    }

    return (
        <div className ="m-review">
            <div className ="m-review__heading">
                <div className ="m-review__heading__former">
                    <p>全<span>{review_count}</span>件</p>
                    <div className="m-review__heading__former__order a-sort-selection">
                        <select onChange={(e)=>changeSorting(e.target.value)}>
                            <option value="default">標準</option>
                            <option value="star_from_high">評価が高い順</option>
                            <option value="star_from_low">評価が低い順</option>
                            <option value="date_from_old">投稿順</option>
                            <option value="date_from_new">新しい順</option>
                        </select>
                    </div>
                </div>
                <ModalCreateReview
                    store_uuid={store_uuid}
                    update_function={getReviewInfo}
                />
            </div>
            {message_no_review}
            {review_list
            .slice(offset, offset + perPage)
            .map((el, index)=>{
                return(
                    <div className ="m-review__item" key={"review_" + sort + index}>
                        {el.image_profile ? 
                        <img src={"/storage/user/"+el.user_uuid+"/profile.jpg"} alt="投稿者のアイコン"/>
                        : <img src="/images/no_image_user.png" alt="投稿者のアイコン"/>}
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
                                            update_function={getReviewInfo}
                                        />
                                        <button className="a-btn-delete-reply" onClick={()=>delete_review_reply(el.uuid)}>削除する</button>
                                    </div>
                                }
                            </div>
                        : state.uuid===el.store_uuid && 
                            <div className="m-review__item__btn">
                                <ModalReviewReply
                                    review_uuid={el.uuid}
                                    update_function={getReviewInfo}
                                />
                            </div>
                        }
                    </div>
                )
            })}
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={Math.ceil(review_list.length/perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                onPageChange={handlePageChange}
                containerClassName={'a-pagination'}
                activeClassName={'active'}
                previousClassName={'a-pagination__previous'}
                nextClassName={'a-pagination__next'}
                disabledClassName={'a-pagination__disabled'}
            />
        </div>
    )
}

export default StoreReview;