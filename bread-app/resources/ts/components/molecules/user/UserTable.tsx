import React, { useState } from 'react';
import UserTable_favorite from './UserTable_favorite';
import UserTable_interested from './UserTable_interested';
import UserTable_review from './UserTable_review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFlag, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const UserTable: React.FC = () => {
    const [ Table, setTable ] = useState('favorite');

    const TabFavorite = {
        class: "m-user-table__tab--favorite",
        table: "favorite",
        value: "お気に入り",
        icon: faHeart,
        function: handleFavorite,
    }
    
    const TabInterested = {
        class: "m-user-table__tab--interested",
        table: "interested",
        value: "行ってみたい",
        icon: faFlag,
        function: handleInterested,
    }
    
    const TabReview = {
        class: "m-user-table__tab--review",
        table: "review",
        value: "口コミ",
        icon: faCommentDots,
        function: handleReview,
    }

    function handleFavorite() {
        setTable('favorite');
    }

    function handleInterested() {
        setTable('interested');
    }

    function handleReview() {
        setTable('review')
    }

    const Tab = (tab) => {
        let className = tab.class;
        if(Table === tab.table){
            className += ' selected';
        }
        return <button className={className} onClick = {tab.function}><FontAwesomeIcon icon={tab.icon}/>{tab.value}</button>
    }

    const CurrentTable = (table) => {
        switch(table){
        case 'favorite':
            return <UserTable_favorite/>
        case 'interested':
            return <UserTable_interested/>
        case 'review':
            return <UserTable_review/>
        }
    }

    return (
        <div className = "m-user-table">
            <div className = "m-user-table__tab">
                {Tab(TabFavorite)}
                {Tab(TabInterested)}
                {Tab(TabReview)}
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