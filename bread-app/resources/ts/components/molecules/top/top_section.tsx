import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type Props = {
    kind: string;
    sectionTitle?: string;
    sectionContent? :any;
}

const Top_section: React.FC<Props> = ({kind, sectionTitle, sectionContent}) => {
    const { state } = useContext(UserAuthContext);

    return (
        <div className = "m-top-section">
            <h2>{sectionTitle}</h2>
            <ul>
                {sectionContent.map(
                    (el)=>{
                        return (
                        <li key={'section_' + el.id}>
                            {kind==="district" &&
                                <Link to={{
                                    pathname: '/search',
                                    search: '?id=' + state.uuid + '&di=' + el.name
                                    }}
                                >
                                {el.name}
                                </Link>
                            }
                            {kind==="bread_kind" &&
                                <Link to={{
                                    pathname: '/search',
                                    search: '?id=' + state.uuid + '&bk=' + el.name
                                    }}
                                >
                                {el.name}
                                </Link>
                            }
                        </li>);
                    })}
            </ul>
        </div>
    )
}

export default Top_section;