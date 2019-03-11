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

    /*
     DOHVATI SVE PODATKE IZ INPUTA I STAVI IH U OBJEKT 
     * */
    getUserPersonalData() {
        return newUser = {
            Name: $('#first-name-id').val(),
            Surname: $('#last-name-id').val(),
            Email: $('#email-id').val(),
            Password: $('#password-id').val(),
            RepeatPassword: $('#repeat-password-id').val()
        };
    }

    /*
     VALIDACIJA PODATAKA PREKO REGEXA
     */
    inputChangeValue() {
        var newUser = this.getUserPersonalData();
        var re = /\S+@\S+\.\S+/;
        var passwordFirsteLetterUppercase = /^[A-Z][a-z0-9_-]{0,99}$/;
        var passwordDigitsLong = /^[a-zA-Z0-9]{7,}$/;
        var passwordContainNumbers = /[0-9]/;
        var button = document.getElementById('register-new-user-button-id');

        if (newUser.Name === "" || newUser.Surname === "") {
            this.errorMessageStyle();
            button.innerText = 'Enter name and surname';
        }
        else if (newUser.Email == "") {
            this.errorMessageStyle();
            button.innerText = 'Please enter personal email';
        }
        else if (!re.test(newUser.Email)) {
            this.errorMessageStyle();
            button.innerText = 'Please enter valid email';
        }
        else if (newUser.Password == "") {
            this.errorMessageStyle();
            button.innerText = 'Please enter wanted password';
        }
        else if (!passwordFirsteLetterUppercase.test(newUser.Password)) {
            this.errorMessageStyle();
            button.innerText = 'Password first letter uppercase';
        }
        else if (!passwordDigitsLong.test(newUser.Password)) {
            this.errorMessageStyle();
            button.innerText = 'Password is too weak (7 digits min)';
        }
        else if (!passwordContainNumbers.test(newUser.Password)) {
            this.errorMessageStyle();
            button.innerText = 'Password should contain number';
        }
        else if (newUser.RepeatPassword == "") {
            this.errorMessageStyle();
            button.innerText = 'Please repeat your password';
        }
        else if (newUser.Password !== newUser.RepeatPassword) {
            this.errorMessageStyle();
            button.innerText = 'Your passwords are not same';
        }
        else {
            button.innerText = 'REGISTER NOW';
            this.submitButtonMessageStyle();
            button.disabled = false;
        }
    }

    /*
     DODAJ CUSTOM STYLE REGISTER BOTUNU AKO IMA NEKA POGRESKA U UNESENIM PODACIMA  
     */ 
    errorMessageStyle() {
        $("#register-new-user-button-id").css('background-color', 'rgba(0,0,0,0)');
        $("#register-new-user-button-id").css('transition', '1s');
        $("#register-new-user-button-id").css('color', '#ff6666');
        $("#register-new-user-button-id").css('font-weight', 'normal');
        $("#register-new-user-button-id").css('animation', 'none');
        $("#register-new-user-button-id").css('border', '1px solid #ff6666');
    }

    /*
     DODAJ CUSTOM STYLE REGISTER BOTUNU AKO JE SVE UREDU
     */
    submitButtonMessageStyle() {
        $("#register-new-user-button-id").css('background-color', '#AA6944');
        $("#register-new-user-button-id").css('transition', '1s');
        $("#register-new-user-button-id").css('color', 'white');
        $("#register-new-user-button-id").css('font-weight', 'bold');
        $("#register-new-user-button-id").css('border', '1px solid #AA6944');
    }

    /*
     ZAHTJEV NA SERVER ZA DODAVANJE NOVOG KORISNIKA U BAZU PODATAKA
     */
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
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="register-container">
                <div className="register-header">
                    <h2> Register new account </h2>
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
                    <button id="register-new-user-button-id" onClick={() => this.registerNewUser()}> Please enter personal data </button>
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