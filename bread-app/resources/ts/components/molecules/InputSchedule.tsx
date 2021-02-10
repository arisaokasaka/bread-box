import React, {useState} from 'react';
import week from '../../info/Week';

type ScheduleProps = ({
    Week?: any;
})

const InputSchedule: React.FC<ScheduleProps> = ({Week}) => {
    Week = week.week;

    const [businessHours, SetBusinessHours] = useState({
        monday_open: null,
        monday_close: null,
        tuesday_open: null,
        tuesday_close: null,
        wednesday_open: null,
        wednesday_close: null,
        thursday_open: null,
        thursday_close: null,
        friday_open: null,
        friday_close: null,
        saturday_open: null,
        saturday_close: null,
        sunday_open: null,
        sunday_close: null,
    })

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
                        <input type="time" name={day.id+"_open"}
                        onChange = {(el) => SetBusinessHours({...businessHours, [el.target.name]: el.target.value})}
                        />
                        <span>&nbsp;～&nbsp;</span>
                        <input type="time" name={day.id+"_close"}
                        onChange = {(el) => SetBusinessHours({...businessHours, [el.target.name]: el.target.value})}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InputSchedule;