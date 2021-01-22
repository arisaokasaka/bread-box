import React from 'react';
function Top() {
        return (
        <div className="top">
            <div className="top__hero">
                <div className="top__hero__content">
                    <h1>お気に入りのパン屋さんを<br></br>見つける、つながる</h1>
                    <div className="top__hero__content__search">
                        <ul>
                            <li><input type="text" placeholder="エリア：中央区、博多区" /></li>
                            <li><input type="text" placeholder="パンの種類" /></li>
                            <li><input type="text" placeholder="営業日・時間" /></li>
                        </ul>
                        <input type="submit" value="検索" />
                    </div>
                </div>
            </div>
            <main className="top__content">
                <section className="top__content__section">
                    <h2>エリアから探す</h2>
                    <ul>
                        <li><a href=""></a></li>
                    </ul>
                </section>
                <section className="top__content__section">
                    <h2>パンの種類から探す</h2>
                    <ul>
                        <li><a href=""></a></li>
                    </ul>
                </section>
                <section className="top__content__section">
                    <h2>営業日・営業時間から探す</h2>
                    <ul>
                        <li><a href=""></a></li>
                    </ul>
                </section>
                <section className="top__content__section">
                    <h2>ピックアップ</h2>
                </section>
                <section className="top__content__section">
                    <h2>アクセス数ランキング</h2>
                </section>
            </main>
            <footer className="top__footer">
                <ul>
                    <li><a href="">事業主の方はこちら</a></li>
                    <li><a href="">会社概要</a></li>
                    <li><a href="">お問合せ</a></li>
                </ul>
            </footer>
        </div>
        );
    
}

export default Top;