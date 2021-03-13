import React from 'react'

type ScoreInfo = ({
    score: number
})

const ScoreUser: React.FC<ScoreInfo> = ({score}) => {
    return(
        <div className ="a-score">
            <div className ="a-score__container">
                <div className ="a-score__container__result">
                    <div className="a-score__container__result__stars">
                        <div className="a-score__container__result__stars__content" style={{width: score*20 + "%"}}></div>
                    </div>
                    <h3>{score}</h3>
                </div>
            </div>
        </div>
    )
}

export default ScoreUser;