import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"
import useAuth from '../utils/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NavigationBar from '../nav'

const schema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(5).max(15).required('Password is required')
})

function LoginForm () {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { login, loginAxios } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()

  const onSubmit = async (data) => {
    loginAxios.post('/login',{
      email: data.email,
      password: data.password,
    })
      .then( (response) => {
        if (response.data.emailError) {
          setError('email', {
            type: 'custom',
            message: 'Email incorrect'
          })
        }
        if (response.data.passwordError) {
          setError('password', {
            type: 'custom',
            message: 'Password is incorrect'
          })
        }
        if (response.data.login) {
          login(response.data.token)
            .then(() => {
              navigate(state?.path || '/dashboard')
            })
        }
      })
      .catch(err => {
        console.log(err)
      })

  }

    return (
      <div className='loginPage'>
        <NavigationBar className='fluid' site={'login'}/>
        <div className='row justify-content-center'>
          <form className='needs-validation col-8 py-3' onSubmit={handleSubmit(onSubmit)} >
            <h2><strong>Welcome back!</strong></h2>

            <div className='mb-3 form-group'>
              <label className='form-label login-label'>Email Address</label>
              <input type='text' className={`form-control login-input ${errors.email && 'is-invalid' }`} placeholder='Enter Email' {...register('email')}/>
              <div className='invalid-feedback'>{errors.email?.message}</div>
            </div>

            <div className='mb-3'>
              <label className='form-label login-label is-valid'>Password</label>
              <input type='password' className={`form-control login-input ${errors.password && 'is-invalid' }`} placeholder='Password' {...register('password')} />
              <div className='invalid-feedback'>{errors.password?.message}</div>
            </div>
            
            <button className="btn rounded-pill login-btn" type="submit">Login</button>
            <p className='pt-2 login-p'>Need an account? <Link to='/register'>Click here to register</Link></p>
          </form>
        </div>
      </div>
    )
}

export default LoginForm