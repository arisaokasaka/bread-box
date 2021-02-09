import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Searchbar from '../atoms/Searchbar'
import BtnSearch_icon from '../atoms/buttons/BtnSearch_icon';
import BtnMypage from '../atoms/buttons/BtnMypage';
import BtnLogin_icon from '../atoms/buttons/BtnLogin_icon';
import Logo from '../atoms/Logo';
import { UserAuthContext } from '../../contexts/UserAuthContext';

function NavBar() {
    const { state, dispatch } = useContext(UserAuthContext);

    useEffect(() => {
        console.log('effect')
        getUser();
    },[]
    );

     //認証ユーザー取得
     const getUser = () => {
        axios.get("/api/user").then(res => {
            console.log('[getUser]ログイン済み');
            console.log(res.data);
            dispatch({
                type: 'setUser',
                payload: res.data.uuid,
            });
        }).catch(err => {
            console.log('[getUser]ログインしてません');
        })
    }

    let navPC: any;
    let navMobile: any;
    if(state.uuid){
        navPC = (
            <nav className="l-navbar__content__nav--loggedin">
                <BtnMypage/>
            </nav>
        );
        navMobile = (
            <nav className="l-navbar__mobile">
                <BtnSearch_icon/>
                <BtnMypage/>
            </nav>
        );
    }else{
        navPC = (
            <nav className="l-navbar__content__nav--loggedout">
                <ul>
                    <Link to="/register_user">
                        <li>無料会員登録</li>
                    </Link>
                    <Link to="/login_user">
                        <li>ログイン</li>
                    </Link>
                    {/* <Link to="">
                        <li>ゲスト</li>
                    </Link> */}
                </ul>
            </nav>
        );
        navMobile = (
            <nav className="l-navbar__mobile">
                <BtnSearch_icon/>
                <BtnLogin_icon/>
            </nav>
        );
    }


    return (
        <div className="l-navbar">
            <Logo/>
            <div className="l-navbar__content">
                <Searchbar />
                <div className="l-navbar__content__nav">
                    {navPC}
                </div>
            </div>
            {navMobile}
        </div>
    )
}

export default NavBar;