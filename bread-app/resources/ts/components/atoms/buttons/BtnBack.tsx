import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

const BtnBack : React.FC = () => {
    const history = useHistory();

    return(
        <a onClick={()=>history.goBack()} className="a-btn-back">
            <FontAwesomeIcon icon={faArrowLeft}/>
            <span>戻る</span>
        </a>
    );
}

export default BtnBack;
