import { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import Helper from '../../Helpers/Helper'
import HeaderComponent from '../frontend/partials/HeaderComponent'
import { register } from "../../api/Auth"

export default function RegisterComponent(){
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [avatarShow, setAvatarShow] = useState(null)
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState(Helper.getUserAndToken())
    
    const handleSetAvatar = (e) => {
        setAvatarShow(URL.createObjectURL(e.target.files[0]))
        setAvatar(e.target.files[0])
    }

    const registerForm = async (e) => {
        e.preventDefault()
        setErrors({})
        let data = new FormData()
            data.append('name', name)
            data.append('phone', phone)
            data.append('email', email)
            data.append('password', password)
            data.append('passwordConfirmation', passwordConfirmation)
            data.append('avatar', avatar)
        const result = await register(data)
        if(result.data.errors) setErrors(result.data.errors)
        else if(result.status === 200) {
            clearForm()        
            Helper.Toaster(result.data.message ?? 'User registered successfully !!!')
            setUser(Helper.setUserAndToken(result.data.user))
        }
    }

    const clearForm = () => {
        setErrors({})
        setName('')
        setPhone('')
        setEmail('')
        setAvatar(null)
        setPassword('')
        setPasswordConfirmation('')
        setAvatarShow(null)
    }
    
    const history = useHistory()
    
    useEffect(() => {
        if(user && user.token){
            history.push('/dashboard')
        }
        Helper.setTitle('Register')
        
    }, [user])
    return (
        <>
            <HeaderComponent />
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center" style={{height: '80vh', backgroundColor: '#81e0fc'}}>
                        <form className="col-sm-5" onSubmit={registerForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your name</label>
                                <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                <small className="text-danger">{(errors.name && errors.name.msg) ? errors.name.msg : ''}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone number</label>
                                <input type="number" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="phone" />
                                <small className="text-danger">{(errors.phone && errors.phone.msg) ? errors.phone.msg : ''}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />
                                <small className="text-danger">{(errors.email && errors.email.msg) ? errors.email.msg : ''}</small>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-9">
                                    <label htmlFor="avatar" className="form-label">Avatar</label>
                                    <input type="file" accept="image/png, image/jpeg, image/jpg" defaultValue={avatar} onChange={handleSetAvatar} className="form-control" id="avatar" />
                                    <small className="text-danger">{(errors.avatar && errors.avatar.msg) ? errors.avatar.msg : ''}</small>
                                </div>
                                { avatarShow &&
                                    <div className="col-sm-3">
                                        <img src={avatarShow} style={{height: '100px', width: '100px'}} />
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                                <small className="text-danger">{(errors.password && errors.password.msg) ? errors.password.msg : ''}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password_confirmation" className="form-label">Confirm password</label>
                                <input type="password" defaultValue={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="form-control" id="password_confirmation" />
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                            <div>
                                Already have an account ? <Link to="/auth/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}