import axios from 'axios'

const URL = process.env.REACT_APP_SERVER_URL
const tokenType = 'Bearer'

export const me = (token) => axios.post(`${URL}/auth/profile/me`, null, {
                                        headers: { 
                                            Authorization: `${tokenType} ${token}`
                                        }
                                    })
                                   .then(res => {return res} )
                                   .catch(err => {return err.response} )

export const updateProfile = (token, data) => axios.post(`${URL}/auth/profile/update`, data, {
                                    headers: { 
                                        Authorization: `${tokenType} ${token}`
                                    }
                                })
                               .then(res => {return res} )
                               .catch(err => {return err.response} )

export const updateProfilePassword = (token, data) => axios.post(`${URL}/auth/password/update`, data, {
                                            headers: { 
                                                Authorization: `${tokenType} ${token}`
                                            }
                                        })
                                    .then(res => {return res} )
                                    .catch(err => {return err.response} )