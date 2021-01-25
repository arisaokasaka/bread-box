import React from 'react';
import districts from '../common/Districts';
import bread_kinds from '../common/Bread_kinds';
import days from '../common/Days';
import Top_section from '../common/top/top_section';
import Store_pickup from '../common/Store_pickup';

let img_bakery1 = require('../../../image/bakery2.jpg');


function Top() {

    return (
    <div className="p-top">
        <div className="p-top__hero">
            <div className="p-top__hero__content">
                <h1>お気に入りのパン屋さんを<br></br>見つける、つながる</h1>
                <div className="c-bar-search">
                    <input type="text" placeholder="キーワードから探す" />
                    <input type="submit" value="検索" />
                </div>
            </div>
        </div>
        <main className="p-top__content">
            <Top_section 
            sectionClass="p-top__content__section--area"
            sectionTitle="エリアから探す"
            sectionContent={districts.districts}
            />
            <Top_section 
            sectionClass="p-top__content__section--bread"
            sectionTitle="パンの種類から探す"
            sectionContent={bread_kinds.bread_kinds}
            />
            <Top_section 
            sectionClass="p-top__content__section--time"
            sectionTitle="営業日から探す"
            sectionContent={days.days}
            />
            <Store_pickup 
            Pickup={{
                'img': img_bakery1,
                'name': "ありパン"
            }}
            />
            <section className="p-top__content__section">
                <h2>アクセス数ランキング</h2>
                <ul>
                    <li className="c-store-pickup__el">
                        <img src={img_bakery1}></img>
                        <p>ありありパン</p>
                    </li>
                </ul>
            </section>
        </main>
        <footer className="p-top__footer">
            <ul>
                <li><a href="">事業主の方はこちら</a></li>
                <li><a href="">会社概要</a></li>
            </ul>
        </footer>
    </div>
    );
    
}

export default Top;