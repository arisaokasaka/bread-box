import React from 'react';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

type LinkProps= ({
    URL? : string,
});

const BtnBack : React.FC<LinkProps> = ({URL}) => {
    return(
        <Link to = {URL} className = "a-btn-back">
            <FontAwesomeIcon icon={faArrowLeft}/>
        </Link>
    );
}

export default BtnBack;
