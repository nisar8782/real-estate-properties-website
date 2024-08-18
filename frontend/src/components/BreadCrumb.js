import React from 'react'
import { Link } from 'react-router-dom'
import './BreadCrumb.css'

export default function BreadCrumb({ type, address }) {
    return (
        <nav className='my-breadcrumb' aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {type && <li className="breadcrumb-item"><Link to={`/properties/${type}`}>{type}</Link></li>}
                {type && address && <li className="breadcrumb-item"><span>{address}</span></li>}
            </ol>
        </nav>
    )
}
