import React from 'react';
import UserTable from '../../molecules/user/UserTable';
import UserProf from '../../molecules/user/UserProf';

const UserPage: React.FC = () => {
    return(
        <div className = "p-user">
            <div className = "p-user__container">
                <UserTable />
                <UserProf />
            </div>
        </div>
    );
}

export default UserPage;