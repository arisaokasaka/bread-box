import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type Props = ({
    uuid: string
})

const BtnStoreEdit: React.FC<Props> = ({uuid}) => {
    const { state } = useContext(UserAuthContext);
    let BtnStoreEdit: any;
    if(state.uuid && state.uuid === uuid){
        BtnStoreEdit = (
            <Link to="/store_edit" className = "a-btn-storeEdit">
                <span><FontAwesomeIcon icon={faPen}/></span>
                <span>店舗情報を編集する</span>
            </Link>
        );
    }else{
        BtnStoreEdit = null;
    }

    return (
        <div>
            {BtnStoreEdit}
        </div>
    )
}

export default BtnStoreEdit;