import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

type ScoreProps = {
    scoreInfo: any;
}

const Score: React.FC<ScoreProps> = ({scoreInfo}) => {
    let info: any;
    let score: number = 0;
    let count: number = 0;
    
    if(scoreInfo){
        info = scoreInfo
        score = scoreInfo.score
        count = scoreInfo.count
    }
    
    return (
        <div className ="a-score">
            <div className ="a-score__container">
                <div className ="a-score__container__result">
                    <div className="a-score__container__result__stars">
                        <div className="a-score__container__result__stars__content" style={{width: score*20 + "%"}}></div>
                    </div>
                    <h3>{score===0 ? '' : score}</h3>
                </div>
                <p className ="a-score__container__comment">
                    <FontAwesomeIcon icon={faCommentDots}/>
                    <span className="a-score__container__comment__label">口コミ数</span>
                    <a>{count}</a>件
                </p>
            </div>
        </div>
    )
}

export default Score;