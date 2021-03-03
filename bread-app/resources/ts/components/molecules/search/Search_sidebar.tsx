import React, { useState, useContext } from 'react';
import districts from '../../../info/Districts';
import bread_kinds from '../../../info/Bread_kinds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBreadSlice, faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { useHistory } from 'react-router-dom';

type Props = ({
    click_function?: any
})

const Search_sidebar: React.FC<Props> = ({click_function}) => {
    const history = useHistory();
    const [ keyword, Setkeyword ] = useState('');
    const { state } = useContext(UserAuthContext);
    const [ condition, setCondition ] = useState({
        district: '',
        bread_kind: ''
    })

    const search_url = () => {
        let url = '/search?id=' + state.uuid + (keyword ? "&key=" + keyword : '') + (condition.district ? "&di=" + condition.district : '') + (condition.bread_kind ? "&bk=" + condition.bread_kind : '');
        history.push(url);
        click_function();
    }

    const onChangeKeyword = e => {
        Setkeyword(e.target.value);
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

    return (
        <div className="m-search-sidebar">
            <div className="m-search-sidebar__item">
                <h4><FontAwesomeIcon icon={faSearch}/>キーワードから探す</h4>
                <input
                    type="text"
                    placeholder="例:あんパン、店名"
                    value={keyword}
                    onChange = {onChangeKeyword}/>
            </div>
            <div className="m-search-sidebar__item">
                <h4><FontAwesomeIcon icon={faMapMarkerAlt}/>エリアから探す</h4>
                <ul>
                    {districts.districts.map((el)=>{
                        return (
                            <li key={"sidebar"+el.id}>
                                <input id={el.id} name={el.id} className="m-search-sidebar__item__district" type="checkbox" value={el.name} onClick={sum_district}/>
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
                        return (
                            <li key={"sidebar"+el.id}>
                                <input id={el.id} className="m-search-sidebar__item__bread" type="checkbox" value={el.name} onClick={sum_bread_kind}/>
                                <label htmlFor={el.id}>{el.name}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <input onClick={search_url} className="m-search-sidebar__btn" value="絞り込む" readOnly/>
        </div>
    )
}

export default Search_sidebar;