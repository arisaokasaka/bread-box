import React from 'react';
import { Link } from 'react-router-dom';
// import icon_search from "../../../../public/images/bakery2.jpg";
import icon_search from "../../../image/search-icon.jpg";

function NavBar() {
    return (
        <div className="l-navbar">
            <div className="l-navbar__brand-logo">
                <Link to="/"><a>パンBOX</a></Link>
            </div>
            <div className="l-navbar__content">
                <div className="c-bar-search">
                        <input type="text" placeholder="キーワードから探す" />
                        <input type="submit" value="検索" />
                </div>
                <nav className="l-navbar__content__nav">
                    <ul>
                        <Link to="">
                            <li><a>会員登録</a></li>
                        </Link>
                        <Link to="">
                            <li><a>ログイン</a></li>
                        </Link>
                        <Link to="">
                            <li><a>ゲスト</a></li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <button className="c-btn-menu-mobile">
                <a>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </button>
        </div>
    )
}

export default NavBar;