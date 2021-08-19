import { useEffect } from "react"
import { Link } from 'react-router-dom'
import Helper from '../../../../Helpers/Helper'

export default function AddCategoryComponent(){
    useEffect(() => {
        Helper.setTitle('Add Category')
    }, [])
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-start">Add category</div>
                            <div className="float-end">
                                <Link className="btn btn-success btn-sm" to="/dashboard/categories">Categories</Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" defaultChecked={true} id="status" />
                                        <label className="custom-control-label" htmlFor="status">Published</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-success">Save category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}