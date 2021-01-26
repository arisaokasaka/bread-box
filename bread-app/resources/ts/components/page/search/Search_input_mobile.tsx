import React from 'react'
import { Link } from 'react-router-dom';
import Search_sidebar from '../../molecules/Search_sidebar';

export default function Search_input_mobile() {
    return (
        <div className="p-search-input-mobile">
            <Link to='/search' className="p-search-input-mobile__back">検索画面に戻る</Link>
            <Search_sidebar/>
        </div>
    )
}
