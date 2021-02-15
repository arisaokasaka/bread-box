import React from 'react';
import week from '../../info/Week';

const InputSchedule: React.FC = () => {
    const Week = week.week;
    
    return(
        <div className = "m-inputSchedule__week">
            {Week.map((day)=>(
                <div className = "m-inputSchedule__week__day" key={day.id}>
                    <div className = "m-inputSchedule__week__day__heading">
                        <input type="checkbox" id={day.id+"_checked"}/>
                        <label htmlFor={day.id+"_checked"}>{day.name}</label>
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