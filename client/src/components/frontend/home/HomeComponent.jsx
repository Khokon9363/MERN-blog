import { useEffect } from "react"
import Helper from '../../../Helpers/Helper'
import HeaderComponent from '../partials/HeaderComponent'
import SliderComponent from "./includes/SliderComponent"
import BlogsComponent from "./includes/BlogsComponent"
import FooterComponent from "../partials/FooterComponent"

export default function HomeComponent(){
    useEffect(() => {
        Helper.setTitle('Home')
    }, [])
    return (
        <>
            <HeaderComponent />
            <SliderComponent />
            <BlogsComponent />
            <FooterComponent />
        </>
    )
}