import React from 'react';

type SpiritProps = ({
    Spirit: Array<any>
});

const StoreSpirit: React.FC<SpiritProps> = ({Spirit}) => {
    let content: any = <p>準備中です。</p>
    
    Spirit.map((el) => {
        if(el.menu_type === 2){
            content = null;
        }
    })
    
    return(
        <div className = "m-spirit">
            {content}
            {Spirit.map((el)=>(
                <div className = "m-spirit__container" key={"spirit_"+el.id}>
                    {el.menu_type === 2 &&
                        <div className = "m-spirit__container__section">
                            <h3>お店のこだわり</h3>
                            {el.image_advantage ? 
                                <div className = "m-spirit__container__section__content">
                                    {el.image_advantage && <img src={"/storage/store/" + el.store_uuid + "/menu/advantage.jpg"} alt="こだわりの写真"/>}
                                    <p>{el.advantage}</p>
                                </div>
                            :
                                <div className = "m-spirit__container__section__content noImage">
                                    <p>{el.advantage}</p>
                                </div>
                            }
                        </div>
                    }
                    {el.menu_type === 3 && 
                        <div className = "m-spirit__container__section">
                            <h3>お店の思い</h3>
                            {el.image_spirit ? 
                                <div className = "m-spirit__container__section__content">
                                    {el.image_spirit && <img src={"/storage/store/" + el.store_uuid + "/menu/spirit.jpg"} alt="思いが伝わる写真"/>}
                                    <p>{el.spirit}</p>
                                </div>
                            :
                                <div className = "m-spirit__container__section__content noImage">
                                    <p>{el.spirit}</p>
                                </div>
                            }
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default StoreSpirit;