import "../../Styles/Home.style.css";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Welcome to Task Manager</h1>

                <div className="home-button-group">
                    <button
                        className="home-btn login-btn"
                        onClick={() => (window.location.href = "/login")}
                    >
                        Login
                    </button>

                    <button
                        className="home-btn register-btn"
                        onClick={() => (window.location.href = "/register")}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;