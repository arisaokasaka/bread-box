import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type Props = {
    key?: string;
    sectionTitle?: string;
    sectionContent? :any;
}

const Top_section: React.FC<Props> = ({sectionTitle, sectionContent}) => {
    const { state } = useContext(UserAuthContext);

    return (
        <div className = "m-top-section">
            <h2>{sectionTitle}</h2>
            <ul>
                {sectionContent.map(
                    (el)=>{
                        return (
                        <li key={'section_' + el.id}>
                            <Link to={{
                                pathname: '/search',
                                search: '?key=' + el.name + '&id=' + state.uuid
                                }}
                            >
                            {el.name}
                            </Link>
                        </li>);
                    })}
            </ul>
        </div>
    )
}

export default Top_section;