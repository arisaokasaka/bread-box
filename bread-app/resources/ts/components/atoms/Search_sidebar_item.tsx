import React from 'react';

type Props = {
    sectionTitle?: string;
    sectionContent? :any;
}

const Search_sidebar_item : React.FC<Props> = ({sectionTitle, sectionContent}) => (
    <div className="a-search-sidebar-item">
        <label>{sectionTitle}</label>
        <ul>
            {sectionContent.map(
                (el)=>{
                    return (<li><input type="checkbox" value={el.name} key={el.id}/><a>{el.name}</a></li>);
                })}
        </ul>
    </div>
);

export default Search_sidebar_item;