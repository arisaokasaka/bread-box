import React from 'react';
import NavBar from '../layout/Navbar';

function Top() {
    return (
    <div className="top__container">
        <div className="top__container__hero">
            <h1>お気に入りのパン屋さんを</h1>
            <h1>見つける、つながる</h1>
            <img src="" alt="" />
            <div className="top__container__hero__search">
                <ul>
                    <li><input type="text" placeholder="エリア：中央区、博多区" /></li>
                    <li><input type="text" placeholder="パンの種類" /></li>
                    <li><input type="text" placeholder="営業日・時間" /></li>
                </ul>
                <input type="submit" value="検索" />
            </div>
        </div>
    </div>
    );
}

export default Top;