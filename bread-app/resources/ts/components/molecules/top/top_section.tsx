import React from 'react';

type Props = {
    sectionTitle?: string;
    sectionClass?: string;
    sectionContent? :any;
}

const Top_section: React.FC<Props> = ({sectionClass, sectionTitle, sectionContent}) => (
    <div className={sectionClass}>
        <h2>{sectionTitle}</h2>
        <ul>
            {sectionContent.map(
                (el)=>{
                    return (<li><input type="text" value={el}/></li>);
                })}
        </ul>
    </div>
);

export default Top_section;