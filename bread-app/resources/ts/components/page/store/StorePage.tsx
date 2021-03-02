import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import StoreSidebar from '../../molecules/store/StoreSidebar';
import StoreContents from '../../molecules/store/StoreContents';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const StorePage: React.FC = () => {
    let { user_uuid } = useParams();
    const { state } = useContext(UserAuthContext);
    const [ storeInfo, setStoreInfo ] = useState({});
    const [ menuInfo, setMenuInfo ] = useState([]);
    const [ scoreInfo, setScoreInfo ] = useState([]);

    useEffect(() => {
        getStoreInfo();
        getMenuInfo();
        getScore();
    },[]);

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: user_uuid,
            user_uuid: state.uuid,
            user_type: state.auth
        })
        .then(res => {
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
    
    const getScore = () => {
        axios.post("/api/get_score", {
            store_uuid: user_uuid
        })
        .then(res => {
            setScoreInfo(res.data)
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
                            scoreInfo = {scoreInfo}
                        />
                        <StoreContents
                            menuInfo = {menuInfo}
                            store_uuid = {user_uuid}
                        />
                    </div> 
                    <StoreSidebar
                        storeInfo = {storeInfo}
                        scoreInfo = {scoreInfo}
                    />
                </div>
            </div>
        </div>
    )
}

export default StorePage;