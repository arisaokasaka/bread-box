import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import ReviewList from '../../molecules/ReviewList';
import ModalCreateReview from '../../atoms/modal/Modal_review';
import Store_Pickup from '../../molecules/Store_pickup';
import StoreSubInfo from '../../molecules/store/StoreSubinfo';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const Review : React.FC = () => {
    let { store_uuid } = useParams();
    const { state } = useContext(UserAuthContext);
    const [ storeInfo, setStoreInfo ] = useState({})

    useEffect(() => {
        getStoreInfo();
    },[]);

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: store_uuid,
            user_uuid: state.uuid,
            user_type: state.auth
        })
        .then(res => {
            setStoreInfo(res.data)
        })
        .catch(err => {
        });
    }

    return(
        <div className = "p-review">
            <div className = "p-review__container">
                <main>
                    <div className = "p-review__container__info">
                        <StoreBasicInfo
                            storeInfo = {storeInfo}
                        />
                    </div>
                    <ModalCreateReview
                        store_uuid={store_uuid}
                    />
                    <div className = "p-review__container__table">
                        <ReviewList
                            store_uuid={store_uuid}
                        />
                    </div>
                </main>
                <aside>
                    <Store_Pickup />
                </aside>
            </div>
        </div>
    );
}

export default Review;