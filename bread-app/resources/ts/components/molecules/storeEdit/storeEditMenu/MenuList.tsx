import React, { useContext } from 'react'
import Modal_editMenu from '../../../atoms/modal/Modal_editMenu';
import Modal_confirmDelete from '../../../atoms/modal/Modal_confirmDelete';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';

const MenuList: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const { stateInfo } = useContext(StoreInfoContext);
    let MenuInfo: any;
    let content: any;
    let menuItem: HTMLCollection = document.getElementsByClassName('m-storeEdit-menuList__item');

    // メニュー情報があるか判断
    if(stateInfo.menuInfo){
        MenuInfo = stateInfo.menuInfo;
    }else{
        content = <p>まだ登録されていません。メニュー追加ページより、メニューを追加してください。</p>
    }

    // 表示するメニューが無い時に表示するもの
    if(menuItem[0] === null || undefined){
        content = <p>まだ登録されていません。メニュー追加ページより、メニューを追加してください。</p>
    }else{
        content = null;
    }

    return(
        <div className = "m-storeEdit-menuList">
            <h3>メニュー一覧</h3>
            {content}
            {MenuInfo.map((el)=>{
                return(
                    el.menu_type === 1 &&
                    <div className = "m-storeEdit-menuList__item" key = {el.id}>
                        <div className = "m-storeEdit-menuList__item__btn">
                            <Modal_editMenu
                                menu={el}
                            />
                            <Modal_confirmDelete
                                menu={el}
                            />
                        </div>
                        <div className = "m-storeEdit-menuList__item__content">
                            <img
                                src={"storage/store/" + state.uuid + "/menu/item_" + el.bread_order + ".jpg"}
                                alt="パンの画像"
                            />
                            <div className = "m-storeEdit-menuList__item__content__text">
                                <h4>{el.bread_name}</h4>
                                {el.bread_price && <span>{el.bread_price}円</span>}<a>{el.bread_kind}</a>
                                <p>{el.bread_detail}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MenuList;