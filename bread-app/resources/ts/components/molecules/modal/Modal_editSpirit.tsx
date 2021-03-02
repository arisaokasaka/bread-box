import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../contexts/StoreInfoContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPen } from "@fortawesome/free-solid-svg-icons";
import BtnSave from "../../atoms/buttons/BtnSave";

type infoProps = ({
    SpiritInfo: any,
    btnName: string,
    funcType: string,
    menuType: number,
})

const Modal_editSpirit: React.FC<infoProps> = ({SpiritInfo, btnName, funcType, menuType}) =>{
    let placeText: string;
    let defaultContent: string;
    const [ textarea_count, setTextarea_count ] = useState(0);
    const { register, handleSubmit, errors } = useForm();
    const { state } = useContext(UserAuthContext);
    const { dispatch } = useContext(StoreInfoContext);
    const [ modalIsOpen, setModal ] = useState(false);
    const [ image, setImage ] = useState({
        image: null,
        image_size: 0
    })
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
    
    // メニュータイプによってplaceholderとdefaultvalueを変更
    switch(menuType){
        case 2:
            placeText = 'お店のこだわりポイントを記載してください。';
            if(SpiritInfo === undefined || null){
                defaultContent = '';
            }else{
                defaultContent = SpiritInfo.advantage;
            }
            break;
        case 3: 
            placeText = 'お店やパンに込められている思いを教えてください。';
            if(SpiritInfo === undefined || null){
                defaultContent = '';
            }else{
                defaultContent = SpiritInfo.spirit;
            }
            break;
        default:
            placeText = ''
            defaultContent = ''
    }

    const onChangeImage = (e) => {
        setImage({
            ...image,
            image: e.target.files[0],
            image_size: e.target.files[0].size
        })
    }
    
    // 送信時
    const onSubmit = (data) => {
        if(image.image_size <= 3000000){
            let formData = new FormData();
            formData.append('store_uuid', state.uuid);

            switch(menuType){
                case 2: 
                    formData.append('advantage', data['content']);
                break;
                case 3:
                    formData.append('spirit', data['content']);  
                break;
            }

            for( let el in data){
                formData.append(el, data[el])
            }

            switch(funcType){
                case 'create':
                    createSpirit(formData, image.image);
                break;
                case 'edit':
                    updateSpirit(formData, image.image);
                break;
            }
        }else{
            alert('ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。');
        }
    }
    // 新規作成機能
    const createSpirit = (data, file) => {
        data.append('img_spirit', file);
        axios.post("/api/create_spirit", data)
        .then(res=>{
            getMenuInfo();
            alert('登録しました。');
            setModal(false);
        })        
        .catch(err=>
            alert('登録に失敗しました。')
        )
    }

    // 更新機能
    const updateSpirit = (data, file) => {
        data.append('img_spirit', file);
        axios.post("/api/update_spirit", data)
        .then(res=>{
            getMenuInfo();
            alert('保存しました。');
            setModal(false);
        })        
        .catch(err=>
            alert('保存に失敗しました。')
        )
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
        <div className = "m-modalEditSpirit">
            <button className="m-modalEditSpirit__btn--edit" onClick={()=>setModal(true)}>
                <FontAwesomeIcon icon={faPen}/>
                {btnName}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>setModal(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className = "m-modalEditSpirit__btn--close">
                    <button onClick={()=>setModal(false)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <form className="m-modalEditSpirit__form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="funcType" value={funcType} ref={register}/>
                    <input type="hidden" name="menu_type" value={menuType} ref={register}/>
                    <div className="m-modalEditSpirit__form__item">
                        <label htmlFor="img_spirit">画像を選択</label>
                        {funcType === 'edit' && <span>新しい画像に変える場合のみ、選択してください。</span>}
                        <input
                            type="file"
                            accept="image/*"
                            name="img_spirit"
                            onChange={onChangeImage}
                        />
                        {image.image_size > 3000000 && <p>ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。</p>}
                    </div>
                    
                    <div className="m-modalEditSpirit__form__item">
                        <label htmlFor="content" className="a-label-required__red--fitContent">内容</label>
                        <textarea
                            name="content"
                            placeholder={placeText}
                            defaultValue={defaultContent}
                            ref={register({required: true, maxLength: 255})}
                            onChange={(e)=>{setTextarea_count(e.target.value.length)}}
                        />
                        {errors.content && <p>内容は必須です。</p>}
                        {textarea_count > 255 && <p>255文字以内で入力してください。</p>}
                    </div>
                    <div className="m-modalEditSpirit__form__btn">
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

export default Modal_editSpirit;