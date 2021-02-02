import React from 'react';
import BtnBack from '../../atoms/buttons/BtnBack';
import StoreEditTable from '../../molecules/storeEdit/StoreEditTable';

type StoreEditProps = ({
    MenuInfo: Array<any>;
    StoreInfo: Array<any>;
})

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


const StoreEdit: React.FC<StoreEditProps> = ({MenuInfo, StoreInfo}) => {
    MenuInfo = testMenuInfo;
    StoreInfo = testStoreInfo;

    return(
        <div className = "p-store-edit">
            <div className = "p-store-edit__container">
                <div className = "p-store-edit__container__btn">
                    <BtnBack
                        URL = '/store'
                    />
                </div>
                <div className = "p-store-edit__container__table">
                    <StoreEditTable
                        MenuInfo = {MenuInfo}
                        StoreInfo = {StoreInfo}
                    />
                </div>
            </div>
        </div>
    );
}

export default StoreEdit;