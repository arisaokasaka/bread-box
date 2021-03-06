import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPen } from "@fortawesome/free-solid-svg-icons";
import BtnSave from "../../atoms/buttons/BtnSave";

type infoProps = ({
    SpiritInfo: any,
    btnName: string,
    funcType: string,
    menuType: number,
    update_function: Function
})

const Modal_editSpirit: React.FC<infoProps> = ({SpiritInfo, btnName, funcType, menuType, update_function}) =>{
    let placeText: string;
    let defaultContent: string;
    let spirit_uuid: string = '';
    const [ textarea_count, setTextarea_count ] = useState(0);
    const { register, handleSubmit, errors } = useForm();
    const { state } = useContext(UserAuthContext);
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
                spirit_uuid = '';
            }else{
                defaultContent = SpiritInfo.advantage;
                spirit_uuid = SpiritInfo.uuid;
            }
            break;
        case 3: 
            placeText = 'お店やパンに込められている思いを教えてください。';
            if(SpiritInfo === undefined || null){
                defaultContent = '';
                spirit_uuid = '';
            }else{
                defaultContent = SpiritInfo.spirit;
                spirit_uuid = SpiritInfo.uuid;
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

            updates(formData, image.image);

        }else{
            alert('ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。');
        }
    }

    const updates = (data, file) => {
        data.append('img_spirit', file);
        axios.post("api/update_spirit_advantage", data)
        .then(res=>{
            update_function();
            alert('登録しました。');
            setModal(false);
        })        
        .catch(err=>
            alert('登録に失敗しました。')
        )
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
                    <input type="hidden" name="menu_type" value={menuType} ref={register}/>
                    <input type="hidden" name="uuid" value={spirit_uuid} ref={register}/>
                    <div className="m-modalEditSpirit__form__item">
                        <label htmlFor="img_spirit">画像を選択</label>
                        {funcType === 'edit' && <span>新しい画像に変える場合のみ、選択してください。</span>}
                        <input
                            type="file"
                            accept="image/*"
                            name="img_spirit"
                            onChange={(e)=>onChangeImage(e)}
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