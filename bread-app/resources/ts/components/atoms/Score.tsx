import React from 'react'

type ScoreProps = {
    ScoreStar: any;
}

const Score: React.FC<ScoreProps> = ({ScoreStar}) => (
    <div className ="a-score">
        {ScoreStar.map((el)=>(
            <div className ="a-score__container">
                <h2>{el.star}</h2>
                <div className="a-score__container__stars">
                    <div className="a-score__container__stars__content" style={{width: el.star*20 + "%"}}>
                        <span>★★★★★</span>
                    </div>
                    <span className="a-score__container__stars__frame">☆☆☆☆☆</span>
                </div>
            </div>
        ))}
    </div>
);

export default Score;