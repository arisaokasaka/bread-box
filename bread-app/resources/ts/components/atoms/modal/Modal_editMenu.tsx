import React,{useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faPen} from "@fortawesome/free-solid-svg-icons";
import BtnSave from '../../atoms/buttons/BtnSave';
import bread_kinds from '../../../info/Bread_kinds';

type MenuInfoProps = ({
    menu: any
})

const Modal_editMenu: React.FC<MenuInfoProps> = ({menu}) =>{
    const [modalIsOpen, setModal] = useState(false);
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

    return(
        <div className="m-modalEditMenu">
            <button onClick={()=>setModal(true)} className="a-btn-editMenu">
                <FontAwesomeIcon icon={faPen}/>
                編集する
            </button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={()=>setModal(false)}
            style={customStyles}
            ariaHideApp={false}
            >
                <div className="m-modalEditMenu__btn--close">
                    <button onClick={()=>setModal(false)}><FontAwesomeIcon icon={faTimes}/></button>
                </div>
                <form className="m-storeEdit-menuCreate__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_name" className="a-label-required__red">メニュー名</label>
                        <div className="m-storeForm__item__input">
                            <input type="text" id="bread_name" name="bread_name" value={menu.bread_name} ref={ register({required: true})} />
                            {errors.bread_name && <p>メニュー名は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_kind" className="a-label-required__red">パンの種類</label>
                        <div className="m-storeForm__item__input">
                            <select name="bread_kind" id="bread_kind"  value={menu.bread_kind} ref={register({required: true})}>
                                {bread_kinds.bread_kinds.map((bread)=>(
                                    <option value={bread.name} key = {bread.id}>{bread.name}</option>
                                ))}
                            </select>
                            {errors.bread_kind && <p>パンの種類は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">    
                        <label htmlFor="bread_price">値段</label>
                        <div className="m-storeForm__item__input a-label-yen">
                            <input type="number" name="bread_price" id="bread_price" value={menu.bread_price} ref={register}/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_detail">詳細・説明</label>
                        <div className="m-storeForm__item__input">
                            <textarea name="bread_detail" id="bread_detail" value={menu.bread_detail} ref={register}/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_img">画像アップロード</label>
                        <div className="m-storeForm__item__input">
                            <input name="bread_img" type="file" accept="image/*"/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={onSubmit}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Modal_editMenu;