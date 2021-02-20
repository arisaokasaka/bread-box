import React from 'react';
import week from '../../info/Week';

type DefaultProps = ({
    Info: any;
})

const InputSchedule: React.FC<DefaultProps> = ({Info}) => {
    const Week = week.week;
    let defaultData: any;

    // 営業日・営業時間情報のJSONをObjectに変換
    if(Info.business_day){
        defaultData = JSON.parse(Info.business_day);
    }

    // 既に保存されている営業時間を挿入する
    const defaultHour = (day, int) => {
        switch(day){
            case 'monday':
                if(defaultData.monday){
                    return defaultData.monday[int];
                }
                break;
            case 'tuesday':
                if(defaultData.tuesday){
                    return defaultData.tuesday[int];
                }
                break;
            case 'wednesday':
                if(defaultData.wednesday){
                    return defaultData.wednesday[int];
                }
                break;
            case 'thursday':
                if(defaultData.thursday){
                    return defaultData.thursday[int];
                }
                break;
            case 'friday':
                if(defaultData.friday){
                    return defaultData.friday[int];
                }
                break;
            case 'saturday':
                if(defaultData.saturday){
                    return defaultData.saturday[int];
                }
                break;
            case 'sunday':
                if(defaultData.sunday){
                    return defaultData.sunday[int];
                }
                break;
        }
    }

    // 営業時間の表示・非表示切り替え（activeクラスで管理）
    const toggleClass = (targetClass) => {
        let classInfo = document.getElementsByClassName(targetClass)[0];
        if(classInfo.className.includes('active')){
            classInfo.classList.remove('active');
        } else {
            classInfo.className += ' active';
        }
    }

    return(
        <div className = "m-inputSchedule__week">
            {Week.map((day)=>{

                // 既に営業時間が入力されていた場合、デフォルトで営業時間表示（activeクラス付与）
                let defaultActiveClass: string;
                if(defaultData[day.id]){
                    defaultActiveClass = " active"
                }else{
                    defaultActiveClass = ""
                }

                return(
                    <div className = "m-inputSchedule__week__day" key={day.id+"__schedule"}>
                        {/* 営業日入力 */}
                        <div className = "m-inputSchedule__week__day__heading">
                            <input
                                type="checkbox"
                                id={day.id+"_checked"}
                                defaultChecked={defaultData[day.id] ? true : false}
                            />
                            <label htmlFor={day.id+"_checked"} onClick={()=>toggleClass(day.class)}>{day.name}</label>
                        </div>
                        {/* 営業時間入力 */}
                        <div className = {"m-inputSchedule__week__day__hours " + day.class + defaultActiveClass} >
                            <input
                                type="time"
                                name={day.id+"_open"}
                                className={day.id+"_open"}
                                defaultValue={defaultHour(day.id, 0)}
                            />
                            <span>&nbsp;～&nbsp;</span>
                            <input
                                type="time"
                                name={day.id+"_close"}
                                className={day.id+"_close"}
                                defaultValue={defaultHour(day.id, 1)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default InputSchedule;