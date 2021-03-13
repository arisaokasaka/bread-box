import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import EditImage from './storeEditBasic/EditImage';
import { StoreEditNav_menu, StoreEditNav_basic, StoreEditNav_spirit } from '../../../info/StoreEditMenus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faBreadSlice, faChevronRight, faHeart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import BtnLogout from '../../atoms/buttons/BtnLogout';
import Modal_confirmDelete_account from '../modal/Modal_confirmDelete_account';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const StoreEditTable: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const [ Table, setTable ] = useState('basicInfo');
    const [ className_active, setClassName_Active] = useState('')
    const [ storeInfo, setStoreInfo ] = useState({});
    const [ menuInfo, setMenuInfo ] = useState([]);

    useEffect(() => {
        getStoreInfo();
        getMenuInfo();
    },[]);

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: state.uuid
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
            store_uuid: state.uuid
        })
        .then(res => {
            setMenuInfo(res.data)
        })
        .catch(err => {
        });
    }

    //サイドメニューのタブ一覧
    const Menu = (menu) => {
        let MenuClassName = menu.category + "_" + menu.tableName;
        if(Table === menu.tableName){
            MenuClassName += ' selected';
        }
        return (
            <span 
                className={MenuClassName} 
                key = {MenuClassName}
                onClick = {() => setTable(menu.tableName)}
            >
                <a>{menu.label}</a>
                <a><FontAwesomeIcon icon={faChevronRight} /></a>
            </span>
        );
    }

    const CurrentTable = (table) => {
        switch(table){
            case 'basicInfo':
                return <EditBasicInfo update_function={getStoreInfo} storeInfo={storeInfo}/>
            case 'basicDays':
                return <EditBusinessDays update_function={getStoreInfo} storeInfo={storeInfo}/>
            case 'basicMemo':
                return <EditBusinessMemo update_function={getStoreInfo} storeInfo={storeInfo}/>
            case 'basicHomepage':
                return <EditHomepage update_function={getStoreInfo} storeInfo={storeInfo}/>
            case 'basicSNS':
                return <EditSNS update_function={getStoreInfo} storeInfo={storeInfo}/>
            case 'basicImage':
                return <EditImage update_function={getStoreInfo} storeInfo={storeInfo} />
            case 'menuAdd':
                return <MenuCreate update_function={getMenuInfo}/>
            case 'menuEdit':
                return <MenuList update_function={getMenuInfo} menuInfo={menuInfo}/>
            case 'spiritSpirit':
                return <StoreEditTable_spirit update_function={getMenuInfo} menuInfo={menuInfo}/>
            case 'spiritAdvantage':
                return <StoreEditTable_advantage update_function={getMenuInfo} menuInfo={menuInfo} />
        }
    }

    return (
        <div className = "m-store-edit-table">
            <div className="m-store-edit-table__btn-menuMobile" onClick={()=>setClassName_Active('active')}>
                <FontAwesomeIcon icon={faBars}/>
                <span>管理メニュー</span>
            </div>
            <div className = {"m-store-edit-table__nav--mobile " + className_active}>
                <nav className = "m-store-edit-table__nav--mobile__content store_edit_nav" onClick={()=>setClassName_Active('')}>
                    <ul>
                        <li className="m-store-edit-table__nav--mobile__content__close">
                            <FontAwesomeIcon icon={faTimes}/>
                            閉じる
                        </li>
                        <li className = "m-store-edit-table__nav--mobile__content__basic">
                            <label><FontAwesomeIcon icon={faSlidersH}/>店舗情報の編集</label>
                            {StoreEditNav_basic.map((arr)=>Menu(arr))}
                        </li>
                        <li className = "m-store-edit-table__nav--mobile__content__menu">
                            <label><FontAwesomeIcon icon={faBreadSlice}/>メニューの追加・編集</label>
                            {StoreEditNav_menu.map((arr)=>Menu(arr))}
                        </li>
                        <li className = "m-store-edit-table__nav--mobile__content__spirit">
                            <label><FontAwesomeIcon icon={faHeart}/>こだわり・思いの編集</label>
                            {StoreEditNav_spirit.map((arr)=>Menu(arr))}
                        </li>
                        <li className = "m-store-edit-table__nav--mobile__content__others">
                            <Link to="/password_reset_request">パスワードの再設定</Link>
                            <BtnLogout/>
                            <Modal_confirmDelete_account/>
                        </li>
                    </ul>
                </nav>
            </div>
            <nav className = "m-store-edit-table__nav--pc store_edit_nav">
                <ul>
                    <li className = "m-store-edit-table__nav--pc__basic">
                        <label><FontAwesomeIcon icon={faSlidersH}/>店舗情報の編集</label>
                        {StoreEditNav_basic.map((arr)=>Menu(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav--pc__menu">
                        <label><FontAwesomeIcon icon={faBreadSlice}/>メニューの追加・編集</label>
                        {StoreEditNav_menu.map((arr)=>Menu(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav--pc__spirit">
                        <label><FontAwesomeIcon icon={faHeart}/>こだわり・思いの編集</label>
                        {StoreEditNav_spirit.map((arr)=>Menu(arr))}
                    </li>
                    <li className = "m-store-edit-table__nav--pc__others">
                        <Link to="/password_reset_request">パスワードの再設定</Link>
                        <BtnLogout/>
                        <Modal_confirmDelete_account/>
                    </li>
                </ul>
            </nav>
            <div className = "m-store-edit-table__container" onClick={()=>setClassName_Active('')}>
                <div className = "m-store-edit-table__container__content">
                    {CurrentTable(Table)}
                </div>
            </div>
        </div>
    );
}

export default StoreEditTable;