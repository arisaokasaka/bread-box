import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

type StoreInfoProps = ({
    StoreInfo: any
})

const Btn_homepage: React.FC<StoreInfoProps> = ({StoreInfo}) =>(
    <div className = "a-btn-homepage">
        {StoreInfo.map((el)=>(
        el.url && <a href={el.url}><FontAwesomeIcon icon={faPaperPlane}/>&nbsp;&nbsp;ホームページ</a>
        ))}
    </div>
)

export default Btn_homepage;