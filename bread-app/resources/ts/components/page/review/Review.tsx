import React from 'react';
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import ReviewList from '../../molecules/ReviewList';
import ModalCreateReview from '../../atoms/modal/Modal_review';
import Store_Pickup from '../../molecules/Store_pickup';
import StoreSubInfo from '../../molecules/store/StoreSubinfo';

type ReviewProps = ({
    ReviewInfo: Array<any>;
    StoreInfo: Array<any>;
})

const testPickInfo = [
    {
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/bakery.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/bakery2.jpg'
    },
]

const testReviewInfo = [{
    uuid: '2222',
    star: 4.4,
    comment: 'すっごくおいしかった！！！',
    reply: '',
}]

const testStoreInfo = [
    {
        name: 'sarasapan',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        star: 3.3,
}]

const Review : React.FC<ReviewProps> = ({ReviewInfo, StoreInfo}) => {
    ReviewInfo = testReviewInfo;
    StoreInfo = testStoreInfo;

    return(
        <div className = "p-review">
            <div className = "p-review__container">
                <main>
                    <div className = "p-review__container__info">
                        <StoreBasicInfo
                            StoreInfo = {StoreInfo}
                        />
                    </div>
                    <ModalCreateReview
                        StoreInfo = {StoreInfo}
                    />
                    <div className = "p-review__container__table">
                        <ReviewList
                            ReviewInfo = {ReviewInfo}
                        />
                    </div>
                </main>
                <aside>
                    <Store_Pickup
                        PickupInfo = {testPickInfo}
                    />
                </aside>
            </div>
        </div>
    );
}

export default Review;