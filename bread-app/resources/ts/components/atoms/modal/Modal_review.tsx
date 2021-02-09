import React,{useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faPen} from "@fortawesome/free-solid-svg-icons";

type StoreInfoProps = ({
    StoreInfo: any
})

const ModalCreateReview: React.FC<StoreInfoProps> = ({StoreInfo}) =>{
    const { state } = useContext(UserAuthContext);
    const [modalIsOpen,setIsOpen] = useState(false);
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
    
    const { register, handleSubmit, errors, getValues } = useForm();
    const onSubmit = () => {
        console.log();
    }

    function openModal() {
      setIsOpen(true);
    }
      
    function closeModal(){
      setIsOpen(false);
    }

    //ログイン状態に応じてレビューボタンの仕様変更
    let btnReview: any;
    if(state.uuid && state.auth==="user"){
        btnReview = (
            <button onClick={openModal} className = "a-btn-modal-review">
                <FontAwesomeIcon icon={faPen}/>&nbsp;&nbsp;レビューを書く
            </button>
        )
    }else if(state.uuid && state.auth==="store"){
        btnReview = null;
    }else{
        btnReview = (
            <Link to="login_user" className = "a-btn-modal-review">
                <FontAwesomeIcon icon={faPen}/>&nbsp;&nbsp;レビューを書く
            </Link>
        )
    }
    

    return(
        <div className = "m-modal-review">
            <div>
                {btnReview}
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                >
                    <div className = "m-modal-review__btn--close">
                        <button onClick={closeModal}><FontAwesomeIcon icon={faTimes}/></button>
                    </div>
                    
                    <form className="m-modal-review__form" onSubmit={handleSubmit(onSubmit)}>
                        
                        <label htmlFor="star" className="a-label-required">5段階で評価してください。</label>
                        <p>5が最も高い評価となります。</p>
                        <select name="star" id="star" ref={ register({required: true})}>    
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                        {errors.name && <p>評価は必須です。</p>}

                        <label htmlFor="comment" className="a-label-required">コメント</label>
                        <textarea name="comment" id="comment" ref={register}/>
                        
                        <input type="submit" value="投稿する"/>
                    </form>
                </Modal>
            </div>     
        </div>
    );
}

export default ModalCreateReview;