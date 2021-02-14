import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BtnBack from '../../atoms/buttons/BtnBack';
import StoreEditTable from '../../molecules/storeEdit/StoreEditTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStore} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

let testMenuInfo = [
    {
        id: 45,
        menu_type: 1,
        bread_name: 'ほんじこみ',
        bread_kind: '食パン',
        bread_price: 300,
        bread_detail: 'ここでしか味わえないキメ細かな“口どけの良さ”を実現するための厳選小麦粉、豊かな風味を引き出すための国産バター、そして岩手県「のだ塩」をはじめ、材料１つ１つにこだわり、魂を込めた贅沢な食パン。'
    },
    {
        id: 6,
        menu_type: 1,
        bread_name: 'ぐっどぱん',
        bread_kind: 'クロワッサン',
        bread_price: 300,
        bread_detail: 'ここでしか味わえないキメ細かな“口どけの良さ”を実現するための厳選小麦粉、豊かな風味を引き出すための国産バター、そして岩手県「のだ塩」をはじめ、材料１つ１つにこだわり、魂を込めた贅沢な食パン。'
    },
    {
        menu_type: 2,
        advantage: 'だって私がつくったぱんは全部おいしいんだもん！！！！',
        spirit: 'おじいちゃんが作ってくれたパンが美味しすぎてパン屋になりました！！！'
    }
]

let testStoreInfo = [
    {
        uuid: 23456789,
        name: 'sarasapan',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'}
    }
]

const StoreEdit:any = () => {
    const { state, dispatch } = useContext(UserAuthContext);
    const [ storeInfo, setStoreInfo ] = useState({data: []});

    let MenuInfo: any;
    useEffect(() => {
        console.log('effect')
        getStoreInfo();
    },[]);

    // 店舗情報取得
    const getStoreInfo = () => {
        let formData = new FormData()
        formData.append('user_uuid', state.uuid)
        axios.post("/api/index_storeInfo", {
            user_uuid: state.uuid
        })
        .then(res => {
            setStoreInfo(res.data);
        })
        .catch(err => {
        });
    }
    MenuInfo = testMenuInfo;

    return(
        <div className = "p-store-edit">
            <div className = "p-store-edit__container">
                {/* <div className = "p-store-edit__container__btn">
                    <BtnBack
                        URL = '/store'
                    />
                </div> */}
                <div className = "p-store-edit__container__title">
                    <h2 onClick = {()=>console.log(storeInfo)}><FontAwesomeIcon icon={faStore}/>店舗管理</h2>
                    {/* {StoreInfo.map((el) => <span>{el.name+"様"}</span>)} */}
                </div>
                <div className = "p-store-edit__container__table">
                    <StoreEditTable
                        MenuInfo = {MenuInfo}
                        StoreInfo = {storeInfo}
                    />
                </div>
            </div>
        </div>
    );
}

export default StoreEdit;