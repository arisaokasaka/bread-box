import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Store_pickup: React.FC = () => {
    const [ info, setInfo ] = useState([]);
    let storeInfo: any = info;

    useEffect(()=>{
        getStore();
    },[])

    const getStore = () => {
        axios.post('/api/store_pickup',{
            count: 4
        })
        .then(res=>{
            setInfo(res.data);
        })
        .catch();
    }

    return(
        <div className="m-store-pickup">
            <h2 className="m-store-pickup__title">ピックアップ</h2>
            <div className="m-store-pickup__list">
                {storeInfo.map((el, index)=>{
                    return(
                        <Link to={"/store/"+el.user_uuid} className="m-store-pickup__list__item" key={"pickup_"+index}>
                            {el.thumbnail ? 
                            <img src={"/storage/store/" + el.user_uuid + "/thumbnail.jpg"} alt="店舗画像"/> 
                            : <img src="/images/no_image.jpg" alt="店舗画像"/>}
                            <p>{el.name}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default Store_pickup;