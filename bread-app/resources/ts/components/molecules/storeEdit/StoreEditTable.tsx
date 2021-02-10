import React, { useState } from 'react'
import MenuCreate from './storeEditMenu/MenuCreate';
import MenuEdit from './storeEditMenu/MenuEdit';
import EditBusinessDays from './storeEditBasic/EditBusinessDays';
import EditBusinessMemo from './storeEditBasic/EditBusinessMemo';
import EditHomepage from './storeEditBasic/EditHomepage';
import EditSNS from './storeEditBasic/EditSNS';
import StoreEditTable_spirit from './storeEditSpirit/StoreEditTable_spirit';
import StoreEditTable_advantage from './storeEditSpirit/StoreEditTable_advantage';
import EditBasicInfo from './storeEditBasic/EditBasicInfo';
import { StoreEditNav_menu, StoreEditNav_basic, StoreEditNav_spirit, StoreEditNav_stamp } from '../../../info/StoreEditMenus';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronCircleDown} from '@fortawesome/free-solid-svg-icons';

type EditProps = ({
    MenuInfo: Array<any>;
    StoreInfo: Array<any>;
});

const StoreEditTable: React.FC<EditProps> = ({StoreInfo, MenuInfo}) => {  
    const [Table, setTable] = useState('basicInfo');

    const Tab = (tab) => {
        let TabClassName = tab.category + "_" + tab.tableName;
        console.log(tab);
        if(Table === tab.tableName){
            TabClassName += ' selected';
        }
        return (
            <span 
            className={TabClassName} 
            key = {TabClassName}
            onClick = {() => setTable(tab.tableName)}
            >
                <input
                type="text"
                value = {tab.label}
                />
                <a><FontAwesomeIcon icon={faChevronRight} /></a>
            </span>
        );
    }

    const CurrentTable = (table) => {
        switch(table){
            case 'basicInfo':
                return <EditBasicInfo StoreInfo = {StoreInfo}/>
            case 'basicDays':
                return <EditBusinessDays StoreInfo = {StoreInfo}/>
            case 'basicMemo':
                return <EditBusinessMemo StoreInfo = {StoreInfo}/>
            case 'basicHomepage':
                return <EditHomepage StoreInfo = {StoreInfo}/>
            case 'basicSNS':
                return <EditSNS StoreInfo = {StoreInfo}/>
            case 'menuAdd':
                return <MenuCreate />
            case 'menuEdit':
                return <MenuEdit MenuInfo = {MenuInfo}/>
            case 'spiritSpirit':
                return <StoreEditTable_spirit Spirit = {MenuInfo}/>
            case 'spiritAdvantage':
                return <StoreEditTable_advantage Spirit = {MenuInfo}/>
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
                        <p>ログアウトする</p>
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