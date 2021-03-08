import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

type Props = ({
    click_function?: Function
})

const BtnBack : React.FC<Props> = ({click_function}) => {
    const history = useHistory();

    const handleClick = () => {
        if(click_function) {
            click_function();
        } else {
            history.goBack()
        }
    }

    return(
        <a onClick={handleClick} className="a-btn-back">
            <FontAwesomeIcon icon={faArrowLeft}/>
            <span>戻る</span>
        </a>
    );
}

export default BtnBack;
