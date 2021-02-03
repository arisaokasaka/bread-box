import React from 'react'
import StoreEditTable_menuCreate from './StoreEditTable_menuCreate';
import StoreEditTable_menuList from './StoreEditTable_menuList';

type MenuProps = ({
    MenuInfo: Array<any>;
});

const StoreEditTable_menu: React.FC<MenuProps> = ({MenuInfo}) => {
    return(
        <div className = "m-storeEdit-menu">
            <StoreEditTable_menuCreate/>
            <StoreEditTable_menuList
                MenuInfo = {MenuInfo}
            />
        </div>
    );
}

export default StoreEditTable_menu;