import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"
import useAuth from '../utils/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NavigationBar from '../nav'

const schema = yup.object({
  fname: yup.string().required('Full Name is Required'),
  email: yup.string().required('Email is required'),
  password: yup.string().min(5).max(15).required('Password is required'),
  confirm: yup.string().required('Password is required').oneOf([yup.ref('password'), null], 'Passwords do not match'),
})

function RegisterForm () {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { login, loginAxios } = useAuth()

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

    const onSubmit = async (data) => {
      loginAxios.post("/register", {
          name: data.fname,
          email: data.email,
          password: data.password,
        })
        .then(function (response){
          if (response.data.error) {
            setError('email', {
              type: 'custom',
              message: 'This user already exists'
            })    
          }
          if (response.data.login) {
            login(response.data.token)
              .then(() => {
                navigate(state?.path || '/profile')
              })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      }

    return (
        <div className='register-page'>
          <NavigationBar className='fluid' site={'register'}/>
          <div className="row justify-content-center">
            <form className="needs-validation col-8 py-3" onSubmit={handleSubmit(onSubmit)}>
              <h4><strong>Create your account</strong></h4>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className={`form-control ${errors.fname && 'is-invalid'}`} placeholder="Enter full name" name="fname" {...register('fname')} />
                <div className='invalid-feedback'>{errors.fname?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label is-valid">Email address</label>
                <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} placeholder="Enter email" name="email" {...register('email')} />
                <div className={errors.email ? 'invalid-feedback' : 'form-text'}>{errors.email?.message ? errors.email?.message : 'We will never share your email with anyone else.'}</div>
              </div>

              <div className="mb-3">
                <label className="form-label is-valid">Password</label>
                <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} placeholder="Password" name="password" {...register('password')} />
                <div className='invalid-feedback'>{errors.password?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label is-valid">Confirm Password</label>
                <input type="password" className={`form-control ${errors.confirm && 'is-invalid'}`} placeholder="Confirm password" name="confirm" {...register('confirm')}/>
                <div className="invalid-feedback">{ errors.confirm?.message}</div>
              </div>
              

              <button className="btn rounded-pill register-btn" type="submit">Create Account</button>

              <p className='pt-2 register-p'>Already a user? <Link to='/login'>Click here to login.</Link></p>
            </form>
          </div>
        </div>
    )
}

export default RegisterForm