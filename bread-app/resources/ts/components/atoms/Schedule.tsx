import React from 'react';

type WeekProps = {
    WeekClass? : string;
    WeekDay? : any;
}

const Schedule: React.FC<WeekProps> = ({WeekDay}) => (
    <div className="c-week">
        {/* {WeekDay.map(
            (el)=>{
            return(<span>{el}</span>);
            })} */}
    </div>
)

export default Schedule;