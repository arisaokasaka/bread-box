import React from 'react';
import StoreList from '../store/StoreList';

type FavoriteProps = ({
    StoreInfo?: any;
});

const UserTable_favorite: React.FC<FavoriteProps> = ({StoreInfo}) => {
    return(
        <div className = "m-userTable-favorite">
            <StoreList
            StoreInfo = {StoreInfo}/>
        </div>
    );
}

export default UserTable_favorite;