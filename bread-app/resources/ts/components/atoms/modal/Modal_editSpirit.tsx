import React,{useState} from 'react';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faPen} from "@fortawesome/free-solid-svg-icons";
import BtnSave from "../../atoms/buttons/BtnSave";

type kindProps = ({
    kind?: string,
})

const Modal_editSpirit: React.FC<kindProps> = ({kind}) =>{
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
    
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = () => {
        console.log();
    }

    return(
        <div className = "m-modalEditSpirit">
            <button className="m-modalEditSpirit__btn--edit" onClick={()=>setModal(true)}>
                <FontAwesomeIcon icon={faPen}/>
                編集する
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
                    <div className="m-modalEditSpirit__form__item">
                        <label htmlFor="img_spirit" className="a-label-required">画像</label>
                        <input type="file" name="img" id="img" ref={register({required: true})}/>
                        {errors.img && <p>画像は必須です。</p>}
                    </div>

                    {kind==="spirit" && 
                    <div className="m-modalEditSpirit__form__item">
                        <label htmlFor="spirit" className="a-label-required">内容</label>
                        <textarea name="spirit" id="spirit" rows={4} ref={register({required: true})}/>
                        {errors.spirit && <p>内容は必須です。</p>}
                    </div>}

                    {kind==="advantage" && 
                    <div className="m-modalEditSpirit__form__item">
                        <label htmlFor="advantage" className="a-label-required">内容</label>
                        <textarea name="advantage" id="advantage" rows={4} ref={register({required: true})}/>
                        {errors.advantage && <p>内容は必須です。</p>}
                    </div>}

                    <div className="m-modalEditSpirit__form__btn">
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

export default Modal_editSpirit;