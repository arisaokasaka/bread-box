import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

const EditImage: React.FC = () => {
    let errorMessage_fileSize_header: any = null;
    let errorMessage_fileSize_thumbnail: any = null;
    const { handleSubmit } = useForm();
    const { state } = useContext(UserAuthContext);
    const [ images, setImages ] = useState({
        header: null,
        thumbnail: null,
        header_size: 0,
        thumbnail_size: 0
    })

    // ファイル取得
    const onChangeHeader = (e) => {
        setImages({
            ...images,
            header: e.target.files[0],
            header_size: e.target.files[0].size
        })
    }

    const onChangeThumbnail = (e) => {
        setImages({
            ...images,
            thumbnail: e.target.files[0],
            thumbnail_size: e.target.files[0].size
        })
    }

    // ファイルサイズによるエラーメッセージ
    if(images.header_size > 3000000){
        errorMessage_fileSize_header = <p>ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。</p>
    }

    if(images.thumbnail_size > 3000000){
        errorMessage_fileSize_thumbnail = <p>ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。</p>
    }

    // 送信時の機能
    const onSubmit = () => {
        if(images.header === null && images.thumbnail === null){
            alert('画像ファイルが選択されていません。');
        }else{
            if(images.header_size <= 3000000 && images.thumbnail_size <= 3000000){
                saveImages(images.header, images.thumbnail);
            }else{
                alert('画像ファイルが上限サイズ3MBを超えているものがあります。圧縮するか、別の画像を選択してください。');
            }
        }
    }

    // 画像保存・更新
    const saveImages = (header, thumbnail) => {
        let formData = new FormData();
        formData.append('user_uuid', state.uuid);
        formData.append('img_header', header);
        formData.append('img_thumbnail', thumbnail);
        axios.post('/api/save_storeImages', formData)
        .then(res => 
            alert('画像を保存しました。是非店舗ページを見てみてください。')
        )
        .catch(err =>
            alert('画像の保存に失敗しました。')
        )
    }

    return(
        <div className = "m-storeEdit-image">
            <div className = "m-storeEdit-image__container">
                <h3>店舗画像</h3>
                <form className="m-storeEdit-image__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeForm__item">
                        <label htmlFor="store_url">ヘッダー画像</label>
                        <div className="m-storeForm__item__input">
                            <span>店舗ページの上部に表示される画像です。</span>
                            <input type="file" name="img_header" accept="image/*" onChange={(e)=>onChangeHeader(e)}/>
                            {errorMessage_fileSize_header}
                        </div>
                    </div>
                    <div className="m-storeForm__item">
                        <label htmlFor="store_url">サムネイル画像</label>
                        <div className="m-storeForm__item__input">
                            <span>検索ページのトップに表示される画像です。</span>
                            <input type="file" name="img_thumbnail" accept="image/*" onChange={(e)=>onChangeThumbnail(e)}/>
                            {errorMessage_fileSize_thumbnail}
                        </div>
                    </div>
                    <div className="m-storeEdit-image__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={null}
                            className={"full"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditImage;