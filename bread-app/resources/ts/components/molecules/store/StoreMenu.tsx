import React from 'react';

type MenuProps = ({
    Menu: Array<any>
})

const StoreMenu: React.FC<MenuProps> = ({Menu}) => {
    let content: any = <p>準備中です。</p>;
    
    if(Menu){
        Menu.map((el) => {
            if(el.menu_type === 1){
                content = null;
            }
        })
    }

    return(
        <div className = "m-menu">
            {content}
            {Menu.map((el)=>(
                el.menu_type === 1 &&
                <div className = "m-menu__card" key={"menu_"+el.id}>
                    <img src={"/storage/store/" + el.store_uuid + "/menu/item_" + el.bread_order + ".jpg"} alt="メニュー画像"/>
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
}

export default StoreMenu;