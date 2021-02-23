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
                    return (
                    <li key={'section_' + el.id}>
                        <input type="text" value={el.name} readOnly/>
                    </li>);
                })}
        </ul>
    </div>
);

export default Top_section;