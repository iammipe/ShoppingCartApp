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
        var passwordFirsteLetterUppercase = /^[A-Z][a-z0-9_-]{0,99}$/;
        var passwordDigitsLong = /^[a-zA-Z0-9]{7,}$/;
        var passwordContainNumbers = /[0-9]/;

        var button = document.getElementById('login-user-button-id');


        if (newUser.Email == "" && newUser.Password == "") {
            this.errorMessageStyle();
            button.innerText = 'Please enter user credentials';
        }
        else if (!re.test(newUser.Email)) {
            this.errorMessageStyle();
            button.innerText = 'Please enter valid email';
        }
        else if (newUser.Password == "") {
            this.errorMessageStyle();
            button.innerText = 'Please enter password';
        }
        else if (!passwordFirsteLetterUppercase.test(newUser.Password)) {
            this.errorMessageStyle();
            button.innerText = 'Password should contain uppercase';
       }
        else if (!passwordDigitsLong.test(newUser.Password)) {
            this.errorMessageStyle();
           button.innerText = 'Password is too weak (7 digits min)';
       }
        else if (!passwordContainNumbers.test(newUser.Password)) {
            this.errorMessageStyle();
           button.innerText = 'Password should contain number';
       }
        else {
            button.innerText = 'LOGIN';
            this.submitButtonMessageStyle();
            button.disabled = false;
        }
    }

    errorMessageStyle() {
        $("#login-user-button-id").css('background-color', 'rgba(0,0,0,0)');
        $("#login-user-button-id").css('transition', '1s');
        $("#login-user-button-id").css('color', '#ff6666');
        $("#login-user-button-id").css('font-weight', 'normal');
        $("#login-user-button-id").css('animation', 'none');
        $("#login-user-button-id").css('border', '1px solid #ff6666');
    }

    submitButtonMessageStyle() {
        $("#login-user-button-id").css('background-color', '#AA6944');
        $("#login-user-button-id").css('transition', '1s');
        $("#login-user-button-id").css('color', 'white');
        $("#login-user-button-id").css('font-weight', 'bold');
        $("#login-user-button-id").css('border', '1px solid #AA6944');
    }

    generateLoadingIcon() {
        var button = document.getElementById('login-user-button-id');
        button.innerText = 'Loading please wait...';
    }

    loginUser() {
        this.generateLoadingIcon();
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
                $('#email-login-id').val("");
                $('#password-login-id').val("");
                $('#login-checkbox-id').prop('checked', false)
                this.errorMessageStyle();
                var button = document.getElementById('login-user-button-id');
                button.innerText = 'There is no user with this credentials';
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
                    <input id="email-login-id" placeholder="Username" onChange={e => this.inputChangeValue()} />
                </div>

                <div className="input">
                    <input id="password-login-id" type="password" placeholder="Password" onChange={e => this.inputChangeValue()} />
                </div>
                <div className="support-container">
                    <input type="checkbox" id="login-checkbox-id" />
                    <p> Remember me </p>
                </div>

                <div className="buttons-container">
                    <button id="login-user-button-id" onClick={() => this.loginUser()}> Please enter user credentials </button>
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