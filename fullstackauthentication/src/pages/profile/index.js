import { useCallback, useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import NavigationBar from "../nav"
import useAuth from '../utils/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

function Profile () {
    const [profileName, setProfileName] = useState('')
    const [profileEmail, setProfileEmail] = useState('')
    const [profilePassword, setProfilePassword] = useState('*********')
    const [updateName, setUpdateName] = useState(false)
    const [updateEmail, setUpdateEmail] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const { setToken, authAxios } = useAuth()

    const updateButton = (num) => {
        if (num === 1) {
            setUpdateName(true)
        }
        else if (num === 2) {
            setUpdateEmail(true)
        }
        else if (num === 3) {
            setUpdatePassword(true)
        }
    }

    const cancelButton = (num) => {
        if (num === 1) {
            setUpdateName(false)
        }
        else if (num === 2) {
            setUpdateEmail(false)
        }
        else if (num === 3) {
            setUpdatePassword(false)
        }
    }

    const onClose = (num) => {
        if (num === 1) {
            setUpdateName(false)
        }
        else if (num === 2) {
            setUpdateEmail(false)
        }
        else if (num === 3) {
            setUpdatePassword(false)
        }
    }

    const getProfile = useCallback( async () => {
        authAxios.get('/getProfile').then((res) => {
            const { name, email } = res.data
            setProfileName(name)
            setProfileEmail(email)
            setHasLoaded(true)
        }).catch((err) => {
            console.log(err)
        })
    },[authAxios])

    useEffect(() => {
        getProfile()
      
    }, [getProfile])

    return (
        <div className="profile-div">
            <NavigationBar />
            <div className="row justify-content-center">
                <div className="col-md-6 profile-bg">
                    <h2 className="text-center profile-headline py-3">Profile Information</h2>

                        <div className="row justify-content-center py-2" >
                            <div className="col-sm-10">
                                <div className="row  profile-section  align-items-center">
                                    <div className="col profile-info-label">Username</div>
                                    <div className="col text-end">
                                        {
                                            updateName ? <button type="button" className="btn rounded-pill profile-update-btn" onClick={() => cancelButton(1)}>Cancel</button>
                                                : <button type="button" className="btn rounded-pill profile-update-btn" onClick={() => updateButton(1)}>Update</button>
                                        }
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col py-3">
                                        {   
                                            updateName ? <FormUpdate updateSection={setProfileName} onClose={onClose} section={1} setToken={setToken} />
                                            : hasLoaded ? <p>{profileName}</p> 
                                            : <span className="placeholder col-4"></span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center py-2">
                            <div className="col-sm-10">
                                <div className="row profile-section align-items-center">
                                    <div className="col profile-info-label">
                                        Email
                                    </div>
                                    <div className="col text-end">
                                        {
                                            updateEmail ? <button type="button" className="btn rounded-pill profile-update-btn" onClick={() => cancelButton(2)}>Cancel</button>
                                                : <button type="button" className="btn rounded-pill profile-update-btn" onClick={() => updateButton(2)}>Update</button>
                                        }
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col py-3">
                                        {
                                            updateEmail ? <FormUpdate updateSection={setProfileEmail} onClose={onClose} section={2} setToken={setToken}/>
                                            : hasLoaded ? <p>{profileEmail}</p>
                                            : <span className="placeholder col-4"></span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center py-2">
                            <div className="col-sm-10">
                                <div className="row profile-section align-items-center">
                                    <div className="col profile-info-label">
                                        Password
                                    </div>
                                    <div className="col text-end">
                                        {
                                            updatePassword ? <button type="button" className="btn rounded-pill profile-update-btn" onClick={() => cancelButton(3)}>Cancel</button>
                                            : <button type="button" className="btn rounded-pill profile-update-btn" onClick={() => updateButton(3)}>Update</button>
                                        }
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col  py-3">
                                        {
                                            updatePassword ? <FormUpdate  updateSection={setProfilePassword} onClose={onClose} section={3}/>
                                            : hasLoaded ? <p>{profilePassword}</p>
                                            : <span className="placeholder col-4"></span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

const schema = yup.object({
    update: yup.string().required('Is required')
  })


const FormUpdate = ({updateSection, onClose, section}) => {
    const navigate = useNavigate()
    const { logout, authAxios } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      })

    const onSubmit = async (data) => {
        if (section === 1) {
            const nameUpdate = data.update
            try {
                authAxios.put('/changeUserName', {
                    nameUpdate: nameUpdate
                }).then((response) => {
                    updateSection(response.data.name)
                }).catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }    
        } else if (section === 2) {
            const emailUpdate = data.update
            try {
                authAxios.put('/changeUserEmail', {
                    emailUpdate: emailUpdate
                }).then(() => {
                    navigate('/login')
                    logout()
                }).catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            const passwordUpdate = data.update
            try {
                authAxios.put('/changeUserPassword', {
                    passwordUpdate: passwordUpdate
                }).then(() => {
                    updateSection("Password has been updated")
                    setTimeout(() => updateSection('*********'), 5000)
                }).catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }
        }


        onClose(section)
    }

    return (
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex">
                <input type='text' className={`form-control ${errors.update && 'is-invalid'}`}  {...register('update')}/>
                <button className="btn profile-submit-btn btn-link" type="submit">Submit</button>
            </div>
        </form>
    )
}


export default Profile
