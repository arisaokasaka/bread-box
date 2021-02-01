import React from 'react'

type ScoreProps = {
    ScoreStar: number;
}

const Score: React.FC<ScoreProps> = ({ScoreStar}) => (
    <div className ="a-score">
        <div className ="a-score__container">
            <h2>{ScoreStar}</h2>
            <div className="a-score__container__stars">
                <div className="a-score__container__stars__content" style={{width: ScoreStar*20 + "%"}}>
                    <span>★★★★★</span>
                </div>
                <span className="a-score__container__stars__frame">☆☆☆☆☆</span>
            </div>
        </div>
    </div>
);

export default Score;