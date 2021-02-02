import React from 'react'

type MenuProps = ({
    MenuInfo: Array<any>;
});


const StoreEditTable_menuList: React.FC<MenuProps> = ({MenuInfo}) => {
    return(
        <div className = "m-storeEdit-menu-list">
            {
                MenuInfo.map((el)=>{
                    return(
                        el.menu_type === 1 &&
                        <div className = "m-storeEdit-menu-list__item">
                            <div className = "m-storeEdit-menu-list__item__btn">
                                <button>編集する</button>
                                <button>削除する</button>
                            </div>
                            <div className = "m-storeEdit-menu-list__item__content">
                                <img src="" alt="パンの画像"/>
                                <div className = "m-storeEdit-menu-list__item__content__text">
                                    <h4>{el.bread_name}</h4>
                                    <span>{el.bread_price}円</span><a>{el.bread_kind}</a>
                                    <p>{el.bread_detail}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default StoreEditTable_menuList;