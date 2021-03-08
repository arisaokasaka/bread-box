import React from 'react';
import StoreEditTable from '../../molecules/storeEdit/StoreEditTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';

const StoreEdit: React.FC = () => {
    return(
        <div className = "p-store-edit">
            <div className = "p-store-edit__container">
                <div className = "p-store-edit__container__title">
                    <h2><FontAwesomeIcon icon={faStore}/>店舗管理</h2>
                </div>
                <div className = "p-store-edit__container__table">
                    <StoreEditTable/>
                </div>
            </div>
        </div>
    );
}

export default StoreEdit;