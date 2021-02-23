import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import districts from '../../../info/Districts';
import bread_kinds from '../../../info/Bread_kinds';

const Search_sidebar: React.FC = () => {
    const [ condition, setCondition ] = useState({
        district: '',
        bread_kind: ''
    })
    
    const sum_district = () => {
        let info: string = '&di=';
        districts.districts.map((el)=>{
            let checkbox = document.getElementById(el.id) as HTMLInputElement;
            if(checkbox.checked){
                info = info + checkbox.value + '|';
            }
        })
        setCondition({
            ...condition,
            district: info
        })
    }

    const sum_bread_kind = () => {
        let info: string = '&br=';
        bread_kinds.bread_kinds.map((el)=>{
            let checkbox = document.getElementById(el.id) as HTMLInputElement;
            if(checkbox.checked){
                info = info + checkbox.value + '|';
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
                <h4>キーワードから探す</h4>
                <input type="text" placeholder="例:あんパン、店名"/>
            </div>
            <div className="m-search-sidebar__item">
                <h4>エリアから探す</h4>
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
                <h4>パンの種類から探す</h4>
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
            <Link to = {{
                pathname: '/search/',
                search: condition.district + condition.bread_kind
                }}
                className="m-search-sidebar__btn"
            >
                絞り込む
            </Link>
        </div>
    )
}

export default Search_sidebar;