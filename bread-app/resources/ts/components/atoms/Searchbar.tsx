import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../contexts/UserAuthContext';

type TextProps = ({
    text: any;
})

const Searchbar: React.FC<TextProps> = ({text}) => {
    const { state } = useContext(UserAuthContext);
    const [ keyword, Setkeyword ] = useState('');
    const history = useHistory();
    const onChangeKeyword = e => {
        Setkeyword(e.target.value);
    }

    const onClick_deleteValue = () => {
        Setkeyword('');
    }

    const pressKeyboard = (e) => {
        if(e.which === 13){
            history.push('/search?id=' + state.uuid + (keyword ? "&key=" + keyword : ''))
        }
    }

    return (
        <div className="a-bar-search">
            <input type="text" placeholder="キーワードから探す"
                value={keyword}
                onChange = {onChangeKeyword}
                onKeyPress={(e)=>pressKeyboard(e)}
            />
            {text && 
                <Link to={{
                    pathname: '/search',
                    search: '?id=' + state.uuid + (keyword ? "&key=" + keyword : '')
                    }}
                    onClick = {onClick_deleteValue}
                >
                    <FontAwesomeIcon icon={faSearch}/><span>検索</span>
                </Link>}
            {text === null &&
                <Link to={{
                    pathname: '/search',
                    search: '?id=' + state.uuid + (keyword ? "&key=" + keyword : '')
                    }}
                    onClick = {onClick_deleteValue}
                >
                    <FontAwesomeIcon icon={faSearch}/>
                </Link>}
        </div>
    )
}

export default Searchbar;