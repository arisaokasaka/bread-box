import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    key?: string;
    sectionTitle?: string;
    sectionContent? :any;
}

const Top_section: React.FC<Props> = ({sectionTitle, sectionContent}) => (
    <div className = "m-top-section">
        <h2>{sectionTitle}</h2>
        <ul>
            {sectionContent.map(
                (el)=>{
                    return (
                    <li key={'section_' + el.id}>
                        <Link to={{
                            pathname: '/search/',
                            search: '?key=' + el.name
                            }}
                        >
                        {el.name}
                        </Link>
                    </li>);
                })}
        </ul>
    </div>
);

export default Top_section;