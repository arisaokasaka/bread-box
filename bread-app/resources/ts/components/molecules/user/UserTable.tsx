import React, { useState } from 'react'
import UserTable_favorite from './UserTable_favorite';
import UserTable_interested from './UserTable_interested';

type UserProps = ({
    UserInfo?: any;
});

const testInfoFavorite = [
    {
        name: 'sarasapan',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        star: 3.3,
    },
    {
        name: 'さらさ',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        star: 5.0,
    },{
        name: 'ぱんな',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        star: 4.0
    }
]

const testInfoInterested = [
    {
        name: 'りりり',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        star: 3.3,
    },{
        name: 'ぱんちゃん',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        star: 4.0
    }
]


const UserTable: React.FC<UserProps> = ({UserInfo}) => {
    const [Table, setTable] = useState('favorite');
    
    const TabFavorite = {
        class: "m-store-contents__tab--favorite",
        table: "favorite",
        value: "お気に入り",
        function: handleFavorite,
    }
    
    const TabInterested = {
        class: "m-store-contents__tab--interested",
        table: "interested",
        value: "行ってみたい",
        function: handleInterested,
    }
    
    const TabReviewed = {
        class: "m-store-contents__tab--reviewed",
        table: "reviewed",
        value: "レビュー",
        function: handleReview,
    }

    const TabStamp = {
        class: "m-store-contents__tab--stamp",
        table: "stamp",
        value: "スタンプ",
        function: handleStamp,
    }

    function handleFavorite(){
        setTable('favorite');
    }

    function handleInterested(){
        setTable('interested');
    }

    function handleStamp(){
        setTable('stamp');
    }

    function handleReview(){
        setTable('reviewed')
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
        case 'favorite':
            return <UserTable_favorite StoreInfo = {testInfoFavorite}/>
            break;
        case 'interested':
            return <UserTable_interested StoreInfo = {testInfoInterested}/>
            break;
        case 'stamp':
            return <h2>stamp</h2>
            break;
        case 'reviewed':
        return <h2>review</h2>
        break;
        }
    }

    return (
        <div className = "m-user-table">
            <div className = "m-user-table__tab">
                {Tab(TabFavorite)}
                {Tab(TabInterested)}
                {Tab(TabStamp)}
                {Tab(TabReviewed)}
            </div>
            <div className = "m-user-table__container">
                <div className = "m-user-table__container__content">
                    {CurrentTable(Table)}
                </div>
            </div>
        </div>
    );
}

export default UserTable;