import React from 'react';
import StoreList from '../store/StoreList';

type InterestedProps = ({
    StoreInfo?: any;
});

const UserTable_interested: React.FC<InterestedProps> = ({StoreInfo}) => {
    return(
        <div className = "m-userTable-interested">
            <StoreList
            StoreInfo = {StoreInfo}/>
        </div>
    );
}

export default UserTable_interested;