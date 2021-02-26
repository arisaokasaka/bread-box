import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ReviewInfoProps = ({
    comment?: string
    review_uuid: string
    star: number
    index?: number
})

const ModalReviewEdit_user: React.FC<ReviewInfoProps> = ({comment, review_uuid, star, index}) =>{
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
        axios.post("/api/update_review", data)
        .then(res => {
            setModal(false);
            alert('口コミを修正しました。')
        })
        .catch(err => {
            alert('口コミの修正に失敗しました。')
        });
    }

    if(!comment){
        comment = ''
    }
    
    const toggleDialogue = (index) => {
        setModal(true)
        let classInfo = document.getElementsByClassName("review_"+index)[0];
        if(classInfo.className.includes('active')){
            classInfo.classList.remove('active');
        } else {
            classInfo.className += ' active';
        }
    }
    
    return(
        <div className = "m-modal-reviewEdit-user">
            <button　className="m-modal-reviewEdit-user__btn--edit" onClick={()=>toggleDialogue(index)}>編集</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={()=>setModal(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className = "m-modal-reviewEdit-user__btn--close">
                    <button onClick={()=>setModal(false)}><FontAwesomeIcon icon={faTimes}/></button>
                </div>
                
                <form className="m-modal-reviewEdit-user__form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="uuid" value={review_uuid} ref={register}/>
                    
                    <label htmlFor="star" className="a-label-required">5段階で評価してください。</label>
                    <p>5が最も高い評価となります。</p>
                    <select name="star" id="star" defaultValue={star} ref={register({required: true})}> 
                        <option hidden>選択してください</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                    {errors.star && <p>評価は必須です。</p>}

                    <label htmlFor="comment" className="a-label-required">コメント</label>
                    <textarea name="comment" id="comment" defaultValue={comment} placeholder="[任意]レビューや感想を記入してください。" ref={register}/>
                    
                    <input type="submit" value="更新する"/>
                </form>
            </Modal>
        </div>
    );
}

export default ModalReviewEdit_user;