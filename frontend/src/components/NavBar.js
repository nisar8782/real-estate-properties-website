

import classes from './NavBar.module.css'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { useState } from 'react';

export default function NavBar() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    // const accessToken = localStorage.getItem('access_token')

    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: [username],
    //     queryFn: ({ signal }) => fetchAgentDetails({ signal, username }),
    //     enabled: username !== '',
    //     refetchOnWindowFocus: false,
    // });
    // console.log(accessToken)

    const location = useLocation()
    let classNames;
    if (location.pathname === '/') {
        classNames = classes.header + ' ' + classes.position
    } else {
        classNames = classes.header + ' ' + classes['custom-background']
    }
    async function HandleLogout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setAccessToken(null)

    }


    return (
        <header className={classNames}>
            <div className={classes.nav}>
                {/* <h1 className={classes.logo}>
                    <NavLink to='/' className={(isActive) => isActive ? classes.active : undefined}>Home</NavLink>
                </h1> */}
                {/* <nav>
                    <ul className={classes['nav-list']}>
                        <li className={classes["nav-item"]}>
                            <NavLink to='properties/sale' className={(isActive) => isActive ? classes.active : undefined}>Sale
                            </NavLink>
                        </li>
                        <li className={classes["nav-item"]}>
                            <NavLink to='properties/rent' className={(isActive) => isActive ? classes.active : undefined}>Rent
                            </NavLink>
                        </li>
                        <li className={classes["nav-item"]}>
                            <NavLink to='properties/sold' className={(isActive) => isActive ? classes.active : undefined}>Sold
                            </NavLink>
                        </li>
                        {!accessToken && <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>}


                        {accessToken && <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/profile">View Profile</NavLink></li>
                                {accessToken && <button onClick={HandleLogout}>Logout</button>}

                            </ul>
                        </li>}


                    </ul>
                </nav> */}
                <Link className="navbar-brand text-light fs-3" to="/">Home</Link>
                <nav className="navbar navbar-expand-lg ms-auto">
                    {/* <div className="container-fluid"> */}

                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-light"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to='properties/sale'>Sale</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to='properties/rent'>Rent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to='properties/sold'>Sold</Link>
                            </li>
                            {!accessToken && <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/login">Login</Link>
                            </li>}
                            {accessToken && <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                    <li><Link className="dropdown-item" onClick={HandleLogout}>Logout</Link></li>
                                </ul>
                            </li>}

                        </ul>

                    </div>
                    {/* </div> */}
                </nav>
            </div>
        </header>
    )
}
