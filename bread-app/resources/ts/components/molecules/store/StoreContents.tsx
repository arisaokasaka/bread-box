import React, { useState } from 'react'
import StoreMenu from './StoreMenu';
import StoreSpirit from './StoreSpirit';

type InfoProps = ({
    StoreInfo? : any;
})

const StoreContents: React.FC<InfoProps> = ({StoreInfo}) => {

    const [table, setTable] = useState('menu');
    
    const SectionMenu = {
        class: "m-store-contents__tab--menu",
        table: "menu",
        value: "メニュー",
        function: handleMenu,
    }
    
    const SectionStamp = {
        class: "m-store-contents__tab--stamp",
        table: "stamp",
        value: "スタンプカード",
        function: handleStamp,
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

    function handleStamp(){
        setTable('stamp');
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
            return <StoreMenu Menu = {StoreInfo}/>
            break;
        case 'stamp':
            return <h2>stamp</h2>
            break;
        case 'spirit':
            return <StoreSpirit Spirit = {StoreInfo}/>
            break;
        }
    }

    return (
        <div className = "m-store-contents">
            <div className = "m-store-contents__tab">
                {StoreTab(SectionMenu)}
                {StoreTab(SectionStamp)}
                {StoreTab(SectionSpirit)}
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