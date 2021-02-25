import React, { useState } from 'react'
import StoreMenu from './StoreMenu';
import StoreSpirit from './StoreSpirit';
import StoreReview from './StoreReview';

type InfoProps = ({
    menuInfo : Array<any>
    store_uuid: string
})

const StoreContents: React.FC<InfoProps> = ({menuInfo, store_uuid}) => {
    const [table, setTable] = useState('menu');
    
    const SectionMenu = {
        class: "m-store-contents__tab--menu",
        table: "menu",
        value: "メニュー",
        function: handleMenu,
    }
    
    const SectionReview = {
        class: "m-store-contents__tab--stamp",
        table: "review",
        value: "口コミ",
        function: handleReview,
    }
    
    const SectionSpirit = {
        class: "m-store-contents__tab--spirit",
        table: "spirit",
        value: "こだわり・思い",
        function: handleSpirit,
    }

    function handleMenu(){
        setTable('menu');
    }

    function handleReview(){
        setTable('review');
    }

    function handleSpirit(){
        setTable('spirit')
    }

    const StoreTab = (section) => {
        let className = section.class;
        if(table === section.table){
            className += ' selected';
        }
        return <a className={className} onClick = {section.function}>{section.value}</a>
    }

    const CurrentTable = (table) => {
        switch(table){
        case 'menu':
            return <StoreMenu Menu = {menuInfo}/>
            break;
        case 'spirit':
            return <StoreSpirit Spirit = {menuInfo}/>
            break;
        case 'review':
            return <StoreReview store_uuid={store_uuid}/>
            break;
        }
    }

    return (
        <div className = "m-store-contents">
            <div className = "m-store-contents__tab">
                {StoreTab(SectionMenu)}
                {StoreTab(SectionSpirit)}
                {StoreTab(SectionReview)}
            </div>
            <div className = "m-store-contents__container">
                <div className = "m-store-contents__container__table">
                    {CurrentTable(table)}
                </div>
            </div>
        </div>
    );
}


export default StoreContents;