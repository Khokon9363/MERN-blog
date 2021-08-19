import axios from 'axios'

const URL = process.env.REACT_APP_SERVER_URL

export const register = (data) => axios.post(`${URL}/auth/register`, data).then(res => {return res} ).catch(err => {return err.response} )

export const login = (data) => axios.post(`${URL}/auth/login`, data).then(res => {return res} ).catch(err => {return err.response} )