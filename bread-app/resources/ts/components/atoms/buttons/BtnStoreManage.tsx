import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const BtnStoreManage: React.FC = () => {
    const { state } = useContext(UserAuthContext);

    return (
        <div className = "a-btn-storeManage">
            {state.auth === "store" &&
                <Link to={"/store_edit"}>
                    <FontAwesomeIcon icon={faCog}/>
                    <span>管理画面</span>
                </Link>
            }
        </div>
    )
}

export default BtnStoreManage;