import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../atoms/Searchbar'
import BtnSearch_icon from '../atoms/buttons/BtnSearch_icon';
import BtnMypage from '../atoms/buttons/BtnMypage';
import Logo from '../atoms/Logo';

function NavBar() {
    return (
        <div className="l-navbar">
            <Logo/>
            <div className="l-navbar__content">
                <Searchbar />
                <nav className="l-navbar__content__nav">
                    <ul>
                        <Link to="/register_user">
                            <li>会員登録</li>
                        </Link>
                        <Link to="/login_user">
                            <li>ログイン</li>
                        </Link>
                        <Link to="">
                            <li>ゲスト</li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <nav className="l-navbar__mobile">
                <BtnSearch_icon/>
                <BtnMypage/>
            </nav>
        </div>
    )
}

export default NavBar;