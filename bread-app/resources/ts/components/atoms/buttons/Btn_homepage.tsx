import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type HomepageProps = ({
    url: string
})

const Btn_homepage: React.FC<HomepageProps> = ({url}) => {
    return(
        <div className = "a-btn-homepage">
            {url && 
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                    &nbsp;ホームページを見る
                </a>
            }
        </div>
    )
}

export default Btn_homepage;