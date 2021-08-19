import { useEffect } from "react"
import { Link } from "react-router-dom"
import Helper from '../../../../Helpers/Helper'

export default function CategoriesComponent(){
    useEffect(() => {
        Helper.setTitle('Categories')
    }, [])
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-start">Categories</div>
                            <div className="float-end">
                                <Link className="btn btn-success btn-sm" to="/dashboard/add-category">Add category</Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table text-center table-responsive">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Blogs</th>
                                        <th>Likes</th>
                                        <th>Comments</th>
                                        <th>Reports</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Test name</td>
                                        <td>
                                            100
                                            <button className="btn btn-sm ml-1 btn-info">
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </td>
                                        <td>
                                            100
                                            <button className="btn btn-sm ml-1 btn-info">
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </td>
                                        <td>
                                            100
                                            <button className="btn btn-sm ml-1 btn-info">
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </td>
                                        <td>
                                            100
                                            <button className="btn btn-sm ml-1 btn-info">
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-success mr-1">
                                                <i className="fa fa-arrow-up"></i>
                                            </button>
                                            <button className="btn btn-sm btn-info mr-1">
                                                <i className="fa fa-arrow-down"></i>
                                            </button>
                                            <button className="btn btn-sm btn-danger ml-1">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}