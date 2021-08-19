import { useEffect, useState } from "react"
import Helper from '../../../Helpers/Helper'
import * as API from '../../../api/Profile'

export default function ProfileComponent(props){
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState(Helper.getUserAndToken())
    const [avatarPreview, setAvatarPreview] = useState(user.avatar 
                    ? process.env.REACT_APP_SERVER_URL + Helper.prepareServerFile(user.avatar)
                    : '/dashboard/img/undraw_profile.svg')
    const [hasImagePreview, setHasImagePreview] = useState({avatar: avatarPreview, show: false})

    const [updateData, setUpdateData] = useState(user)
    const [updatePassword, setUpdatePassword] = useState({})

    const handleSetAvatarPreview = (e) => {
        setAvatarPreview(URL.createObjectURL(e.target.files[0]))
        setHasImagePreview({...hasImagePreview, show: true})
        setUpdateData({
            ...updateData,
            avatar: e.target.files[0]
        })
    }

    const removePreview = (e, afterUpdate = false) => {
        setHasImagePreview({...hasImagePreview, show: false})
        if(!afterUpdate) setAvatarPreview(hasImagePreview.avatar)
        document.querySelector('#avatar').value = null
        delete updateData.avatar
        setUpdateData(updateData)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setErrors({})
        let data = new FormData()
            data.append('name', updateData.name)
            data.append('phone', updateData.phone)
            data.append('email', updateData.email)
            data.append('avatar', updateData.avatar)
        const result = await API.updateProfile(Helper.getUserAndToken().token, data)
        if(result.data.errors) setErrors(result.data.errors)
        else if(result.status === 200) {
            Helper.Toaster(result.data.message ?? 'Profile updated successfully !!!')
            setUser(Helper.setUserAndToken(result.data.user))
            setUpdateData(result.data.user)
            props.setLayoutUser()
            removePreview(e, true)
        }
    }
    
    const handlePasswordUpdate = async (e) => {
        e.preventDefault()
        setErrors({})
        const result = await API.updateProfilePassword(Helper.getUserAndToken().token, updatePassword)
        if(result.data.errors) setErrors(result.data.errors)
        else if(result.status === 200) {
            Helper.Toaster(result.data.message ?? 'Password successfully !!!')
            setUpdatePassword({})
            document.querySelector('.password-update-form').reset()
        }
    }

    useEffect(async () => {
        Helper.setTitle('Profile')
        const result = await API.me(Helper.getUserAndToken().token)
        if(result !== undefined){
            setUser(result.data.user)
            setUpdateData(result.data.user)
        }
    }, [])
    return(
        <>
        <style>
            {
                `
                {
                    .img-profile{
                        height: 39px;
                        width: auto;
                    }
                }
                `
            }
        </style>
        <div className="container-fluid">
            <div className="row">
                <div className="card col-sm-5 m-auto">
                    <div className="card-header mt-3">
                        <h1 className="h3 mb-4 text-gray-800 text-center">Update your profile</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="Name">User name</label>
                                <input type="text" className="form-control" onChange={(e) => setUpdateData({...updateData, name: e.target.value})} defaultValue={ updateData.name } />
                                <small className="text-danger">{(errors.name && errors.name.msg) ? errors.name.msg : ''}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input type="text" className="form-control" onChange={(e) => setUpdateData({...updateData, email: e.target.value})} defaultValue={ updateData.email } />
                                <small className="text-danger">{(errors.email && errors.email.msg) ? errors.email.msg : ''}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Phone">Phone number</label>
                                <input type="text" className="form-control" onChange={(e) => setUpdateData({...updateData, phone: e.target.value})} defaultValue={ updateData.phone } />
                                <small className="text-danger">{(errors.phone && errors.phone.msg) ? errors.phone.msg : ''}</small>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="avatar">Profile photo</label>
                                <input type="file" id="avatar" accept="image/png, image/jpeg, image/jpg" onChange={handleSetAvatarPreview} className="form-control col-sm-9" />
                                <img className="img-profile col-sm-2 rounded-circle" src={avatarPreview} />
                                { hasImagePreview.show &&
                                    <i className="fa fa-times col-sm-1" onClick={removePreview}></i>
                                }
                                <small className="text-danger">{(errors.avatar && errors.avatar.msg) ? errors.avatar.msg : ''}</small>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block btn-info">Update profile</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card col-sm-5 m-auto">
                    <div className="card-header mt-3">
                        <h1 className="h3 mb-4 text-gray-800 text-center">Update password</h1>
                    </div>
                    <div className="card-body">
                        <small className="text-danger">{ errors.common ?? '' }</small>
                        <form onSubmit={handlePasswordUpdate} className="password-update-form">
                            <div className="form-group">
                                <label htmlFor="Password">Old password</label>
                                <input type="password" className="form-control" onChange={(e) => setUpdatePassword({...updatePassword, oldPassword: e.target.value})} defaultValue={ updatePassword.oldPassword } />
                                <small className="text-danger">{(errors.oldPassword && errors.oldPassword.msg) ? errors.oldPassword.msg : ''}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">New password</label>
                                <input type="password" className="form-control" onChange={(e) => setUpdatePassword({...updatePassword, newPassword: e.target.value})} defaultValue={ updatePassword.newPassword } />
                                <small className="text-danger">{(errors.newPassword && errors.newPassword.msg) ? errors.newPassword.msg : ''}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ConfirmPassword">Confirm password</label>
                                <input type="password" className="form-control" onChange={(e) => setUpdatePassword({...updatePassword, confirmPassword: e.target.value})} defaultValue={ updatePassword.confirmPassword } />
                                <small className="text-danger">{(errors.confirmPassword && errors.confirmPassword.msg) ? errors.confirmPassword.msg : ''}</small>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block btn-info">Update password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}