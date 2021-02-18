import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MenuCreate from './storeEditMenu/MenuCreate';
import MenuList from './storeEditMenu/MenuList';
import EditBusinessDays from './storeEditBasic/EditBusinessDays';
import EditBusinessMemo from './storeEditBasic/EditBusinessMemo';
import EditHomepage from './storeEditBasic/EditHomepage';
import EditSNS from './storeEditBasic/EditSNS';
import StoreEditTable_spirit from './storeEditSpirit/StoreEditTable_spirit';
import StoreEditTable_advantage from './storeEditSpirit/StoreEditTable_advantage';
import EditBasicInfo from './storeEditBasic/EditBasicInfo';
import { StoreEditNav_menu, StoreEditNav_basic, StoreEditNav_spirit, StoreEditNav_stamp } from '../../../info/StoreEditMenus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import BtnLogout from '../../atoms/buttons/BtnLogout';
import { StoreInfoContext } from '../../../contexts/StoreInfoContext';
import { UserAuthContext } from '../../../contexts/UserAuthContext';


const StoreEditTable: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const { dispatch } = useContext(StoreInfoContext);
    const [ Table, setTable ] = useState('basicInfo');

    useEffect(() => {
        getStoreInfo();
        getMenuInfo();
    },[]);

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            user_uuid: state.uuid
        })
        .then(res => {
            console.log('storeinfo')
            dispatch({
                type: 'inputStoreInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    // メニュー情報取得
    const getMenuInfo = () => {
        axios.post("/api/index_menuInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            dispatch({
                type: 'inputMenuInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    //サイドメニューのタブ一覧
    const Tab = (tab) => {
        let TabClassName = tab.category + "_" + tab.tableName;
        if(Table === tab.tableName){
            TabClassName += ' selected';
        }
        return (
            <span 
                className={TabClassName} 
                key = {TabClassName}
                onClick = {() => setTable(tab.tableName)}
            >
                <a>{tab.label}</a>
                <a><FontAwesomeIcon icon={faChevronRight} /></a>
            </span>
        );
    }

    const CurrentTable = (table) => {
        switch(table){
            case 'basicInfo':
                return <EditBasicInfo />
            case 'basicDays':
                return <EditBusinessDays />
            case 'basicMemo':
                return <EditBusinessMemo />
            case 'basicHomepage':
                return <EditHomepage />
            case 'basicSNS':
                return <EditSNS />
            case 'menuAdd':
                return <MenuCreate />
            case 'menuEdit':
                return <MenuList />
            case 'spiritSpirit':
                return <StoreEditTable_spirit />
            case 'spiritAdvantage':
                return <StoreEditTable_advantage />
            case 'stampAdd':
                return <h2>stamp</h2>
        }
    }

    return (
        <div className = "m-store-edit-table">
            <nav className = "m-store-edit-table__nav">
                <ul>
                    <li className = "m-store-edit-table__nav__basic">
                        <label><FontAwesomeIcon icon={faChevronCircleDown}/>店舗情報の編集</label>
                        {StoreEditNav_basic.map((arr)=>Tab(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav__menu">
                        <label><FontAwesomeIcon icon={faChevronCircleDown}/>メニューの追加・編集</label>
                        {StoreEditNav_menu.map((arr)=>Tab(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav__spirit">
                        <label><FontAwesomeIcon icon={faChevronCircleDown}/>こだわり・思いの編集</label>
                        {StoreEditNav_spirit.map((arr)=>Tab(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav__stamp">
                        <label><FontAwesomeIcon icon={faChevronCircleDown}/>スタンプカードの編集</label>
                        {StoreEditNav_stamp.map((arr)=>Tab(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav__others">
                        <p>パスワードの再設定</p>
                        <BtnLogout/>
                    </li>
                </ul>
            </nav>
            <div className = "m-store-edit-table__container">
                <div className = "m-store-edit-table__container__content">
                    {CurrentTable(Table)}
                </div>
            </div>
        </div>
    );
}

export default StoreEditTable;