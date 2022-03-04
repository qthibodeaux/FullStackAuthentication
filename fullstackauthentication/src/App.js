import { Routes, Route} from 'react-router-dom'
import RequireAuth from './pages/utils/requireAuth'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'


function App() {
  return (
    <div className='central'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;