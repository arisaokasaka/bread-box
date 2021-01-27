import React from 'react'
import Store_basicInfo from '../../molecules/Store_basicInfo';

export default function StorePage() {
    //テスト
    let testInfo = [{
        name: 'arisa bakery',
        address: '天神1丁目',
        message: 'buono! buono! buono! buono! buono! buono! buono! buono! buono! '
    }]

    return (
        <div className = "p-store">
            <div className = "p-store__container">
                <div className = "p-store__container__img"></div>
                <div className = "p-store__container__content">
                    <Store_basicInfo
                        StoreInfo = {testInfo}
                    />
                    <div className = "p-store__container__side"></div>
                </div>
            </div>
        </div>
    )
}
