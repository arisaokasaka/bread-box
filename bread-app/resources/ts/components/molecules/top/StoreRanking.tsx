import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StorRanking: React.FC = () => {
    const [ info, setInfo ] = useState([]);
    let storeInfo: any = info;

    useEffect(()=>{
        getStore();
    },[])

    const getStore = () => {
        axios.post('/api/store_ranking',{
            count: 4
        })
        .then(res=>{
            setInfo(res.data);
        })
        .catch();
    }

    return(
        <div className="m-store-ranking">
            <h2 className="m-store-ranking__title">ランキング</h2>
            <div className="m-store-ranking__list">
                {storeInfo.map((el, index)=>{
                    return(
                        <Link to={"/store/"+el.user_uuid} className="m-store-ranking__list__item" key={"ranking_"+index}>
                            {el.thumbnail ? 
                            <img src={"/storage/store/" + el.user_uuid + "/thumbnail.jpg"} alt="店舗画像"/> 
                            : <img src="/images/no_image_thumbnail.png" alt="店舗画像"/>}
                            <p>{el.name}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default StorRanking;