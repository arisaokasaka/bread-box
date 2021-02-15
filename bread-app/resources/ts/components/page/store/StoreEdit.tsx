import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BtnBack from '../../atoms/buttons/BtnBack';
import StoreEditTable from '../../molecules/storeEdit/StoreEditTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStore} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const StoreEdit: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const [ storeInfo, setStoreInfo ] = useState({data: []});
    const [ menuInfo, setMenuInfo ] = useState({data: []});
    let resData: any;
    let name_loggedin: any;

    useEffect(() => {
        getStoreInfo();
        getMenuInfo();
    },[]);

    // メニュー情報取得
    const getMenuInfo = () => {
        axios.post("/api/index_menuInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            setMenuInfo(res.data);
        })
        .catch(err => {
        });
    }

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            user_uuid: state.uuid
        })
        .then(res => {
            setStoreInfo(res.data);
        })
        .catch(err => {
        });
    }

    //店舗情報を取得後、名前のHTML要素作成
    if(storeInfo){
        resData = storeInfo;
        name_loggedin = (
            <span>{resData.name}様</span>
        );
    }

    return(
        <div className = "p-store-edit">
            <div className = "p-store-edit__container">
                {/* <div className = "p-store-edit__container__btn">
                    <BtnBack
                        URL = '/store'
                    />
                </div> */}
                <div className = "p-store-edit__container__title">
                    <h2><FontAwesomeIcon icon={faStore}/>店舗管理</h2>
                    {name_loggedin}
                </div>
                <div className = "p-store-edit__container__table">
                    <StoreEditTable
                        MenuInfo = {menuInfo}
                        StoreInfo = {storeInfo}
                    />
                </div>
            </div>
        </div>
    );
}

export default StoreEdit;