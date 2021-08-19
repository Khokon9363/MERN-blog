import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Helper from '../../../Helpers/Helper'

export default function HeaderComponent() {
    const [user, setUser] = useState(null)

    const logout = () => {
        if(confirm('Are you sure to log out ?')){
            Helper.removeUserAndToken()
            setUser(Helper.getUserAndToken())
            Helper.Toaster('Logged out successfully !', 'danger')
        }
    }

    useEffect(() => {
        setUser(Helper.getUserAndToken())
    }, [])
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>
                            <div className="collapse navbar-collapse" id="navbarToggler">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/">Home</Link>
                                    </li>
                                    { !(user && user.token) &&
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/auth/login">Login</Link>
                                        </li>
                                    }
                                    { !(user && user.token) &&
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/auth/register">Register</Link>
                                        </li>
                                    }
                                    { (user && user.token) &&
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                                        </li>
                                    }
                                    { (user && user.token) &&
                                    <li className="nav-item" onClick={logout}>
                                        <a className="nav-link active logout">Logout</a>
                                    </li>
                                    }
                                </ul>
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}