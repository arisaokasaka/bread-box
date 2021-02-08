import React from 'react';

type RankingProps = ({
    RankingInfo: Array<any>;
})

const StorRanking: React.FC<RankingProps> = ({RankingInfo}) => (
    <div className="m-store-ranking">
        <h2 className="m-store-ranking__title">ランキング</h2>
        <div className="m-store-ranking__list">
            {RankingInfo.map((el)=>{
                return(
                    <div className="m-store-ranking__list__item" key={el.id}>
                        <img src={el.img} alt="店舗画像"/>
                        <p>{el.name}</p>
                    </div>
                );
            })}
        </div>
    </div>
);

export default StorRanking;