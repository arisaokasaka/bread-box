import React from 'react'

type ScoreProps = {
    score_total? : string;
    score_rate? : string;
}

const Score: React.FC<ScoreProps> = ({score_total,score_rate}) => (
    <div className ="a-score">
        <h2>{score_total}</h2>
        <div className="a-score__stars">
            <div className="a-score__stars__content" style={{width: score_rate}}>
                <span>★★★★★</span>
            </div>
            <span className="a-score__stars__frame">☆☆☆☆☆</span>
        </div>
    </div>
);

export default Score;