import React from 'react'
import {Link} from 'react-router-dom'

export default function Logo() {
    return (
        <div className="a-logo">
            <img src="/images/logo.png" alt="ロゴ"/>
            <Link to="/">
                パンBOX
            </Link>
        </div>
    )
}
