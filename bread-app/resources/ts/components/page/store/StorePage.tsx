import React from 'react'
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import StoreSubInfo from '../../molecules/store/StoreSubinfo';
import StoreContents from '../../molecules/store/StoreContents';

export default function StorePage() {
    //テスト
    let testStoreInfo = [
        {
            name: 'sarasapan',
            address: 'dsdsdsdsdsdsd',
            business_day: 'sasa',
            busines_memo: '定休日！！！',
            message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
            sns: {twitter: 'twitter', instagram: 'sssss'}
        }
    ]

    let testInfo = [
        {
            bread_name: 'くりーむ',
            bread_kind: '菓子パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },{
            bread_name: 'くりーむ',
            bread_kind: '菓子パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },{
            bread_name: 'くりーむ',
            bread_kind: '菓子パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: 'sssssssss',
            spirit: 'rrrrrrrrrrrr',
            menu_type: 2,
        },{
            bread_name: 'くりーむ',
            bread_kind: '菓子パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },{
            bread_name: 'くりーむ',
            bread_kind: '菓子パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },
    ];

    return (
        <div className = "p-store">
            <div className = "p-store__container">
                <div className = "p-store__container__img"></div>
                    <div className = "p-store__container__content">
                        <div className = "p-store__container__content__main">
                            <StoreBasicInfo
                                StoreInfo = {testStoreInfo}
                            />
                            <StoreContents
                                StoreInfo = {testInfo}
                            />
                        </div> 
                        <StoreSubInfo
                            StoreInfo = {testStoreInfo} 
                        />
                    </div>
            </div>
        </div>
    )
}
