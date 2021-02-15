import React,{ useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

type MenuInfoProps = ({
    menu: any;
})

const Modal_confirmDelete: React.FC<MenuInfoProps> = ({menu}) =>{
    const [modalIsOpen, setModal] = useState(false);
    const { handleSubmit } = useForm();
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
    const onSubmit = () => {
        setModal(false);
        axios.post("/api/delete_menu", {
            uuid: menu.uuid
        })
        .then(res => {
            alert('削除しました。');
        })
        .catch(err => {
            alert('削除に失敗しました。');
            setModal(false);
        });
    }

    return(
        <div className="m-modalConfirmDelete">
            <button className="a-btn-deleteMenu" onClick={()=>setModal(true)} >
                <FontAwesomeIcon icon={faTrash}/>
                削除する
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
                    <p>「{menu.bread_name}」<br/>本当に削除しますか？</p>
                    <div className="m-modalConfirmDelete__form__btns">
                        <button className="a-btn-cancel" onClick={()=>setModal(false)}>キャンセル</button>
                        <button className="a-btn-delete--menu"type="submit">削除する</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Modal_confirmDelete;