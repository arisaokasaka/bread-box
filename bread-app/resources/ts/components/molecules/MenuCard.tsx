import React from 'react';

type MenuProps = (
    {Menu: any}
);

const MenuCard: React.FC<MenuProps> = ({Menu}) => (
    <div className = "m-menu-card">
        {Menu.map((el)=>(
            <div className = "m-menu-card__container">
            <img src="" alt="メニュー画像"/>
            <h4>{el.bread_name}</h4>
            <p className = "m-menu-card__container__price">{el.bread_price}円</p>
            <p className = "m-menu-card__container__detail">{el.bread_detail}</p>
        </div>
        ))}
    </div>
);

export default MenuCard;