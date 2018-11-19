class Login extends React.Component {
    componentDidMount() {
        $(".loading-screen").css("display", "none");
        $("#login-link").css("color", "white");
        document.getElementById('login-user-button-id').disabled = true;
    }

    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.inputChangeValue = this.inputChangeValue.bind(this);
    }

    getUserLoginData() {
        return newUser = {
            Email: $('#email-login-id').val(),
            Password: $('#password-login-id').val(),
            RememberMe: $('#login-checkbox-id').is(":checked")
        };
    }

    inputChangeValue() {
        var loginUser = this.getUserLoginData();

        var re = /\S+@\S+\.\S+/;
        var pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

        var button = document.getElementById('login-user-button-id');
        $("#login-user-button-id").css('background-color', '#ff6666');

       if (!re.test(newUser.Email)) {
            button.innerText = 'Please enter valid email';
        }
        else if (!pass.test(newUser.Password)) {
            button.innerText = 'Enter correct password';
        }
        else {
            button.innerText = 'Login now!!';
            $("#login-user-button-id").css('background-color', '#d3d3d3');
            button.disabled = false;
        }
    }

    loginUser() {
        var loginUser = this.getUserLoginData();

        $.ajax({
            url: "/Login/UserLogin",
            type: "POST",
            async: "false",
            data: { "vm": loginUser },
            success: function (data) {
                window.location.href = "/Home/Index";
            }.bind(this),
            error: function () {
                window.location.href = "/Login";
                alert("Login failed");
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="login-container">
                <div className="header">
                    <h2> Login to personal account </h2>
                </div>

                <div className="input">
                    <input id="email-login-id" placeholder="Enter username" onChange={e => this.inputChangeValue()} />
                </div>

                <div className="input">
                    <input id="password-login-id" type="password" placeholder="Enter password" onChange={e => this.inputChangeValue()} />
                </div>
                <div className="support-container">
                    <input type="checkbox" id="login-checkbox-id" />
                    <p> Remember me </p>
                </div>

                <div className="buttons-container">
                    <button id="login-user-button-id" onClick={() => this.loginUser()}> Login </button>
                    <a href="/Register"> Don't have an accout? Sign up! </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('login-form')
);