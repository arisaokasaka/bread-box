import React, { useState } from 'react'

export default function Store_contents() {
    const [table, setTable] = useState('menu');

    function handleMenu(){
        setTable('menu');
    }

    function handleStamp(){
        setTable('table');
    }

    function handleSpirit(){
        setTable('spirit')
    }

    const CurrentTable = (table) =>{
        if(table === "menu"){
            return (<h2>menu</h2>);
        }else if(table === "stamp"){
            return (<h2>stamp</h2>);
        }else if(table === "spirit"){
            return(<h2>spirit</h2>);
        }
    }

    return (
        <div className = "m-store-contents">
            <div className = "m-store-contents__tab">
                <input type="text" value = "メニュー" onClick = {handleMenu}/>
                <input type="text" value = "スタンプカード" onClick = {handleStamp}/>
                <input type="text" value = "お店のこだわり・思い" onClick = {handleSpirit}/>
            </div>
            <div className = "m-store-contents__container">
                <div className = "m-store-contents__container__table">
                    {CurrentTable(table)}
                </div>
            </div>
        </div>
    );
}
