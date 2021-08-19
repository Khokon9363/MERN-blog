import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotFoundComponent from './components/errors/NotFoundComponent'
import HomeComponent from './components/frontend/home/HomeComponent'
import LoginComponent from './components/auth/LoginComponent'
import RegisterComponent from './components/auth/RegisterComponent'
import LayoutMergerComponent from './components/dashboard/LayoutMergerComponent'

export default function App(){
    return(
        <Router>
            <h1 id="toaster"></h1>
            <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route exact path="/auth/login" component={LoginComponent} />
                <Route exact path="/auth/register" component={RegisterComponent} />
                <Route exact path="/dashboard/:ops1?/:ops2?" component={LayoutMergerComponent} />
                <Route component={NotFoundComponent} />
            </Switch>
        </Router>
    )
}