import React, { useState } from 'react';
import week from '../../info/Week';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

type WeekProps = {
    info: any
}

const Schedule: React.FC<WeekProps> = ({info}) => {
    const Week = week.week;
    const [ isHoursOpen, setHours ] = useState(false);
    let className_btn: string = "a-schedule__btn"
    let week_circles: any = null;
    let business_hours: any = null;
    let schedule: any ={
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    }

    if(info.business_day){
        schedule = JSON.parse(info.business_day);
        week_circles = (
            <div className="a-schedule__days">
                {Week.map((el)=>{
                    let check = false;
                    if(schedule[el.id]){
                        check = true;
                    }
                    return (
                        <div className="a-schedule__days__item" key={el.class}>
                            <input type="checkbox" id={el.id+"_exist"} checked={check} readOnly/>
                            <label htmlFor={el.id+"_exist"}>{el.text}</label>
                        </div>
                    );
                })}
            </div>
        );

        business_hours = (
            <div className="a-schedule__hours">
                {Week.map((el)=>{
                    let business_hour = '';
                    if(schedule[el.id]){
                        let open_time = schedule[el.id][0];
                        let close_time = schedule[el.id][1];
                        business_hour = open_time + "~" + close_time;

                        return (
                            <div className="a-schedule__hours__item" key={el.class}>
                                <label>{el.name}</label>
                                <span>{business_hour}</span>
                            </div>
                        );
                    }
                })}
            </div>
        )
    }

    const toggleHoursOpen = () => {
        if(isHoursOpen){
            setHours(false)
        }else{
            setHours(true)
        }
    }

    // ボタンの矢印の向きを変更
    if(isHoursOpen){
        className_btn = "a-schedule__btn active"
    }else{
        className_btn = "a-schedule__btn"
    }

    return (
        <div className="a-schedule">
            {week_circles}
            {week_circles && 
                <button onClick={toggleHoursOpen} className={className_btn}>
                    営業時間を見る
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            }
            {isHoursOpen && business_hours}
        </div>
    )
}

export default Schedule;