import React from 'react'
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import StoreSubInfo from '../../molecules/store/StoreSubinfo';
import StoreContents from '../../molecules/store/StoreContents';

export default function StorePage() {
    //テスト
    let testStoreInfo = [
        {
            name: 'Le pain de Maki',
            address: '福岡市博多区比恵町',
            star: 3.3,
            business_day: '月曜日',
            busines_memo: '定休日！！！',
            message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
            sns: {twitter: 'twitter', instagram: 'sssss'}
        }
    ]

    let testInfo = [
        {
            id: 1,
            bread_name: 'くりーむ',
            bread_kind: '菓子パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },{
            id: 2,
            bread_name: 'くりーむ',
            bread_kind: 'クロワッサン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },{
            id: 4,
            bread_name: 'くりーむ',
            bread_kind: 'クロワッサン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '落ち着いた空間で、京都らしい景色を眺めながらお食事が楽しめる【川間食堂】。ご注文が入ってから作るサンドイッチ・ライスバーガーは、気軽に食べられるバーガー袋でご提供いたします◎また季節限定メニュー・ドリンクもおすすめ♪',
            spirit: '系列店「馬場FLAT」から毎日届く国産小麦100%の自家製パンは、ランチでもディナーでもおかわり自由ですので、ディップやオリジナリティあふれるお料理とともにお召しあがりください。パンのみの販売もしております。',
            menu_type: 2,
        },{
            id: 5,
            bread_name: 'くりーむ',
            bread_kind: '食パン',
            bread_price: 120,
            bread_detail: '北海道の生クリーム！！！使ってるんだ！！！！！',
            advantage: '',
            spirit: '',
            menu_type: 1,
        },{
            id: 6,
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
                <div className = "p-store__container__img">
                    <img src="/images/bakery.jpg" alt="トップ画像"/>
                </div>
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
