import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import districts from '../../../info/Districts';
import bread_kinds from '../../../info/Bread_kinds';
import days from '../../../info/Days';
import Searchbar from '../../atoms/Searchbar';
import Top_section from '../../molecules/top/top_section';
import Store_pickup from '../../molecules/Store_pickup';
import StoreRanking from '../../molecules/top/StoreRanking';

const Top: React.FC = () => {
    return (
        <div className="p-top">
            <div className="p-top__hero">
                <div className="p-top__hero__content">
                    <h1>お気に入りのパン屋さんを<br></br>見つける、つながる</h1>
                    <Searchbar
                        text = {'検索'}
                    />
                </div>
            </div>
            <main className="p-top__content">
                <Top_section 
                key="content"
                sectionTitle="エリアから探す"
                sectionContent={districts.districts}
                />
                <Top_section 
                key="kind"
                sectionTitle="パンの種類から探す"
                sectionContent={bread_kinds.bread_kinds}
                />
                {/* <Top_section 
                key="day"
                sectionTitle="営業日から探す"
                sectionContent={days.days}
                /> */}
                <Store_pickup />
                <StoreRanking />
            </main>
            <footer className="p-top__footer">
                <Link to="/register_store">事業主の方はこちら</Link>
            </footer>
        </div>
    );
}

export default Top;