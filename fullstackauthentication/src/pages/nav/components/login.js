import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"
import useAuth from '../../utils/useAuth'

function LoginButton () {
    const { register, handleSubmit } = useForm()
    const { login, loginAxios } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const onSubmit = async (data) => {
        if (data.email === undefined || data.password === undefined) navigate('login')
    
        loginAxios.post('/login',{
          email: data.email,
          password: data.password,
        })
          .then( (response) => {
            if (response.data.emailError) {
                navigate('/login')
            }
            if (response.data.passwordError) {
                navigate('/login')
            }
            if (response.data.login) {
              login(response.data.token)
                .then(() => {
                  navigate(state?.path || '/profile')
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
    
      }

    return (
      <div className="nav-item dropdown ">
          <button className="btn dropdown-toggle rounded-pill" id="navbutton" data-bs-toggle="dropdown">
            <span className='nav-dev'>log</span>in
          </button>
          <ul className="dropdown-menu dropdown-menu-end" id="ddmenu">
            <form style={{ width: '400px', padding: '20px'}} onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3 form-group'>
              <label className='form-label'>Email Address</label>
              <input type='text' className='form-control' placeholder='Enter Email' {...register('email')}/>
              </div>

              <div className='mb-3'>
              <label className='form-label' >Password</label>
              <input type='password' className='form-control' placeholder='Password' {...register('password')} />
              </div>

              <button className="btn rounded-pill" id='reuse' type="submit">Login</button>
              <p id='loginMenup'>Need an account? <Link to='/register'>Click here to register</Link></p>
            </form>
          </ul>
        </div>
    )
}

function Login () {
  return (
    <nav className='navbar'>
            <div className='container'>
              <div><span className='nav-dev'>qthib</span><span className='nav-dev2'>devs!</span></div>

              <LoginButton />
            </div>
        </nav>
  )
}

export default Login