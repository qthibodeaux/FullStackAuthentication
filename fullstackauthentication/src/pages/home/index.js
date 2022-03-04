import NavigationBar from "../nav"

function Home () {

    return (
        <div className="home-page">
            <NavigationBar />
            <div className="main" border>
                <h1>Welcome</h1>
                <p>Home page "/" (unprotected)</p>
                <p>Profile page "/profile" (protected)</p>
            </div>
        </div>
    )
}

export default Home