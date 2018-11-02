class Login extends React.Component {
    componentDidMount() {
        $(".loading-screen").css("display", "none");
    }

    render() {
        return (
            <div className="login-container">
                <div className="header">
                    <h2> Login to personal account </h2>
                </div>

                <div className="input">
                    <input placeholder="Enter username" />
                </div>

                <div className="input">
                    <input type="password" placeholder="Enter password"  />
                </div>
                <div className="support-container">
                    <input type="checkbox" />
                    <p> Remember me </p>
                </div>

                <div className="buttons-container">
                    <button> Login </button>
                    <a href="/Home/Registration"> Don't have an accout? Sign up! </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('login-form')
);