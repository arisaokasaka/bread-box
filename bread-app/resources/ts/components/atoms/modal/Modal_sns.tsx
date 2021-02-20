import React,{ useState } from 'react';
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faStar, faLink} from "@fortawesome/free-solid-svg-icons";
import {faTwitter, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

type SNSProps = ({
    snsInfo: any
})

const ModalSNS: React.FC<SNSProps> = ({snsInfo}) =>{
    const [ isModelOpen, setModal ] = useState(false);
    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    return(
        <div className = "m-modal-sns">
            {snsInfo &&
                <div key={"sns_"+snsInfo.id}>
                    <button onClick={()=>setModal(true)} className = "a-btn-modal-sns">
                        <FontAwesomeIcon icon={faLink}/>&nbsp;&nbsp;ＳＮＳ
                    </button>
                    <Modal
                    isOpen={isModelOpen}
                    onRequestClose={()=>setModal(false)}
                    style={customStyles}
                    ariaHideApp={false}
                    >
                    <div className = "m-modal-sns__btn--close">
                        <button onClick={()=>setModal(false)}><FontAwesomeIcon icon={faTimes}/></button>
                    </div>
                    <div className = "m-modal-sns__links">
                        <ul>
                            {snsInfo.instagram && <li><a href={snsInfo.instagram} className = "m-modal-sns__links__item instagram"><FontAwesomeIcon icon={faInstagram}/>&nbsp;&nbsp;Instagram</a></li>}
                            {snsInfo.facebook && <li><a href={snsInfo.facebook} className = "m-modal-sns__links__item facebook"><FontAwesomeIcon icon={faFacebook}/>&nbsp;&nbsp;Facebook</a></li>}
                            {snsInfo.twitter && <li><a href={snsInfo.twitter} className = "m-modal-sns__links__item twitter"><FontAwesomeIcon icon={faTwitter}/>&nbsp;&nbsp;Twitter</a></li>}
                            {snsInfo.other && <li><a href={snsInfo.other} className = "m-modal-sns__links__item other"><FontAwesomeIcon icon={faStar}/>&nbsp;&nbsp;その他</a></li>}
                        </ul>
                    </div>
                    </Modal>
                </div>
            }
        </div>
    );
}

export default ModalSNS;