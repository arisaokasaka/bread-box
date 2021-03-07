import React,{ useState, useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../contexts/StoreInfoContext';

type MenuInfoProps = ({
    menu: any;
})

const Modal_confirmDelete_menu: React.FC<MenuInfoProps> = ({menu}) =>{
    const { state } = useContext(UserAuthContext);
    const { dispatch } = useContext(StoreInfoContext);
    const [ modalIsOpen, setModal ] = useState(false);
    const { handleSubmit, register } = useForm();
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
    const onSubmit = (data) => {
        axios.post("/api/delete_menu", data)
        .then(res => {
            alert('削除しました。');
            getMenuInfo();
            setModal(false);
        })
        .catch(err => {
            alert('削除に失敗しました。');
        });
    }

    // メニュー情報取得
    const getMenuInfo = () => {
        axios.post("/api/index_menuInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            dispatch({
                type: 'inputMenuInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    return(
        <div className="m-modalConfirmDelete">
            <button className="a-btn-deleteMenu" onClick={()=>setModal(true)} >
                <span><FontAwesomeIcon icon={faTrash}/></span>
                <span>削除する</span>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>setModal(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="m-modalConfirmDelete__btn--close">
                    <button onClick={()=>setModal(false)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <form className="m-modalConfirmDelete__form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="uuid" value={menu.uuid} ref={register}/>
                    <input type="hidden" name="store_uuid" value={state.uuid} ref={register}/>
                    <input type="hidden" name="bread_order" value={menu.bread_order} ref={register}/>
                    <p>「{menu.bread_name}」<br/>本当に削除しますか？</p>
                    <div className="m-modalConfirmDelete__form__btns">
                        <button className="a-btn-cancel" onClick={()=>setModal(false)}>キャンセル</button>
                        <button className="a-btn-delete--menu" type="submit">削除する</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Modal_confirmDelete_menu;