import { NavLink, useNavigate } from 'react-router-dom'

function RegisterButton () {
    let navigate = useNavigate()
    
    return (
        <button 
            type="button" 
            className="btn"
            id="navbutton"
            onClick={() => {
                navigate('/register')
            }}
        >
            <span className='nav-dev'>register</span>
        </button>
    )
}

function Register () {
    return (
        <nav className='navbar'>
            <div className='container'>
                <div><span className='nav-dev'>qthib</span><span className='nav-dev2'>devs!</span></div>

                <RegisterButton />
            </div>
        </nav>
    )
}

export default Register
