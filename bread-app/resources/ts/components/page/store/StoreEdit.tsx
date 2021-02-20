import React, { useContext, useReducer } from 'react';
import BtnBack from '../../atoms/buttons/BtnBack';
import StoreEditTable from '../../molecules/storeEdit/StoreEditTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { StoreInfoReducer, initialState } from '../../../reducers/StoreInfoReducer';
import { StoreInfoContext } from '../../../contexts/StoreInfoContext';

const StoreEdit: React.FC = () => {
    const [ stateInfo, dispatch] = useReducer(StoreInfoReducer, initialState);

    return(
        <div className = "p-store-edit">
            <div className = "p-store-edit__container">
                <StoreInfoContext.Provider value={{ stateInfo, dispatch }}>
                    {/* <div className = "p-store-edit__container__btn">
                        <BtnBack
                            URL = '/store'
                        />
                    </div> */}
                    <div className = "p-store-edit__container__title">
                        <h2><FontAwesomeIcon icon={faStore}/>店舗管理</h2>
                    </div>
                    <div className = "p-store-edit__container__table">
                        <StoreEditTable />
                    </div>
                </StoreInfoContext.Provider>
            </div>
        </div>
    );
}

export default StoreEdit;