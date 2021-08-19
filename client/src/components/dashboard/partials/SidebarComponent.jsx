import { NavLink as Link } from 'react-router-dom'

function toggleMenu(target) {
    document.querySelector(`.${target}`).classList.toggle('toggled')
}

function toggleCategory(el, target) {
    expandAll()
    document.querySelector(`.${el}`).classList.toggle('collapsed')
    document.querySelector(`.${target}`).classList.toggle('show')
}

function expandAll() {
    document.querySelectorAll('.collapse').forEach((item) => {
        item.classList.remove('show')
    })
}

export default function SidebarComponent() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion accordion-sidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">{process.env.REACT_APP_NAME}</div>
            </Link>
            <li className="nav-item active">
                <Link className="nav-link" onClick={expandAll} to="/dashboard">
                    <i className="fas fa-fw fa-folder" />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className="nav-item active">
                <a className="nav-link slider" onClick={ () => toggleCategory('slider', 'collapse-slider') }>
                    <i className="fas fa-fw fa-folder" />
                    <span>Slider</span>
                </a>
                <div className="collapse collapse-slider">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Slider :</h6>
                        <Link activeStyle={{color: '#4e73df', fontWeight: '700'}} className="collapse-item" to="/dashboard/add-slider">Add slider</Link>
                        <Link activeStyle={{color: '#4e73df', fontWeight: '700'}} className="collapse-item" to="/dashboard/sliders">Sliders</Link>
                    </div>
                </div>
            </li>
            <li className="nav-item active">
                <a className="nav-link category" onClick={ () => toggleCategory('category', 'collapse-category') }>
                    <i className="fas fa-fw fa-folder" />
                    <span>Category</span>
                </a>
                <div className="collapse collapse-category">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Category :</h6>
                        <Link activeStyle={{color: '#4e73df', fontWeight: '700'}} className="collapse-item" to="/dashboard/add-category">Add category</Link>
                        <Link activeStyle={{color: '#4e73df', fontWeight: '700'}} className="collapse-item" to="/dashboard/categories">Categories</Link>
                    </div>
                </div>
            </li>
            <li className="nav-item active">
                <a className="nav-link blog" onClick={ () => toggleCategory('blog', 'collapse-blog') }>
                    <i className="fas fa-fw fa-folder" />
                    <span>Blog</span>
                </a>
                <div className="collapse collapse-blog">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Blog :</h6>
                        <Link activeStyle={{color: '#4e73df', fontWeight: '700'}} className="collapse-item" to="/dashboard/add-blog">Add blog</Link>
                        <Link activeStyle={{color: '#4e73df', fontWeight: '700'}} className="collapse-item" to="/dashboard/blogs">Blogs</Link>
                    </div>
                </div>
            </li>
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" onClick={ () => toggleMenu('accordion-sidebar') } id="sidebarToggle" />
            </div>
        </ul>
    )
}