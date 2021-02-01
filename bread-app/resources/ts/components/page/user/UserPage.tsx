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


type UserProps = ({
    UserInfo: any;
});

const UserPage: React.FC<UserProps> = ({UserInfo}) => {
    return(
        <div className = "p-user">
            <div className = "p-user__container">
                <UserTable
                    UserInfo = {testInfo}
                />
                <UserProf
                    UserInfo = {testInfo}
                />
            </div>
        </div>
    );
}

export default UserPage;