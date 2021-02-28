import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import Schedule from '../../atoms/Schedule';
import Score from '../../atoms/Score';
import ReactPaginate from 'react-paginate';

type StoreProps = ({
    storeList: any;
    sortType: string;
});

const StoreList: React.FC<StoreProps> = ({storeList, sortType}) => {
    const history = useHistory();
    const [ offset, setOffset ] = useState(0);
    const perPage = 10;
    
    const handlePageChange = (data) => {
        let page_number = data['selected'];
        setOffset(page_number*perPage);
    }

    return(
        <div className ="m-store-list">
            {storeList
            .slice(offset, offset + perPage)
            .map((el, index)=>{
                return(
                    el &&
                    <div className ="m-store-list__item" key={sortType + "_" + index}>
                        <div className ="m-store-list__item--pc" onClick={()=>history.push("/store/" + el.user_uuid)}>
                            <div className ="m-store-list__item--pc__images__main">
                                {el.thumbnail ? 
                                <img src={"/storage/store/" + el.user_uuid + "/thumbnail.jpg"} alt="パンのメイン画像"/> 
                                : <img src="/images/no_image.jpg" alt="パンのメイン画像"/>}
                            </div>
                            <div className ="m-store-list__item--pc__images__sub">
                                {el.menu1 &&
                                 <img src={"/storage/store/" + el.user_uuid + "/menu/item_1.jpg"} alt="パンのサブ画像"/>}
                                {el.menu2 &&
                                <img src={"/storage/store/" + el.user_uuid + "/menu/item_2.jpg"} alt="パンのサブ画像"/>}
                                {el.menu3 &&
                                <img src={"/storage/store/" + el.user_uuid + "/menu/item_3.jpg"} alt="パンのサブ画像"/>}
                            </div>
                        </div>
                        <div className ="m-store-list__item__container">
                            <div className ="m-store-list__item__container__buttons">
                                <Btn_favorite 
                                    store_uuid={el.user_uuid}
                                    favorite_checked = {el.favorite_checked}
                                    index = {index}
                                />
                                <Btn_interested
                                    store_uuid={el.user_uuid}
                                    interested_checked = {el.interested_checked}
                                    index = {index}
                                />
                            </div>
                            <div className ="m-store-list__item__container__name" onClick={()=>history.push("/store/" + el.user_uuid)}>
                                <h2 className ="hover-colorChange">{el.name}</h2>
                            </div>
                            <p className ="m-store-list__item__container__access">{el.address}</p>
                            <div className ="m-store-list__item--mobile" onClick={()=>history.push("/store/" + el.user_uuid)}>
                                <div className ="m-store-list__item--mobile__images">
                                    {el.thumbnail ? 
                                    <img src={"/storage/store/" + el.user_uuid + "/thumbnail.jpg"} alt="パンのメイン画像"/> 
                                    : <img src="/images/no_image.jpg" alt="パンのメイン画像"/>}
                                    {el.menu1 &&
                                    <img src={"/storage/store/" + el.user_uuid + "/menu/item_1.jpg"} alt="パンのサブ画像"/>}
                                    {el.menu2 &&
                                    <img src={"/storage/store/" + el.user_uuid + "/menu/item_2.jpg"} alt="パンのサブ画像"/>}
                                </div>
                            </div>
                            {el.message && <p className ="m-store-list__item__container__explanation">{el.message}</p>}
                            <Schedule
                                info = {el}
                            />
                            <Score
                                scoreInfo = {el.scoreInfo}
                            />
                        </div>
                    </div>
                );
            })}
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={Math.ceil(storeList.length/perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                onPageChange={handlePageChange}
                containerClassName={'a-pagination'}
                activeClassName={'active'}
                previousClassName={'a-pagination__previous'}
                nextClassName={'a-pagination__next'}
                disabledClassName={'a-pagination__disabled'}
            />
        </div>
    )
}

export default StoreList;