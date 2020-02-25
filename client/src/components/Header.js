import React from 'react'
import PrivateRoute from './PrivateRoute'
import { Link, Switch } from 'react-router-dom'


function Header() {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <Link to="/">
                            <button onClick={() => localStorage.clear()}>
                                Logout
                                </button>
                        </Link>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header