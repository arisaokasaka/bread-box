import React, { useContext } from 'react'
import Modal_editMenu from '../../../molecules/modal/Modal_editMenu';
import Modal_confirmDelete_menu from '../../modal/Modal_confirmDeletem_menu';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';

const MenuList: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const { stateInfo } = useContext(StoreInfoContext);
    let time_current: string;
    let MenuInfo: any;
    let content: any = <p>まだ登録されていません。メニュー追加ページより、追加してください。</p>;
    
    // メニュー情報があるか判断
    if(stateInfo.menuInfo){
        MenuInfo = stateInfo.menuInfo;
        MenuInfo.map((el)=>{
            if(el.menu_type === 1){
                content = null;
                time_current = String(Date.now());
            }
        })
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
                            <Modal_confirmDelete_menu
                                menu={el}
                            />
                        </div>
                        <div className = "m-storeEdit-menuList__item__content">
                            {el.image_menu ?
                                <img
                                    src={"storage/store/" + state.uuid + "/menu/item_" + el.bread_order + ".jpg?" + time_current}
                                    alt="パンの画像"
                                />
                            : <img src="/images/no_image_menu_1.png"/>
                            }
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