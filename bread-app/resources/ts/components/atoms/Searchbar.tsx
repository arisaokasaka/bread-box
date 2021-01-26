import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function Searchbar() {
    const [keyword, Setkeyword] = useState('');
    
    const onChangeKeyword = e => {
        Setkeyword(e.target.value);
    }
    return (
        <div className="a-bar-search">
            <input type="text" placeholder="キーワードから探す"
                value={keyword}
                onChange = {onChangeKeyword}
            />
            <Link to={"/search/" + keyword }><span>検索</span></Link>
        </div>
    )
}
