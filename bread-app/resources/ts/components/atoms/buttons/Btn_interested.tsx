import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlag} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

export default function Btn_interested() {
    const { state } = useContext(UserAuthContext);
    const history = useHistory();

    let BtnInterested: any;
    if(state.uuid && state.auth==="user"){
        BtnInterested = (
            <div className="a-btn-interested">
                <input type="checkbox" id={"checkin_"+"store_uuid"} defaultChecked={false}/>
                <label htmlFor={"checkin_"+"store_uuid"}><FontAwesomeIcon icon={faFlag}/></label>
            </div> 
        );
    }else if(state.uuid && state.auth==="store"){
        BtnInterested = null;
    }else{
        BtnInterested = (
            <div className="a-btn-interested" onClick={()=>history.push("/login_user")}>
                <input type="checkbox" id={"checkin_"+"store_uuid"}/>
                <label htmlFor={"checkin_"+"store_uuid"}><FontAwesomeIcon icon={faFlag}/></label>
            </div>
        );
    }

    return (
        <div>
            {BtnInterested}
        </div>
    )
}
