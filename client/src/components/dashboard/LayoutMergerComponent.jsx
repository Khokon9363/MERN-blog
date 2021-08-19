import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Helper from '../../Helpers/Helper'
import Layout from './partials/Layout'
import DashboardComponent from './pages/DashboardComponent'
import ProfileComponent from './pages/ProfileComponent'
import NotFoundComponent from '../errors/NotFoundComponent'
import AddSliderComponent from './pages/Slider/AddSliderComponent'
import SlidersComponent from './pages/Slider/SlidersComponent'
import AddCategoryComponent from './pages/Category/AddCategoryComponent'
import CategoriesComponent from './pages/Category/CategoriesComponent'
import AddBlogComponent from './pages/Blog/AddBlogComponent'
import BlogsComponent from './pages/Blog/BlogsComponent'

export default function LayoutMergerComponent (){
    const [user, setUser] = useState(Helper.getUserAndToken())

    const history = useHistory()

    const setLayoutUser = () => {
        setUser(Helper.getUserAndToken())
    }

    useEffect(() => {
        if(!user || !user.token) history.push('/auth/login')
        if(user.role !== 'Admin') history.push('/')
    }, [user])
    return (
        <>
            <Layout user={user}>
                <Router>
                    <Switch>
                        <Route exact path="/dashboard" component={DashboardComponent} />
                        <Route exact path="/dashboard/profile">
                            <ProfileComponent setLayoutUser={setLayoutUser} />
                        </Route>
                        <Route exact path="/dashboard/add-slider" component={AddSliderComponent} />
                        <Route exact path="/dashboard/edit-slider/:id" component={AddSliderComponent} />
                        <Route exact path="/dashboard/sliders" component={SlidersComponent} />
                        <Route exact path="/dashboard/add-category" component={AddCategoryComponent} />
                        <Route exact path="/dashboard/categories" component={CategoriesComponent} />
                        <Route exact path="/dashboard/add-blog" component={AddBlogComponent} />
                        <Route exact path="/dashboard/blogs" component={BlogsComponent} />
                        <Route component={NotFoundComponent} />
                    </Switch>
                </Router>
            </Layout>
        </>
    )
}