import React,{useState} from 'react';
import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faStar, faLink} from "@fortawesome/free-solid-svg-icons";
import {faTwitter, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

type StoreInfoProps = ({
    StoreInfo: any
})

const ModalSNS: React.FC<StoreInfoProps> = ({StoreInfo}) =>{
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

    const [modalIsOpen,setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }
      
    function closeModal(){
      setIsOpen(false);
    }

    return(
        <div className = "m-modal-sns">
            {StoreInfo.map((el)=>(
                el.sns && 
                <div>
                    <button onClick={openModal} className = "a-btn-modal-sns">
                        <FontAwesomeIcon icon={faLink}/>&nbsp;&nbsp;ＳＮＳ
                    </button>
                    <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    >
                    <div className = "m-modal-sns__btn--close">
                        <button onClick={closeModal}><FontAwesomeIcon icon={faTimes}/></button>
                    </div>
                    <div className = "m-modal-sns__links">
                        <ul>
                            {el.sns.instagram && <li><a href={el.sns.instagram} className = "m-modal-sns__links__item instagram"><FontAwesomeIcon icon={faInstagram}/>&nbsp;&nbsp;Instagram</a></li>}
                            {el.sns.facebook && <li><a href={el.sns.facebook} className = "m-modal-sns__links__item facebook"><FontAwesomeIcon icon={faFacebook}/>&nbsp;&nbsp;Facebook</a></li>}
                            {el.sns.twitter && <li><a href={el.sns.twitter} className = "m-modal-sns__links__item twitter"><FontAwesomeIcon icon={faTwitter}/>&nbsp;&nbsp;Twitter</a></li>}
                            {el.sns.other && <li><a href={el.sns.other} className = "m-modal-sns__links__item other"><FontAwesomeIcon icon={faStar}/>&nbsp;&nbsp;その他</a></li>}
                        </ul>
                    </div>
                    </Modal>
                </div>
            ))}            
        </div>
    );
}

export default ModalSNS;