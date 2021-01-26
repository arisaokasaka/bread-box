import React from 'react'
import { Link } from 'react-router-dom';
import districts from '../../info/Districts';
import bread_kinds from '../../info/Bread_kinds';
import days from '../../info/Days';
import hours from '../../info/Hours';
import Searchbar from '../atoms/Searchbar';
import Search_sidebar_item from '../atoms/Search_sidebar_item';


export default function Search_sidebar() {
    return (
        <div className="m-search-sidebar">
            <Searchbar/>
            <Search_sidebar_item
            sectionTitle="エリアから探す"
            sectionContent={districts.districts}
            />
            <Search_sidebar_item
            sectionTitle="パンの種類から探す"
            sectionContent={bread_kinds.bread_kinds}
            />
            <Search_sidebar_item
            sectionTitle="営業日から探す"
            sectionContent={days.days}
            />
            <Search_sidebar_item
            sectionTitle="営業時間から探す"
            sectionContent={hours.hours}
            />
            <Link to='/search' className="m-search-sidebar__btn">絞り込む</Link>
        </div>
    )
}