import React, {useState} from 'react';
import week from '../../info/Week';

type ScheduleProps = ({
    Week?: any;
})

const InputSchedule: React.FC<ScheduleProps> = ({Week}) => {
    Week = week.week;

    const handleClick = (targetClass) => {
        let classInfo = document.getElementsByClassName(targetClass);
        let classInfoArray = Array.from(classInfo);
        classInfoArray.forEach(el => {
            if(el.className.includes('active')) {
                el.classList.remove('active') 
            } else {
                el.className += ' active';
            }
        });
    }
    
    return(
        <div className = "m-inputSchedule__week">
            {Week.map((day)=>(
                <div className = "m-inputSchedule__week__day" key={day.id}>
                    <div className = "m-inputSchedule__week__day__heading">
                        <label htmlFor={day.id}>{day.name}</label>
                        <div className = {"m-inputSchedule__week__day__heading__btn " + day.class} onClick={()=>handleClick(day.class)}>
                            <span></span>
                        </div>
                    </div>
                    <div className = {"m-inputSchedule__week__day__hours " + day.class} >
                        <input type="time" name={day.id+"_open"} className={day.id+"_open"}/>
                        <span>&nbsp;～&nbsp;</span>
                        <input type="time" name={day.id+"_close"} className={day.id+"_close"}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InputSchedule;