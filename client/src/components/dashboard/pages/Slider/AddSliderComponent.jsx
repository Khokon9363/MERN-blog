import { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import Helper from '../../../../Helpers/Helper'
import * as API from './../../../../api/Slider'

export default function AddSliderComponent(){
    const [editMode, setEditMode] = useState(false)
    const [slider, setSlider] = useState({})
    const [preview, setPreview] = useState(null)
    const [errors, setErrors] = useState({})

    const handlePreview = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setSlider({...slider, image: e.target.files[0]})
    }

    const { id } = useParams()

    const history = useHistory()

    const prepareData = () => {
        let data = new FormData()
            if(editMode) data.append('_id', slider._id ?? '')
            data.append('name', slider.name ?? '')
            data.append('title', slider.title ?? '')
            data.append('description', slider.description ?? '')
            data.append('status', slider.status)
            data.append('image', slider.image)
        return data
    }

    const store = async (e) => {
        e.preventDefault()
        setErrors({})
        const result = await API.store(Helper.getUserAndToken().token, prepareData())
        if(result.data.errors) setErrors(result.data.errors)
        else if(result.status === 200) {
            Helper.Toaster(result.data.message ?? 'Slider saved successfully !!!')
            history.push('/dashboard/sliders')
        }
    }

    const getSlider = async (id) => {
        const result = await API.find(Helper.getUserAndToken().token, id)
        if(result.data && result.data.data) {
            setPreview(`${process.env.REACT_APP_SERVER_URL}/${Helper.prepareServerFile(result.data.data.image)}`)
            delete result.data.data.image
            setSlider(result.data.data)
        }
    }

    const update = async (e) => {
        e.preventDefault()
        setErrors({})
        
        let data
        if(!slider.image) data = slider

        if(slider.image){
            data = prepareData()
        }
        const result = await API.update(Helper.getUserAndToken().token, data)
        if(result.data.errors) setErrors(result.data.errors)
        else if(result.status === 200) {
            Helper.Toaster(result.data.message ?? 'Slider updated successfully !!!')
            history.push('/dashboard/sliders')
        }
        console.log(result)
    }

    useEffect(() => {
        if(id) setEditMode(true)
        if(editMode) getSlider(id)
        Helper.setTitle( (editMode ? 'Edit' : 'Add') + ' Slider')
    }, [editMode])
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-start">{ editMode ? 'Edit' : 'Add' } slider</div>
                            <div className="float-end">
                                <Link className="btn btn-success btn-sm" to="/dashboard/sliders">Sliders</Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ editMode ? update : store}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                           onChange={(e) => setSlider({...slider, name: e.target.value}) }
                                           defaultValue={slider.name}
                                           className="form-control"
                                    />
                                    <small className="text-danger">
                                        {(errors.name && errors.name.msg) ? errors.name.msg : ''}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" 
                                           onChange={(e) => setSlider({...slider, title: e.target.value}) }
                                           defaultValue={slider.title}
                                           className="form-control"
                                    />
                                    <small className="text-danger">
                                        {(errors.title && errors.title.msg) ? errors.title.msg : ''}
                                    </small>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file"
                                               onChange={handlePreview}
                                               accept="image/png, image/jpeg, image/jpg"
                                               className="form-control"
                                        />
                                        <small className="text-danger">
                                            {(errors.image && errors.image.msg) ? errors.image.msg : ''}
                                        </small>
                                    </div>
                                    { preview &&
                                        <div className="col-sm-3">
                                            <img src={preview} style={{height: '100%', width: '100%'}} />
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" 
                                              onChange={(e) => setSlider({...slider, description: e.target.value}) }
                                              defaultValue={slider.description}
                                    />
                                    <small className="text-danger">
                                        {(errors.description && errors.description.msg) ? errors.description.msg : ''}
                                    </small>
                                </div>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" 
                                           className="custom-control-input"
                                           onChange={(e) => setSlider({...slider, status: e.target.checked}) }
                                           defaultChecked={slider.status}
                                           id="status"
                                    />
                                    <label className="custom-control-label" htmlFor="status">Published</label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-success">{ editMode ? 'Update' : 'Save' } slider</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}