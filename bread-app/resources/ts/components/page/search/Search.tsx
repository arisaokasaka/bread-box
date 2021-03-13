import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faChevronUp, faCrown, faStore, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import Search_sidebar from '../../molecules/search/Search_sidebar';
import Store_pickup from '../../molecules/common/Store_pickup';
import StoreList from '../../molecules/common/StoreList';
import BtnBack from '../../atoms/buttons/BtnBack';

const Search: React.FC = () => {
    const history = useHistory();
    const [ mobileMenu, setMobileMenu ] = useState(false);
    const [ stores, setStores ] = useState([]);
    const [ sort, setSort ] = useState('default')

    useEffect(()=>{
        getStores()
    },[])

    const getStores = () => {
        axios.get('/api/search_store'+ history['location']['search'])
        .then(res => {
            setStores(res.data)
        })    
    }

    // 並び替え
    const changeSorting = (sort_type) => {
        let newArray: any;
        switch (sort_type) {
            case 'score_descend':
                newArray = stores.sort((el1, el2) => {
                    if (el1['scoreInfo']['score'] < el2['scoreInfo']['score']) {
                        return 1;
                    }
                    if (el1['scoreInfo']['score'] > el2['scoreInfo']['score']) {
                        return -1;
                    }
                    return 0;
                });
            break;
            case 'review_descend':
                newArray = stores.sort((el1, el2) => {
                    if (el1['scoreInfo']['count'] < el2['scoreInfo']['count']) {
                        return 1;
                    }
                    if (el1['scoreInfo']['count'] > el2['scoreInfo']['count']) {
                        return -1;
                    }
                    return 0;
                })
            break;
            case 'default':
                newArray = stores.sort((el1, el2) => {
                    if (el1['user_uuid'] > el2['user_uuid']) {
                        return 1;
                    }
                    if (el1['user_uuid'] < el2['user_uuid']) {
                        return -1;
                    }
                    return 0;
                })
            break;
        }
        setSort(sort_type);
        setStores(newArray);
    }

    // 並び替えボタンのタブ
    const Tab = (sort_name) => {
        let className = "p-search__container__content__tab" + sort_name;
        let button_value: string = "";
        let fontawesome_icon: any;
        switch(sort_name){
            case 'default':
                button_value = "標準"
                fontawesome_icon = faStore
                break;
            case 'score_descend':
                button_value = "評価が高い順"
                fontawesome_icon = faCrown
                break;
            case 'review_descend':
                button_value = "口コミ数順"
                fontawesome_icon = faCommentDots
                break;
        }
        if(sort === sort_name){
            className += ' selected';
        }
        return <button className={className} onClick={()=>changeSorting(sort_name)}><FontAwesomeIcon icon={fontawesome_icon}/>{button_value}</button>
    }

    return (
        <div className="p-search" id="search_top">
            {mobileMenu && 
                <div className="p-search__mobile">
                    <div className="p-search__mobile__btn">
                        <BtnBack
                            click_function={()=>setMobileMenu(false)}
                        />
                    </div>
                    <Search_sidebar
                        click_function = {getStores}
                        mobileMenuClose_function={()=>setMobileMenu(false)}
                    />
                </div>
            }
            <div className="a-btn-modificate">
                <button onClick={()=>setMobileMenu(true)}><span><FontAwesomeIcon icon={faEdit}/>&nbsp;検索条件変更</span></button>
            </div>
            <div className = "p-search__container">
                <Search_sidebar
                    click_function = {getStores}
                />
                <div className="p-search__container__content">
                    <Store_pickup />
                    <div className="p-search__container__content__tab">
                        {Tab('default')}
                        {Tab('score_descend')}
                        {Tab('review_descend')}
                    </div>
                    <div className="p-search__container__content__list">
                    {stores[0] === undefined && <p className="p-search__container__content__list__noMessage">該当する店舗がありません。</p>}
                        <StoreList
                            storeList = {stores}
                            sortType = {sort}
                        />
                    </div>
                </div>
            </div>
            <div className="p-search__pageup">
                <a href="#search_top"><FontAwesomeIcon icon={faChevronUp}/></a>
            </div>
        </div>
    );
}

export default Search;