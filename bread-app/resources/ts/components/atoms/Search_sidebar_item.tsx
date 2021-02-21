import React from 'react';

type Props = {
    sectionTitle?: string;
    sectionContent? :any;
}

const Search_sidebar_item : React.FC<Props> = ({sectionTitle, sectionContent}) => (
    <div className="a-search-sidebar-item">
        <h4>{sectionTitle}</h4>
        <ul>
            {sectionContent.map(
                (el)=>{
                    return (
                    <li key={"sidebar"+el.id}>
                        <input id={el.id} type="checkbox" value={el.name}/>
                        <label htmlFor={el.id}>{el.name}</label>
                    </li>
                    );
                })}
        </ul>
    </div>
);

export default Search_sidebar_item;