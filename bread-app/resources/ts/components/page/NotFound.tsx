import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {

    return (
        <div className = "p-notFound">
            <h2>404</h2>
            <p>お探しのページは見つかりませんでした。</p>
            <span>トップページに<Link to="/">戻る</Link></span>
        </div>
    )
}

export default NotFound;