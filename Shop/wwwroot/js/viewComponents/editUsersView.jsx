class EditUsersView extends React.Component {

    state = {
        users: []
    }

    constructor(props) {
        super(props);
        this.getMemberData();
        this.getMemberData = this.getMemberData.bind(this);
        this.getEmployeeData = this.getEmployeeData.bind(this);
        this.getAdminData = this.getAdminData.bind(this);
    }

    componentDidMount() {
        $(".loading-screen").css("display", "none");
        $("#edit-users-link").css("color", "white");
    }

    getMemberData() {
        $("#members-tab").css("background-color", "black");
        $("#employees-tab").css("background-color", "rgba(0,0,0,0)");
        $("#admins-tab").css("background-color", "rgba(0,0,0,0)");

        $.ajax({
            url: "/Users/GetMemberUsers",
            type: "POST",
            success: function (json) {
                this.setState({ users: json });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    getEmployeeData() {
        $("#members-tab").css("background-color", "rgba(0,0,0,0)");
        $("#employees-tab").css("background-color", "black");
        $("#admins-tab").css("background-color", "rgba(0,0,0,0)");

        $.ajax({
            url: "/Users/GetEmployeeUsers",
            type: "POST",
            success: function (json) {
                this.setState({ users: json });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    getAdminData() {
        $("#members-tab").css("background-color", "rgba(0,0,0,0)");
        $("#employees-tab").css("background-color", "rgba(0,0,0,0)");
        $("#admins-tab").css("background-color", "black");

        $.ajax({
            url: "/Users/GetAdminUsers",
            type: "POST",
            success: function (json) {
                this.setState({ users: json });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    SetTopProductBoolean(variable) {
        if (variable)
            return "Remove from top";
        else
            return "Set as top";
    }

    ReturnToEditPage() {
        $(".edit-user-full-popup").css("display", "none");
        $(".edit-user-data-full-popup").css("display", "none");
        
    }

    ChangeRole(id, name, surname) {
        var text = "Change role of " + name + " " + surname + "!";
        $(".change-role-name-h1").text(text);
        $('.change-role-name-h1').attr('id', id);
        $(".edit-user-full-popup").css("display", "flex");
    }

    RefreshPage(role) {
        if (role === "Member") {
            this.getMemberData();
        }
        else if (role === "Employee") {
            this.getEmployeeData();
        }
        else {
            this.getAdminData();
        }
    }

    ChoiceOfRole(role) {
        var id = $('.change-role-name-h1').attr('id');

        $.ajax({
            url: "/Personell/EditRole",
            data: { "id": id, "role": role },
            type: "POST",
            success: function () {
                $(".edit-user-full-popup").css("display", "none");
                this.RefreshPage(role);
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });

    }

    ChangeUserDataPopUp(id, name, surname, email) {
        $(".edit-user-data-full-popup").css("display", "flex");
        $('#edit-user-name-input').val(name);
        $('#edit-user-surname-input').val(surname);
        $('#edit-user-email-input').val(email);
        $(".update-user-data-btn").attr("id", id);
    }

    ChangeUserData() {
        var newName = $('#edit-user-name-input').val();
        var newSurname = $('#edit-user-surname-input').val();
        var newEmail = $('#edit-user-email-input').val();

        var id = $('.update-user-data-btn').attr('id');

        $.ajax({
            url: "/Personell/EditUser",
            data: { "id": id, "name": newName, "surname": newSurname, "email": newEmail },
            type: "POST",
            success: function (role) {
                $(".edit-user-data-full-popup").css("display", "none");
                RefreshPage(role);
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    DeleteUser(id) {
        $.ajax({
            url: "/Personell/DeleteUser",
            data: { "id": id },
            type: "POST",
            success: function (role) {
                this.RefreshPage(role);
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <table id="items-table">
                    <thead>
                        <tr id="items-table-first-child" className="table-header">
                            <th colSpan="2" width="50%" onClick={this.getMemberData} id="members-tab">MEMBERS</th>
                            <th colSpan="1" width="25%" onClick={this.getEmployeeData} id="employees-tab">EMPLOYEES</th>
                            <th colSpan="2" width="25%" onClick={this.getAdminData} id="admins-tab">ADMINS</th>
                        </tr>
                        <tr className="thead">
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(item =>
                                <tr key={item.id}>
                                    <td onClick={() => this.ChangeUserDataPopUp(item.id, item.name, item.surname, item.email)} id={item.id}>{item.name} </td>
                                    <td onClick={() => this.ChangeUserDataPopUp(item.id, item.name, item.surname, item.email)}>{item.surname} </td>
                                    <td onClick={() => this.ChangeUserDataPopUp(item.id, item.name, item.surname, item.email)} className="table-links"> {item.email} </td>
                                    <td className="table-links" onClick={() => this.ChangeRole(item.id, item.name, item.surname)}> Change role </td>
                                    <td className="table-links" onClick={() => this.DeleteUser(item.id)}> Delete </td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>

                <div className="edit-user-full-popup">
                    <div className="edit-user-cart-popup">
                        <h2 className="change-role-name-h1">  </h2>
                        <div className="roles-update-container">
                            <button onClick={() => this.ChoiceOfRole("Member")}> Member </button>
                            <button onClick={() => this.ChoiceOfRole("Employee")}> Employee </button>
                            <button onClick={() => this.ChoiceOfRole("Admin")}> Admin </button>
                        </div>
                        <div>
                            <button onClick={() => this.ReturnToEditPage()}> Return </button>
                        </div>
                    </div>
                </div>

                <div className="edit-user-data-full-popup">
                    <div className="edit-user-data-popup">
                        <h2> Edit user </h2>
                        <input id="edit-user-name-input"/>
                        <input id="edit-user-surname-input"/>
                        <input id="edit-user-email-input"/>
                        <div>
                            <button onClick={() => this.ReturnToEditPage()}> Return </button>
                            <button id="" className="update-user-data-btn" onClick={() => this.ChangeUserData(this.id)}> Update </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <EditUsersView />,
    document.getElementById('all-users-editing-view')
);