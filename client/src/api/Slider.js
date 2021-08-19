import axios from 'axios'

const URL = process.env.REACT_APP_SERVER_URL
const MODULE = 'sliders'
const tokenType = 'Bearer'

// STORE
export const store = (token, data) => axios.post(`${URL}/${MODULE}/store`, data, {
                                    headers: { 
                                        Authorization: `${tokenType} ${token}`
                                    }
                                })
                               .then(res => {return res} )
                               .catch(err => {return err.response} )

// INDEX
export const get = (token, search = '', page = 1, limit = 2) => axios.get(`${URL}/${MODULE}/${page}/${limit}/${search}`, {
                                    headers: {
                                        Authorization: `${tokenType} ${token}`
                                    }
                                })
                               .then(res => {return res} )
                               .catch(err => {return err.response} )

// UPDATE STATUS
export const updateStatus = (token, id) => axios.patch(`${URL}/${MODULE}/update/status`, { id }, {
                                    headers: {
                                        Authorization: `${tokenType} ${token}`
                                    }
                                })
                               .then(res => {return res} )
                               .catch(err => {return err.response} )

// DESTROY
export const destroy = (token, id) => axios.delete(`${URL}/${MODULE}/destroy/${id}`, {
                                    headers: {
                                        Authorization: `${tokenType} ${token}`
                                    }
                                })
                               .then(res => {return res} )
                               .catch(err => {return err.response} )

// FIND
export const find = (token, id) => axios.get(`${URL}/${MODULE}/${id}`, {
                                headers: {
                                    Authorization: `${tokenType} ${token}`
                                }
                            })
                           .then(res => {return res} )
                           .catch(err => {return err.response} )

// UPDATE
export const update = (token, data) => axios.post(`${URL}/${MODULE}/update`, data, {
                                    headers: {
                                        Authorization: `${tokenType} ${token}`
                                    }
                                })
                               .then(res => {return res} )
                               .catch(err => {return err.response} )