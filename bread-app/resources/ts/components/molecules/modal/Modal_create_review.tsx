import React,{useState, useContext} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPen } from "@fortawesome/free-solid-svg-icons";

type StoreInfoProps = ({
    store_uuid: string
    update_function: Function
    update_score: Function
})

const ModalCreateReview: React.FC<StoreInfoProps> = ({store_uuid, update_function, update_score}) =>{
    const { state } = useContext(UserAuthContext);
    const history = useHistory();
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
        axios.post("/api/create_review", data)
        .then(res => {
            setModal(false);
            alert('口コミを投稿しました。')
            update_function();
            update_score();
        })
        .catch(err => {
            alert('口コミの投稿に失敗しました。')
        });
    }

    //ログイン状態に応じてレビューボタンの仕様変更
    let btnReview: any;
    if(state.uuid && state.auth==="user"){
        btnReview = (
            <button onClick={()=>setModal(true)} className = "a-btn-modal-review">
                <FontAwesomeIcon icon={faPen}/>&nbsp;口コミを投稿
            </button>
        )
    }else if(state.uuid && state.auth==="store"){
        btnReview = null;
    }else{
        btnReview = (
            <button onClick={()=>history.push("/login_user")} className = "a-btn-modal-review">
                <FontAwesomeIcon icon={faPen}/>&nbsp;口コミを投稿
            </button>
        )
    }
    
    return(
        <div className = "m-modal-review">
            <div>
                {btnReview}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={()=>setModal(false)}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className = "m-modal-review__btn--close">
                        <button onClick={()=>setModal(false)}><FontAwesomeIcon icon={faTimes}/></button>
                    </div>
                    
                    <form className="m-modal-review__form" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="user_uuid" value={state.uuid} ref={register}/>
                        <input type="hidden" name="store_uuid" value={store_uuid} ref={register} />
                        
                        <label htmlFor="star" className="a-label-required__red--fitContent">5段階で評価してください。</label>
                        <p>5が最も高い評価となります。</p>
                        <select name="star" id="star" ref={register({required: true})}> 
                            <option hidden>選択してください</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                        {errors.star && <p>評価は必須です。</p>}

                        <label htmlFor="comment">コメント</label>
                        <textarea name="comment" id="comment" placeholder="[任意]レビューや感想を記入してください。" ref={register}/>
                        
                        <input type="submit" value="投稿する"/>
                    </form>
                </Modal>
            </div>     
        </div>
    );
}

export default ModalCreateReview;