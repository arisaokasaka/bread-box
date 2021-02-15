import React from 'react'
import Modal_editMenu from '../../../atoms/modal/Modal_editMenu';
import Modal_confirmDelete from '../../../atoms/modal/Modal_confirmDelete';

type MenuProps = ({
    MenuInfo: Array<any>;
});

const MenuList: React.FC<MenuProps> = ({MenuInfo}) => {
    return(
        <div className = "m-storeEdit-menuList">
            <h3>メニュー一覧</h3>
            {MenuInfo.map((el)=>{
                return(
                    // menu_type1：パンのメニュー, menu_type2：店のこだわり, menu_type3：店の思い
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
                            <img src="/images/croissant.jpg" alt="パンの画像"/>
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