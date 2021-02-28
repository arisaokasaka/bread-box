import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import ModalReviewEdit_user from '../../atoms/modal/Modal_review_edit_user';
import ScoreUser from '../../atoms/ScoreUser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

const UserTable_review: React.FC = () => {
    const [ review, setReview ] = useState([]);
    const [ offset, setOffset ] = useState(0);
    const [ sort, setSort ] = useState('default');
    const { state } = useContext(UserAuthContext);
    let review_list: any = [];
    let review_count: number = 0;
    const perPage = 10;
    
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

    const delete_review = (review_uuid, index) => {
        toggleDialogue(index);
        axios.post("/api/delete_review", {review_uuid: review_uuid})
        .then(res => {
            alert('削除しました。')
        })
        .catch(err => {
            alert('削除に失敗しました。')
        });
    }

    // 編集・削除機能のダイアログ表示
    const toggleDialogue = (index) => {
        let classInfo = document.getElementsByClassName("review_"+index)[0];
        if(classInfo.className.includes('active')){
            classInfo.classList.remove('active');
        } else {
            classInfo.className += ' active';
        }
    }

    // ページネーション
    const handlePageChange = (data) => {
        let page_number = data['selected'];
        setOffset(page_number*perPage);
    }

    // 並び替え
    const changeSorting = (sort_type) => {
        let newArray: any;
        switch (sort_type) {
            case 'star':
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
        <div className ="m-userTable-review">
            <div className="m-userTable-review__heading">
                <div className ="m-userTable-review__heading__count">
                    <p>投稿件数&nbsp;全<span>{review_count}</span>件</p>
                </div>
                
                <div className="m-userTable-review__heading__order a-sort-selection">
                    <select onChange={(e)=>changeSorting(e.target.value)}>
                        <option value="star">評価が高い順</option>
                        <option value="date_from_new">新しい順</option>
                        <option value="date_from_old">投稿順</option>
                        <option value="default">標準</option>
                    </select>
                </div>
            </div>

            {review_list
            .slice(offset, offset + perPage)
            .map((el, index)=>{
                return(
                    <div className ="m-userTable-review__item" key={"review_"+ sort +index}>
                        <div className="m-userTable-review__item__buttons">
                            <button className="m-userTable-review__item__buttons__ellipsis" onClick={()=>toggleDialogue(index)}>
                                <FontAwesomeIcon icon={faEllipsisV}/>
                            </button>
                            <div className= {"m-userTable-review__item__buttons__dialogue review_"+index}>
                                <div className="m-userTable-review__item__buttons__dialogue__overlay" onClick={()=>toggleDialogue(index)}></div>
                                <ModalReviewEdit_user
                                    review_uuid = {el.uuid}
                                    comment = {el.comment}
                                    star = {el.star}
                                    index = {index}
                                />
                                <button className="m-userTable-review__item__buttons__dialogue__btn--delete" onClick={()=>delete_review(el.uuid, index)}>
                                    削除
                                </button>
                            </div>
                        </div>
                        <div className ="m-userTable-review__item__container">
                            {el.thumbnail ? 
                            <img src={"/storage/store/"+el.store_uuid+"/thumbnail.jpg"} alt="店舗のサムネイル"/>
                            : <img src="/images/no_image.jpg" alt="店舗のサムネイル"/>}
                            <div className ="m-userTable-review__item__container__content">
                                <Link to={"/store/"+el.store_uuid}>{el.store_name}</Link>
                                <ScoreUser
                                    score={el.star}
                                />
                                {el.comment && <p>{el.comment}</p>}
                                <span>投稿日:&nbsp;{el.created_at.slice(0, 10)}</span>
                            </div>
                            {el.reply &&
                                <div className ="m-userTable-review__item__container__reply">
                                    <p>オーナーからの返信</p>
                                    <p>{el.reply}</p>
                                </div>
                            }
                        </div>

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

export default UserTable_review;