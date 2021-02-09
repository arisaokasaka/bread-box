import React from 'react';
import UserTable from '../../molecules/user/UserTable';
import UserProf from '../../molecules/user/UserProf';

const testInfo = [{
    uuid: '234567890-',
    name: 'ありんこ',
    email: 'email@email',
    password: 'ariari',
    address: '呉服町駅',
    favorite: {},
    interested: {},   
}]

const UserPage:any = ({UserInfo}) => {
    UserInfo = testInfo;
    return(
        <div className = "p-user">
            <div className = "p-user__container">
                <UserTable
                    UserInfo = {UserInfo}
                />
                <UserProf
                    UserInfo = {UserInfo}
                />
            </div>
        </div>
    );
}

export default UserPage;