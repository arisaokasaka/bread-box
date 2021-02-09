import React from 'react';

type Props = {
    key?: string;
    sectionTitle?: string;
    sectionContent? :any;
}

const Top_section: React.FC<Props> = ({sectionTitle, sectionContent}) => (
    <div>
        <h2>{sectionTitle}</h2>
        <ul>
            {sectionContent.map(
                (el)=>{
                    return (<li><input type="text" key={el.key+el.id} value={el.name}/></li>);
                })}
        </ul>
    </div>
);

export default Top_section;