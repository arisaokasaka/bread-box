import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../atoms/Searchbar'
import BtnSearch_icon from '../atoms/buttons/BtnSearch_icon';
import BtnMypage from '../atoms/buttons/BtnMypage';
import BtnLogin_icon from '../atoms/buttons/BtnLogin_icon';
import BtnLogout_icon from '../atoms/buttons/BtnLogout_icon';
import Logo from '../atoms/Logo';

function NavBar() {
    const [user, SetUser] = useState('');

    let navPC: any;
    let navMobile: any;
    if(user){
        navPC = (
            <nav className="l-navbar__content__nav--loggedin">
                <ul>
                    <BtnMypage/>
                </ul>
            </nav>
        );
        navMobile = (
            <nav className="l-navbar__mobile">
                <BtnSearch_icon/>
                <BtnLogout_icon/>
                <BtnMypage/>
            </nav>
        );
    }else{
        navPC = (
            <nav className="l-navbar__content__nav--loggedout">
                <ul>
                    <Link to="/register_user">
                        <li>会員登録</li>
                    </Link>
                    <Link to="/login_user">
                        <li>ログイン</li>
                    </Link>
                    {/* <Link to="">
                        <li>ゲスト</li>
                    </Link> */}
                </ul>
            </nav>
        );
        navMobile = (
            <nav className="l-navbar__mobile">
                <BtnSearch_icon/>
                <BtnLogin_icon/>
            </nav>
        );
    }


    return (
        <div className="l-navbar">
            <Logo/>
            <div className="l-navbar__content">
                <Searchbar />
                <div className="l-navbar__content__nav">
                    {navPC}
                </div>
            </div>
            {navMobile}
        </div>
    )
}

export default NavBar;