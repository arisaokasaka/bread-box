import React from 'react';
import Search_sidebar from '../../molecules/search/Search_sidebar';
import BtnBack from '../../atoms/buttons/BtnBack';

export default function Search_input_mobile() {
    return (
        <div className="p-search-input-mobile">
            <div className="p-search-input-mobile__btn">
                <BtnBack/>
            </div>
            <Search_sidebar/>
        </div>
    )
}
