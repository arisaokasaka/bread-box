import React, { useState } from 'react'
import StoreEditTable_menu from './StoreEditTable_menu';
import StoreEditTable_spirit from './StoreEditTable_spirit';
import StoreEditTable_basic from './StoreEditTable_basic';

type EditProps = ({
    MenuInfo: Array<any>;
    StoreInfo: Array<any>;
});

const StoreEditTable: React.FC<EditProps> = ({StoreInfo, MenuInfo}) => {  
    const [Table, setTable] = useState('menu');
    
    const TabMenu = {
        class: "m-store-contents__tab--menu",
        table: "menu",
        value: "メニュー",
        function: handleMenu,
    }
    
    const TabStamp = {
        class: "m-store-contents__tab--stamp",
        table: "stamp",
        value: "スタンプカード",
        function: handleStamp,
    }
    
    const TabSpirit = {
        class: "m-store-contents__tab--spirit",
        table: "spirit",
        value: "こだわり・思い",
        function: handleSpirit,
    }

    const TabBasic = {
        class: "m-store-contents__tab--basic",
        table: "basic",
        value: "基本情報",
        function: handleBasic,
    }

    function handleMenu(){
        setTable('menu');
    }

    function handleStamp(){
        setTable('stamp');
    }

    function handleSpirit(){
        setTable('spirit')
    }

    function handleBasic(){
        setTable('basic')
    }

    const Tab = (tab) => {
        let className = tab.class;
        if(Table === tab.table){
            className += ' selected';
        }
        return <input type="text" value = {tab.value} className={className} onClick = {tab.function}/>
    }

    const CurrentTable = (table) => {
        switch(table){
        case 'menu':
            return <StoreEditTable_menu MenuInfo = {MenuInfo}/>
            break;
        case 'spirit':
            return <StoreEditTable_spirit Spirit = {MenuInfo}/>
            break;
        case 'stamp':
            return <h2>stamp</h2>
            break;
        case 'basic':
        return <StoreEditTable_basic StoreInfo = {StoreInfo}/>
        break;
        }
    }

    return (
        <div className = "m-store-edit-table">
            <div className = "m-store-edit-table__tab">
                {Tab(TabMenu)}
                {Tab(TabSpirit)}
                {Tab(TabStamp)}
                {Tab(TabBasic)}
            </div>
            <div className = "m-store-edit-table__container">
                <div className = "m-store-edit-table__container__content">
                    {CurrentTable(Table)}
                </div>
            </div>
        </div>
    );
}

export default StoreEditTable;