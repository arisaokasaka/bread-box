import React, { useContext } from 'react'
import Modal_editMenu from '../../../molecules/modal/Modal_editMenu';
import Modal_confirmDelete_menu from '../../modal/Modal_confirmDelete_menu';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';

type Props = ({
    menuInfo: any
    update_function: Function
})

const MenuList: React.FC<Props> = ({menuInfo, update_function}) => {
    const { state } = useContext(UserAuthContext);
    let time_current: string;
    let content: any = <p>まだ登録されていません。メニュー追加ページより、追加してください。</p>;
    
    // メニュー情報があるか判断
    if(menuInfo){
        menuInfo.map((el)=>{
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
            {menuInfo.map((el)=>{
                return(
                    el.menu_type === 1 &&
                    <div className = "m-storeEdit-menuList__item" key = {el.id}>
                        <div className = "m-storeEdit-menuList__item__btn">
                            <Modal_editMenu
                                menu={el}
                                update_function={update_function}
                            />
                            <Modal_confirmDelete_menu
                                menu={el}
                                update_function={update_function}
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