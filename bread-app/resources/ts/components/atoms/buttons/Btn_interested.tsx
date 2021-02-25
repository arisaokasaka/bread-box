import React, { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type InfoProps = ({
    store_uuid: string
    allInfo?: any
    index?: any
    interested_checked?: any
})

const Btn_interested: React.FC<InfoProps> = ({store_uuid, allInfo, interested_checked, index}) => {
    const { state } = useContext(UserAuthContext);
    const history = useHistory();
    let BtnInterested: any;
    let info: any;
    
    if(allInfo){
        info = allInfo
        interested_checked = info.interested_checked
    }else{
        if(!interested_checked){
            interested_checked = false
        }
    }

    const update_interested = () => {
        let data = new FormData;
        data.append('uuid', state.uuid);
        data.append('store_uuid', store_uuid);
        axios.post('/api/update_interested', data);
    }

    if(state.uuid && state.auth==="user"){
        BtnInterested = (
            <div className="a-btn-interested">
                <input type="checkbox" id={"BtnInterested_" + index} defaultChecked={interested_checked} onClick={update_interested}/>
                <label htmlFor={"BtnInterested_" + index}><FontAwesomeIcon icon={faFlag}/></label>
            </div> 
        );
    }else if(state.uuid && state.auth==="store"){
        BtnInterested = null;
    }else{
        BtnInterested = (
            <div className="a-btn-interested" onClick={()=>history.push("/login_user")}>
                <input type="checkbox" id={"BtnInterested_" + index}/>
                <label htmlFor={"BtnInterested_" + index}><FontAwesomeIcon icon={faFlag}/></label>
            </div>
        );
    }

    return (
        <div>
            {BtnInterested}
        </div>
    )
}

export default Btn_interested;