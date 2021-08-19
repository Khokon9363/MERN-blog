import { useEffect } from "react"
import { Link } from 'react-router-dom'
import Helper from '../../Helpers/Helper'

export default function NotFoundComponent(){
    useEffect(() => {
        Helper.setTitle('Not found')
    }, [])
    return (
        <>
            <style>
                {`
                    .navbar, .navbar-nav{
                        display: none;
                    }
                `}
            </style>
            <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
                <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center" style={{marginRight: '10px'}}>404</h1>
                <h3>|</h3>
                <div className="inline-block align-middle" style={{marginLeft: '10px'}}>
                    <h2>The page you requested was not found.</h2>
                </div>
            </div>
            <div className="text-center">
                <Link to="/">Back to home</Link>
            </div>
        </>
    )
}