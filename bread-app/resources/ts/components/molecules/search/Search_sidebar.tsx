import React, { useState, useContext, useEffect } from 'react';
import districts from '../../../info/Districts';
import bread_kinds from '../../../info/Bread_kinds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBreadSlice, faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { useLocation, useHistory } from 'react-router-dom';

type Props = ({
    click_function: Function
    mobileMenuClose_function?: Function
})

const Search_sidebar: React.FC<Props> = ({click_function, mobileMenuClose_function}) => {
    let default_keyword: string = '';
    let search_params: string = decodeURI(useLocation().search);
    const history = useHistory();
    const [ keyword, setKeyword ] = useState('');
    const { state } = useContext(UserAuthContext);
    const [ condition, setCondition ] = useState({
        district: '',
        bread_kind: ''
    })

    useEffect(()=>{
        getKeywordFromURL();
    },[])

    // キーワード検索された場合、検索バーにそのキーワードを配置
    const getKeywordFromURL = () => {
        if(search_params.match("&key=")){
            let index_key_end: number;
            let index_key = search_params.indexOf("&key=") + 5;
            if(search_params.indexOf("&", index_key) !== -1) {
                index_key_end = search_params.indexOf("&", index_key);
                default_keyword = search_params.substr(index_key, index_key_end - index_key);
            } else {
                index_key_end = search_params.length - index_key;
                default_keyword = search_params.substr(index_key, index_key_end + index_key);
            }
            setKeyword(default_keyword);
        }
    }

    const search_url = () => {
        let url = '/search?id=' + state.uuid + (keyword ? "&key=" + keyword : '') + (condition.district ? "&di=" + condition.district : '') + (condition.bread_kind ? "&bk=" + condition.bread_kind : '');
        history.push(url);
        mobileMenuClose_function && mobileMenuClose_function();
        click_function();
    }

    const onChangeKeyword = e => {
        setKeyword(e.target.value);
    }
    
    const sum_district = () => {
        let info: string = '';
        districts.districts.map((el)=>{
            let checkbox = document.getElementById(el.id) as HTMLInputElement;
            if(checkbox.checked){
                info = info + checkbox.value + '-';
            }
        })
        setCondition({
            ...condition,
            district: info
        })
    }

    const sum_bread_kind = () => {
        let info: string = '';
        bread_kinds.bread_kinds.map((el)=>{
            let checkbox = document.getElementById(el.id) as HTMLInputElement;
            if(checkbox.checked){
                info = info + checkbox.value + '-';
            }
        })
        setCondition({
            ...condition,
            bread_kind: info
        })
    }

    const reset = () => {
        districts.districts.map((el)=>{
            let checkbox = document.getElementById(el.id) as HTMLInputElement;
            checkbox.checked = false;
        })

        bread_kinds.bread_kinds.map((el)=>{
            let checkbox = document.getElementById(el.id) as HTMLInputElement;
            checkbox.checked = false;
        })

        history.push("/search?id=" + state.uuid);
        click_function();
    }

    return (
        <div className="m-search-sidebar">
            <div className="m-search-sidebar__item">
                <h4><FontAwesomeIcon icon={faSearch}/>キーワードから探す</h4>
                <input
                    type="text"
                    placeholder="例:あんパン、店名"
                    value={keyword}
                    onChange={onChangeKeyword}
                />
            </div>
            <div className="m-search-sidebar__item">
                <h4><FontAwesomeIcon icon={faMapMarkerAlt}/>エリアから探す</h4>
                <ul>
                    {districts.districts.map((el)=>{
                        let check: boolean = false;
                        if(search_params.match(el.name)) {
                            check = true;
                        }
                        return (
                            <li key={"sidebar"+el.id}>
                                <input type="checkbox" id={el.id} name="checkbox_district" className="m-search-sidebar__item__district" defaultChecked={check} value={el.name} onClick={sum_district}/>
                                <label htmlFor={el.id}>{el.name}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="m-search-sidebar__item">
                <h4><FontAwesomeIcon icon={faBreadSlice}/>パンの種類から探す</h4>
                <ul>
                    {bread_kinds.bread_kinds.map((el)=>{
                        let check: boolean = false;
                        if(search_params.match(el.name)) {
                            check = true;
                        }
                        return (
                            <li key={"sidebar"+el.id}>
                                <input type="checkbox" id={el.id} name="checkbox_bread_kind" className="m-search-sidebar__item__bread" defaultChecked={check} value={el.name} onClick={sum_bread_kind}/>
                                <label htmlFor={el.id}>{el.name}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <input onClick={search_url} className="m-search-sidebar__btn--search" value="絞り込む" readOnly/>
            <input onClick={reset} className="m-search-sidebar__btn--reset" value="検索内容をリセット" readOnly/>
        </div>
    )
}

export default Search_sidebar;