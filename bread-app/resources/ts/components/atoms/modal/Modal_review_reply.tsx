import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faReply } from "@fortawesome/free-solid-svg-icons";

type ReviewInfoProps = ({
    review_uuid: string
})

const ModalReviewReply: React.FC<ReviewInfoProps> = ({review_uuid}) =>{
    const [ isModalOpen, setModal ] = useState(false);
    const { register, handleSubmit, errors } = useForm();
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
    
    const onSubmit = (data) => {
        axios.post("/api/register_reply", data)
        .then(res => {
            setModal(false);
            alert('返信しました。')
        })
        .catch(err => {
            alert('返信に失敗しました。')
        });
    }
    
    return(
        <div className = "m-modal-review-reply">
            <button className="a-btn-modal-reviw-reply" onClick={()=>setModal(true)}><FontAwesomeIcon icon={faReply}/>返信する</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={()=>setModal(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className = "m-modal-review-reply__btn--close">
                    <button onClick={()=>setModal(false)}><FontAwesomeIcon icon={faTimes}/></button>
                </div>
                
                <form className="m-modal-review-reply__form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="review_uuid" value={review_uuid} ref={register}/>
                    <textarea name="reply" placeholder="口コミへの返信を記入してください。" ref={register({required: true})}/>
                    {errors.reply && <p>返信内容は必須です。</p>}

                    <input type="submit" value="返信を投稿する"/>
                </form>
            </Modal>
        </div>
    );
}

export default ModalReviewReply;