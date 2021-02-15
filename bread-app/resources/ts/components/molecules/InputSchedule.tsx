import React, { useState } from 'react';
import week from '../../info/Week';

const InputSchedule: React.FC = () => {
    const Week = week.week;

    // 営業日がチェック（クリック）されたら、その曜日の営業時間を表示する
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
                return(
                <div className = "m-inputSchedule__week__day" key={day.id}>
                    {/* 営業日入力 */}
                    <div className = "m-inputSchedule__week__day__heading">
                        <input type="checkbox" id={day.id+"_checked"}/>
                        <label htmlFor={day.id+"_checked"} onClick={()=>toggleClass(day.class)}>{day.name}</label>
                    </div>
                    {/* 営業時間入力 */}
                    <div className = {"m-inputSchedule__week__day__hours " + day.class} >
                        <input type="time" name={day.id+"_open"} className={day.id+"_open"}/>
                        <span>&nbsp;～&nbsp;</span>
                        <input type="time" name={day.id+"_close"} className={day.id+"_close"}/>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default InputSchedule;