import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../atoms/Searchbar'

function NavBar() {
    return (
        <div className="l-navbar">
            <div className="l-navbar__brand-logo">
                <Link to="/">パンBOX</Link>
            </div>
            <div className="l-navbar__content">
                <Searchbar />
                <nav className="l-navbar__content__nav">
                    <ul>
                        <Link to="">
                            <li>会員登録</li>
                        </Link>
                        <Link to="">
                            <li>ログイン</li>
                        </Link>
                        <Link to="">
                            <li>ゲスト</li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <button className="c-btn-menu-mobile">
                <div>
                    {/* <span>{icon_search}</span> */}
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
    )
}

export default NavBar;