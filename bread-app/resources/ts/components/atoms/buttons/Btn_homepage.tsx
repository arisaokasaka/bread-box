import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

type HomepageProps = ({
    url: string
})

const Btn_homepage: React.FC<HomepageProps> = ({url}) =>(
    <div className = "a-btn-homepage">
        {url && 
            <a href={url} key={url} onClick={()=>window.confirm("外部ページに遷移します。よろしいですか？")}>
                <FontAwesomeIcon icon={faPaperPlane}/>
                &nbsp;&nbsp;ホームページ
            </a>
        }
    </div>
)

export default Btn_homepage;