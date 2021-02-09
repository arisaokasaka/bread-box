import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentDots} from '@fortawesome/free-solid-svg-icons';

type ScoreProps = {
    ScoreStar: number;
}

const Score: React.FC<ScoreProps> = ({ScoreStar}) => (
    <div className ="a-score">
        <div className ="a-score__container">
            <div className ="a-score__container__result">
                <div className="a-score__container__result__stars">
                    <div className="a-score__container__result__stars__content" style={{width: ScoreStar*20 + "%"}}>
                        <span>★★★★★</span>
                    </div>
                    <span className="a-score__container__result__stars__frame">☆☆☆☆☆</span>
                </div>
                <h3>{ScoreStar}</h3>
            </div>
            <p className ="a-score__container__comment">
                <FontAwesomeIcon icon={faCommentDots}/>
                <Link to="/review">1234</Link>件
            </p>
        </div>
    </div>
);

export default Score;