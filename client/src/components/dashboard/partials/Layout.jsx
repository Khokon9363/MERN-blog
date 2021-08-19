import SidebarComponent from './SidebarComponent'
import TopbarComponent from './TopbarComponent'
import FooterComponent from './FooterComponent'

import '../../../assets/dashboard/css/sb-admin-2.min.css'
import '../../../assets/dashboard/vendor/fontawesome-free/css/all.min.css'

export default function Layout(props){
    const dynamicComponent = props.children.props.children
    
    return (
        <>
            <div>
                <div id="wrapper">
                
                <SidebarComponent />

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">

                        < TopbarComponent user={props.user} />
                            { dynamicComponent }
                        </div>
                        
                        <FooterComponent />

                    </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
            </div>
        </>
    )
}