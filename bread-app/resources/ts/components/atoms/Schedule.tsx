import React from 'react';

type WeekProps = {
    Week?:any;
}

const Schedule: React.FC<WeekProps> = ({Week}) => (
    <div className="a-schedule">
        {Week.map((el)=>{
            return(
            <span className = {el.class}><a>{el.text}</a></span>
            );
        })}
    </div>
)

export default Schedule;