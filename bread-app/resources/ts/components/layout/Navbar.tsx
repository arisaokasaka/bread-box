import React from 'react';
import { Link } from 'react-router-dom';
// import icon_search from "../../../image/search-icon.jpg";

function NavBar() {
    return (
        <div className="l-navbar">
            <div className="l-navbar__brand-logo">
                <Link to="/">パンBOX</Link>
            </div>
            <div className="l-navbar__content">
                <div className="c-bar-search">
                        <input type="text" placeholder="キーワードから探す" />
                        <input type="submit" value="検索" />
                </div>
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