import React from 'react'
import Store_basicInfo from '../../molecules/Store_basicInfo';
import Store_subInfo from '../../molecules/Store_subinfo';

export default function StorePage() {
    //テスト
    let testInfo = [{
        name: 'arisa bakery',
        address: '天神1丁目',
        message: 'buono! buono! buono! buono! buono! buono! buono! buono! buono! ',
        business_memo: '定休日：水木',
        url: 'https:------',
        sns: 'https/twitter'
    }]

    return (
        <div className = "p-store">
            <div className = "p-store__container">
                <div className = "p-store__container__img"></div>
                <div className = "p-store__container__content">
                    <Store_basicInfo
                        StoreInfo = {testInfo}
                    />
                    <Store_subInfo
                        StoreInfo = {testInfo}
                    />
                </div>
            </div>
        </div>
    )
}
