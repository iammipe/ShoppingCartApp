class Registration extends React.Component {
    componentDidMount() {
        $(".loading-screen").css("display", "none");
        document.getElementById('register-new-user-button-id').disabled = true;
    }

    constructor(props) {
        super(props);
        this.registerNewUser = this.registerNewUser.bind(this);
        this.inputChangeValue = this.inputChangeValue.bind(this);
    }

    getUserPersonalData() {
        return newUser = {
            Name: $('#first-name-id').val(),
            Surname: $('#last-name-id').val(),
            Email: $('#email-id').val(),
            Password: $('#password-id').val(),
            RepeatPassword: $('#repeat-password-id').val()
        };
    }

    inputChangeValue() {
        var newUser = this.getUserPersonalData();
        var re = /\S+@\S+\.\S+/;
        var pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;
        var button = document.getElementById('register-new-user-button-id');
        $("#register-new-user-button-id").css('background-color', '#ff6666');

        if (newUser.Name === "" || newUser.Surname === "") {
            button.innerText = 'Enter name and surname';
        }
        else if (!re.test(newUser.Email)) {
            button.innerText = 'Please enter valid email';
        }
        else if (newUser.Password !== newUser.RepeatPassword) {
            button.innerText = 'Your passwords are not same';
        }
        else if (!pass.test(newUser.Password)) {
            button.innerText = 'Password is too weak';
        }
        else {
            button.innerText = 'Register now!!';
            $("#register-new-user-button-id").css('background-color', '#d3d3d3');
            $("#register-new-user-button-id").css('width', '80%');
            $("#register-new-user-button-id").css('transition', '1s');
            button.disabled = false;
        }
    }

    registerNewUser() {
        var newUser = this.getUserPersonalData();

        $.ajax({
            url: "/Register/NewUser",
            type: "POST",
            async: "false",
            data: { "vm": newUser },
            success: function () {
                console.log("Successfully registered");
                window.location.href = "/Home/Index";
            }.bind(this),
            error: function () {
                alert("fails");
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="register-container">
                <div className="register-header">
                    <h2> Register to personal account </h2>
                </div>

                <div className="register-input">
                    <div className="register-input-names">
                        <input placeholder="First name" id="first-name-id" onChange={e => this.inputChangeValue()} />
                        <input placeholder="Last name" id="last-name-id" onChange={e => this.inputChangeValue()} />
                    </div>
                    <input type="email" placeholder="Email" id="email-id" onChange={e => this.inputChangeValue()} />
                    <input type="password" placeholder="Password" id="password-id" onChange={e => this.inputChangeValue()} />
                    <input type="password" placeholder="Repeat password" id="repeat-password-id" onChange={e => this.inputChangeValue()} />
                </div>

                <div className="buttons-container">
                    <button id="register-new-user-button-id" onClick={() => this.registerNewUser()}> Register </button>
                    <a href="/Login"> Have an accout? Log in! </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Registration />,
    document.getElementById('registration-form')
);