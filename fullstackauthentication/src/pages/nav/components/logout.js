import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../utils/useAuth'

function LogoutButton () {
    let navigate = useNavigate()
    const { logout } = useAuth()
    const handleLogout = () => {
        navigate('/login')
        logout()
    }

    return (
        <button type='button' className='btn ' id="navbutton" onClick={handleLogout}><span className='nav-dev'>log</span>out</button>
    )
}

function Logout () {
    return <nav className='navbar shadow'>
        <div className='container'>
            <div className="dropdown" id="logindd">
                <button className="btn dropdown-toggle rounded-pill" type="button" id="navbutton" data-bs-toggle="dropdown">
                    <span className='nav-dev'>qthib</span>devs!
                </button>
                <ul className="dropdown-menu" id="ddmenu">
                <li><NavLink className="dropdown-item" id="registerbutton" to="/">Home</NavLink></li>
                <li><NavLink className="dropdown-item" id="home" to="/Profile">Profile</NavLink></li>
                </ul>
            </div>

            <LogoutButton />
        </div>
    </nav>
}

export default Logout