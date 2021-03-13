import React,{ useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const Modal_confirmDelete_account: React.FC = () =>{
    const { state, dispatch } = useContext(UserAuthContext);
    const [ modalIsOpen, setModal ] = useState(false);
    const history = useHistory();
    const message_fail: string = "アカウントの削除に失敗しました。";
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
    
    //削除機能（削除するメニューのuuid送信）
    const delete_account = () => {
        if(state.uuid==="f71cc1ce-ad29-4c1a-968c-be4f677be4c1" || state.uuid==="a1647936-a8c5-43df-92d8-5f91168c5e2a") {
            alert('申し訳ありません。ゲストアカウントは削除することはできません。')
        } else {
            if(state.auth === "user") {
                // ユーザーの場合
                axios.post("/api/delete_user_account", {uuid: state.uuid})
                .then(res => {
                    delete_success();
                })
                .catch(err => {
                    alert(message_fail);
                });
            } else if (state.auth === "store") {
                // 店舗の場合
                axios.post("/api/delete_store_account", {uuid: state.uuid})
                .then(res => {
                    delete_success();
                })
                .catch(err => {
                    alert(message_fail);
                });
            } else {
                alert(message_fail);
            }
        }
    }

    const delete_success = () => {
        alert('アカウントを削除しました。');
        history.push('/');
        dispatch({
            type: 'setOut'
        });
    }

    return(
        <div className="m-modalConfirmDelete-account">
            <button className="m-modalConfirmDelete-account__btn--open" onClick={()=>setModal(true)}>アカウントを削除する</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>setModal(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="m-modalConfirmDelete-account__btn--close">
                    <button onClick={()=>setModal(false)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <div className="m-modalConfirmDelete-account__container">
                    <p>アカウントを本当に削除しますか？</p>
                    <span>再度ご利用いただく場合は、一からアカウントを作成していただく形となります。</span>
                    <div className="m-modalConfirmDelete-account__container__btns">
                        <button onClick={()=>setModal(false)}>キャンセル</button>
                        <button type="submit" onClick={delete_account}>削除する</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Modal_confirmDelete_account;