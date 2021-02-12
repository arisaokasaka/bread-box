import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

type TextProps = ({
    text: any;
})

const Searchbar: React.FC<TextProps> = ({text}) => {
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
            {text && <Link to={"/search/" + keyword }><span>検索</span></Link>}
            {text === null && <Link to={"/search"}><FontAwesomeIcon icon={faSearch}/></Link>}
        </div>
    )
}

export default Searchbar;