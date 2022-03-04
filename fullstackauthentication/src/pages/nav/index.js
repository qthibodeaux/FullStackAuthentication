import Login from './components/login'
import Register from './components/register'
import Logout from './components/logout'
import useAuth from '../utils/useAuth'

function NavigationBar ({site}) {
    const { authentication } = useAuth()

    return site === 'login' ? <Register />
    : site === 'register' ? <Login />
    : authentication ? <Logout />
    : <Login />
}

export default NavigationBar