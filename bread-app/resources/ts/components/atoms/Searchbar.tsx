import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../contexts/UserAuthContext';

type TextProps = ({
    text: any;
})

const Searchbar: React.FC<TextProps> = ({text}) => {
    const { state } = useContext(UserAuthContext);
    const [ keyword, Setkeyword ] = useState('');
    const onChangeKeyword = e => {
        Setkeyword(e.target.value);
    }

    const onClick_deleteValue = () => {
        Setkeyword('');
    }

    return (
        <div className="a-bar-search">
            <input type="text" placeholder="キーワードから探す"
                value={keyword}
                onChange = {onChangeKeyword}
            />
            {text && 
                <Link to={{
                    pathname: '/search',
                    search: '?key=' + keyword + '&id=' + state.uuid
                    }}
                    onClick = {onClick_deleteValue}
                >
                    <FontAwesomeIcon icon={faSearch}/><span>検索</span>
                </Link>}
            {text === null &&
                <Link to={{
                    pathname: '/search',
                    search: '?key=' + keyword + '&id=' + state.uuid
                    }}
                    onClick = {onClick_deleteValue}
                >
                    <FontAwesomeIcon icon={faSearch}/>
                </Link>}
        </div>
    )
}

export default Searchbar;