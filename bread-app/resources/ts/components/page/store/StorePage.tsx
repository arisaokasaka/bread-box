import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import StoreSubInfo from '../../molecules/store/StoreSubinfo';
import StoreContents from '../../molecules/store/StoreContents';
import { useParams, useLocation } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const StorePage: React.FC = () => {
    let { user_uuid } = useParams();
    const { state } = useContext(UserAuthContext);
    const [ storeInfo, setStoreInfo ] = useState({})
    const [ menuInfo, setMenuInfo ] = useState([]);

    useEffect(() => {
        getStoreInfo();
        getMenuInfo();
    },[]);

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: user_uuid,
            user_uuid: state.uuid,
            user_type: state.auth
        })
        .then(res => {
            console.log(res.data)
            setStoreInfo(res.data)
        })
        .catch(err => {
        });
    }

    // メニュー情報取得
    const getMenuInfo = () => {
        axios.post("/api/index_menuInfo", {
            store_uuid: user_uuid
        })
        .then(res => {
            setMenuInfo(res.data)
        })
        .catch(err => {
        });
    }

    return (
        <div className = "p-store">
            <div className = "p-store__container">
                <div className = "p-store__container__img">
                    <img
                        src={"/storage/store/" + user_uuid + "/header.jpg"}
                        alt="トップ画像"
                    />
                </div>
                    <div className = "p-store__container__content">
                        <div className = "p-store__container__content__main">
                            <StoreBasicInfo
                                storeInfo = {storeInfo}
                            />
                            <StoreContents
                                menuInfo = {menuInfo}
                            />
                        </div> 
                        <StoreSubInfo
                            storeInfo = {storeInfo}
                        />
                    </div>
            </div>
        </div>
    )
}

export default StorePage;