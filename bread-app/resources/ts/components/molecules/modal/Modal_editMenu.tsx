import React ,{ useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPen } from "@fortawesome/free-solid-svg-icons";
import BtnSave from '../../atoms/buttons/BtnSave';
import bread_kinds from '../../../info/Bread_kinds';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type MenuInfoProps = ({
    menu: any
    update_function: Function
})

const Modal_editMenu: React.FC<MenuInfoProps> = ({menu, update_function}) =>{
    const [ modalIsOpen, setModal ] = useState(false);
    const [ file, setFile ] = useState(null);
    const [ fileSize, setFileSize ] = useState(0);
    const { state } = useContext(UserAuthContext);
    const [ textarea_count, setTextarea_count ] = useState(0);
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
        if(fileSize <= 3000000){
            data['store_uuid'] = state.uuid;
            updateMenu(data, file);
        }else{
            alert('画像ファイルが上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。');
        }
    }

    // レコード更新
    const updateMenu = (data, fileSubmitted) => {
        let dataSubmit = new FormData();
        dataSubmit.append("bread_img", fileSubmitted);
        for( let el in data){
            dataSubmit.append(el, data[el])
        }
        axios({
            url: '/api/update_menu_type_1',
            method: "post",
            data: dataSubmit,
        })
        .then(res => {
            update_function();
            alert('メニューを更新しました。');
            setModal(false);
        })
        .catch(errors => {
            alert('メニューの更新に失敗しました。')
        });
    }

    // 画像ファイル取得
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setFileSize(e.target.files[0].size);
    }

    return(
        <div className="m-modalEditMenu">
            <button onClick={()=>setModal(true)} className="a-btn-editMenu">
                <span><FontAwesomeIcon icon={faPen}/></span>
                <span>編集する</span>
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
                    <input type="hidden" name="bread_order" value={menu.bread_order} ref={ register }/>
                    <input type="hidden" name="uuid" value={menu.uuid} ref={ register }/>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_name" className="a-label-required__red">メニュー名</label>
                        <div className="m-storeForm__item__input">
                            <input type="text" id="bread_name" name="bread_name" defaultValue={menu.bread_name} ref={register({required: true})} />
                            {errors.bread_name && <p>メニュー名は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_kind" className="a-label-required__red">パンの種類</label>
                        <div className="m-storeForm__item__input">
                            <select name="bread_kind" id="bread_kind"  defaultValue={menu.bread_kind} ref={register({required: true})}>
                                {bread_kinds.bread_kinds.map((bread)=>(
                                    <option defaultValue={bread.name} key = {bread.id}>{bread.name}</option>
                                ))}
                            </select>
                            {errors.bread_kind && <p>パンの種類は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">    
                        <label htmlFor="bread_price">値段</label>
                        <div className="m-storeForm__item__input a-label-yen">
                            <input type="number" name="bread_price" id="bread_price" defaultValue={menu.bread_price} ref={register}/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_detail">詳細・説明</label>
                        <div className="m-storeForm__item__input">
                            <textarea
                                name="bread_detail"
                                id="bread_detail"
                                defaultValue={menu.bread_detail}
                                placeholder="50文字以内でパンの説明を記入してください。"
                                ref={register({maxLength: 50})}
                                onChange={(e)=>{setTextarea_count(e.target.value.length)}}
                            />
                            {textarea_count > 50 && <p>50文字以内で入力してください。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_img">画像アップロード</label>
                        <div className="m-storeForm__item__input">
                            <span>画像を変更したい場合のみ、アップロードしてください。</span>
                            <input name="bread_img" type="file" accept="image/*" onChange={onChangeFile}/>
                            {fileSize > 3000000 && <p>ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={null}
                            className={"full"}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Modal_editMenu;