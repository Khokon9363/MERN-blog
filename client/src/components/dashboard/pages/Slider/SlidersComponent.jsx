import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Helper from '../../../../Helpers/Helper'
import * as API from "../../../../api/Slider"

export default function SlidersComponent(){
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [sliders, setSliders] = useState({data: []})

    const LoadMoreBtn = useRef(null)

    const getSliders = async () => {
        setIsLoading(true)
        
        const result = await API.get(Helper.getUserAndToken().token, searchValue, page)
        
        if(result && result.data && result.data.data){
            
            setSliders({data: sliders.data.concat(result.data.data)})
            
            setPage(Number(result.data.page) + 1)
            
            if(isFirstLoading) setIsFirstLoading(false)
            
            setIsLoading(false)
            
            if(result.data.data.length === 0) {
                LoadMoreBtn.current.disabled = true
                LoadMoreBtn.current.textContent = 'No more slider'
            }
        }
    }

    const destroySlider = async (id) => {
        const result = await API.destroy(Helper.getUserAndToken().token, id)

        if(result && result.data && result.data.data){
            Helper.Toaster(result.data.message ?? "Slider deleted successfully !!!")
            setSliders({data: sliders.data.filter(item => item._id !== id)})
        }
        console.log(result)
    }
    
    const update = async (id) => {
        const result = await API.updateStatus(Helper.getUserAndToken().token, id)

        if(result && result.data && result.data.data){
            Helper.Toaster(result.data.message ?? "Slider updated successfully !!!")
            const slider = sliders.data.find(item => item._id === id)
                  slider.status = !slider.status
            setSliders({...sliders, slider})
        }
    }

    const loadMore = () => {
        getSliders()
    }

    const search = (e) => {
        setSearchValue(e.target.value)
        setPage(1)
        setSliders({data: []})
    }

    useEffect(async () => {
        Helper.setTitle('Sliders')
        await getSliders()
    }, [searchValue.trim()])
    return(
        <>
        <style>
            {`
                img{
                    height: 50px;
                    width: auto
                }
            `}
        </style>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-start">Sliders</div>
                            <div className="float-end">
                                <Link className="btn btn-success btn-sm" to="/dashboard/add-slider">Add slider</Link>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <input
                                defaultValue={searchValue}
                                onChange={(e) => search(e)}
                                type="search"
                                className="form-control col-sm-4"
                                placeholder="Search from here"
                            />
                        </div>
                        <div className="card-body">
                            { isFirstLoading &&
                                <h1 className="text-center text-success">Loading sliders...</h1>
                            }
                            { !isFirstLoading &&
                            <>
                                <table className="table text-center table-responsive">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sliders.data.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{ ++index }</td>
                                                    <td>{ item.name }</td>
                                                    <td>
                                                        <img 
                                                            src={`${process.env.REACT_APP_SERVER_URL}/${Helper.prepareServerFile(item.image)}`}
                                                            alt="Slider image"/>
                                                    </td>
                                                    <td>{ item.title }</td>
                                                    <td>{ item.description }</td>
                                                    <td width="14%">
                                                        <button onClick={() => update(item._id)} className={ `btn btn-sm ${item.status ? 'btn-success' : 'btn-info'}` }>
                                                            <i className={ `fa ${item.status ? 'fa-arrow-up' : 'fa-arrow-down'}` }></i>
                                                        </button>
                                                        <Link to={`/dashboard/edit-slider/${item._id}` } className="btn btn-sm btn-secondary ml-1">
                                                            <i className="fa fa-pen"></i>
                                                        </Link>
                                                        <button onClick={() => destroySlider(item._id)} className="btn btn-sm btn-danger ml-1">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="row justify-content-center">
                                    { !isLoading &&
                                        <button 
                                            ref={LoadMoreBtn}
                                            onClick={() => loadMore()}
                                            className="btn col-sm-3 btn-success"
                                        >
                                            Load more !
                                        </button>
                                    }
                                    { isLoading &&
                                        <button className="btn col-sm-3 btn-info">
                                            Loading ...
                                        </button>
                                    }
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}