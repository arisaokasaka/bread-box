import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Searchbar from '../atoms/Searchbar'
import BtnSearch_icon from '../atoms/buttons/BtnSearch_icon';
import BtnMypage_icon from '../atoms/buttons/BtnMypage';
import BtnLogin_icon from '../atoms/buttons/BtnLogin_icon';
import BtnStorePage from '../atoms/buttons/BtnStorePage';
import BtnStoreManage from '../atoms/buttons/BtnStoreManage';
import Logo from '../atoms/Logo';
import { UserAuthContext } from '../../contexts/UserAuthContext';

function NavBar() {
    const { state, dispatch } = useContext(UserAuthContext);

    useEffect(() => {
        console.log('effect-navbar')
        getUser();
    },[]
    );

    //認証ユーザー取得
    const getUser = () => {
        axios.get("/api/user").then(res => {
            console.log('[getUser]ログイン済み');
            console.log(res.data);
            if(res.data.type_user === 'user'){
                dispatch({
                    type: 'setUser',
                    payload: res.data.uuid,
                });
            }else if(res.data.type_user === 'store'){
                dispatch({
                    type: 'setStore',
                    payload: res.data.uuid,
                });
            }
        }).catch(err => {
            console.log('[getUser]ログインしてません');
        })
    }

    let navPC: any;
    let navMobile: any;
    if(state.uuid){
        navPC = (
            <nav className="l-navbar__container--pc__content__nav--loggedin">
                <BtnMypage_icon/>
                <BtnStorePage/>
                <BtnStoreManage/>
            </nav>
        );
        navMobile = (
            <nav className="l-navbar__container--mobile__nav">
                <BtnSearch_icon/>
                <BtnMypage_icon/>
                <BtnStorePage/>
                <BtnStoreManage/>
            </nav>
        );
    }else{
        navPC = (
            <nav className="l-navbar__container--pc__content__nav--loggedout">
                <ul>
                    <li>
                        <Link to="/register_user">
                            無料会員登録
                        </Link>
                    </li>
                    <li>
                        <Link to="/login_user">
                            ログイン
                        </Link>
                    </li>
                    {/* <Link to="">
                        <li>ゲスト</li>
                    </Link> */}
                </ul>
            </nav>
        );

        navMobile = (
            <nav className="l-navbar__container--mobile__nav">
                <BtnSearch_icon/>
                <BtnLogin_icon/>
            </nav>
        );
    }


    return (
        <div className="l-navbar">
            <div className="l-navbar__container--pc">
                <Logo/>
                <div className="l-navbar__container--pc__content">
                    <Searchbar
                        text = {null}
                    />
                    <div className="l-navbar__container--pc__content__nav">
                        {navPC}
                    </div>
                </div>
            </div>
            <div className="l-navbar__container--mobile">
                <Logo/>
                {navMobile}
            </div>
        </div>
    )
}

export default NavBar;