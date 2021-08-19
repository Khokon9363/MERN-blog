import { useEffect } from "react"
import Helper from '../../../Helpers/Helper'

export default function DashboardComponent(){
    useEffect(() => {
        Helper.setTitle('Dashboard')
    })
    return(
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Dashboard Component</h1>
        </div>
    )
}