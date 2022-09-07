import NavigationBar from "../nav"
import { Link } from 'react-router-dom'

function Home () {

    return (
        <div className="home-page">
            <NavigationBar />
            <div className="main" border>
                <h1>Welcome</h1>
                <p>Homepage "/" (unprotected) <Link to='/' className="link-secondary">Link</Link></p>
                <p>Profile page "/profile" (protected) <Link to='profile'>Link</Link></p>
            </div>
        </div>
    )
}

export default Home