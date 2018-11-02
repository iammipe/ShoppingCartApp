class Registration extends React.Component {
    componentDidMount() {
        $(".loading-screen").css("display", "none");
    }

    render() {
        return (
            <div className="register-container">
                <div className="register-header">
                    <h2> Register to personal account </h2>
                </div>

                <div className="register-input">
                    <div className="register-input-names">
                        <input placeholder="First name" />
                        <input placeholder="Last name" />
                    </div>
                    <input type="password" placeholder="Email" />
                    <input type="password" placeholder="Password"  />
                    <input type="password" placeholder="Repeat password"  />
                </div>

                <div className="buttons-container">
                    <button> Register </button>
                    <a href="/Home/Login"> Have an accout? Log in! </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Registration />,
    document.getElementById('registration-form')
);