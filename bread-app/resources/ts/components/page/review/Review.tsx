import React from 'react';
import StoreBasicInfo from '../../molecules/store/StoreBasicInfo';
import ReviewList from '../../molecules/ReviewList';
import ModalCreateReview from '../../atoms/modal/Modal_review';
import Store_Pickup from '../../molecules/Store_pickup';

type ReviewProps = ({
    ReviewInfo: Array<any>;
    StoreInfo: Array<any>;
})

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
                        Pickup = {StoreInfo}
                    />
                </aside>
            </div>
        </div>
    );
}

export default Review;