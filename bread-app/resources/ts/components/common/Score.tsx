import React from 'react'

type ScoreProps = {
    score_total? : string;
    score_rate? : string;
}

const Score: React.FC<ScoreProps> = ({score_total,score_rate}) => (
    <div className ="c-score">
        <h2>{score_total}</h2>
        <div className="c-score__stars" style={{width: score_rate}}>
            <span><a>☆☆☆☆☆</a></span>
        </div>
    </div>
);

export default Score;

//css memo
// p{
//     background-clip: text;
//     -webkit-background-clip: text;
// }