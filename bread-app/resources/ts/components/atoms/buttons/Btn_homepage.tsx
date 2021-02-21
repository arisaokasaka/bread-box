import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type HomepageProps = ({
    url: string
})

const Btn_homepage: React.FC<HomepageProps> = ({url}) => {
    const handleClick = () => {
        if (window.confirm('外部ページに遷移します。よろしいですか？')) {
            location.href = url;
        }
    }

    return(
        <div className = "a-btn-homepage">
            {url && 
                <a key={url} onClick={handleClick}>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                    &nbsp;&nbsp;ホームページ
                </a>
            }
        </div>
    )
}

export default Btn_homepage;