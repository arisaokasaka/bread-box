import React from 'react';

type MenuProps = (
    {Menu: any}
);

const StoreMenu: React.FC<MenuProps> = ({Menu}) => (
    <div className = "m-menu">
        {Menu.map((el)=>(
            el.menu_type === 1 &&
            <div className = "m-menu__card">
                <img src="/images/croissant.jpg" alt="メニュー画像"/>
                <h4>{el.bread_name}</h4>
                <span>
                    <p className = "m-menu__card__kind">{el.bread_kind}</p>
                    <p className = "m-menu__card__price">{el.bread_price}円</p>
                </span>
                <p className = "m-menu__card__detail">{el.bread_detail}</p>
            </div>
        ))}
    </div>
);

export default StoreMenu;