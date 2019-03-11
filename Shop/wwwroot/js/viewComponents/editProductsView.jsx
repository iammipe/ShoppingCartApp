class EditingShoppingItems extends React.Component {

    state = {
        productsInState: 0,
        products: []
    }

    constructor(props) {
        super(props);
    }

    /*
     NAKON ŠTO SE KOMPONENTA MOUNTALA, MAKNI LOADING ICON 
     */
    componentDidMount() {
        this.getAllData();
        $(".loading-screen").css("display", "none");
        $("#edit-products-link").css("color", "white");
    }

    /*
     SA SERVERA DOHVATI SVE PROIZVODE IZ BAZE PODATAKA
     */
    getAllData() {
        $.ajax({
            url: "/Home/GetAllProducts",
            type: "POST",
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    /*
        FUNKCIJA LOKALNO IZMJENJIVA VRIJEDNOSTI JE LI PRODUCT TOP ILI NE 
        TOP PRODUCT = PRODUCT NA NASLOVNOJ STRANICI
     */
    SetTopProductBoolean(isTopProduct) {
        if (isTopProduct)
            return "Remove from top";
        else
            return "Set as top";
    }

    /*
     FUNKCIJA SALJE ZAHTJEV NA SERVER DA SE NAKON KLIKA USERA U BAZI PODATAKA NEKI PROIZVOD POSTAVI NA TOP ILI SKINE SA TOP PROZIVODA
     */
    SetTopElement(event) {
        var wantedProducts = event.target.id; 
        $.ajax({
            url: "/Products/SetTopProduct",
            type: "POST",
            data: { "id": wantedProducts },
            success: function (variable) {
                $("#" + wantedProducts + ".set-new-top-products").text(this.SetTopProductBoolean(variable));
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    /*
     FUNKCIJA BRISE ODREDENI PROIZVOD IZ BAZE PODATAKA 
     */
    DeleteSpecificItem(event) {
        var wantedProducts = event.target.id;

        $.ajax({
            url: "/Products/DeleteProduct",
            type: "POST",
            data: { "id": wantedProducts },
            success: function () {
                $("tbody tr#" + wantedProducts).remove();
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    /*
     PRIKAZIVA ADMINU/EMPLOYEEU NA EKRAN POPUP ZA DODAVANJE PROIZVODA U BAZU PODATAKA 
     */
    AddNewProductPopUp() {
        $(".add-product-full-popup").css("display", "flex");
    }

    /*
     SKRIVANJE POPUPA OD ADMINA/EMPLOYEEA
     */
    ReturnToProductsPage() {
        $(".add-product-full-popup").css("display", "none");
        $(".edit-product-full-popup").css("display", "none");
    }

    /*
     ZAHTJEV NA SERVER ZA DODAVANJE PROIZVODA U BAZU PODATAKA 
     */ 
    AddNewProduct() {
        var nameOfProduct = $("#name-of-new-product").val();
        var priceOfProduct = $("#price-of-new-product").val();
        var urlOfProduct = $("#url-of-new-product").val();

        $.ajax({
            url: "/Products/AddNewProduct",
            type: "POST",
            data: { "name": nameOfProduct, "price": priceOfProduct, "url": urlOfProduct },
            success: function () {
                $(".add-product-full-popup").css("display", "none");
                this.getAllData();
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    /*
     PRIKAZIVANJE UPDATE POPUP-A
     UBACIVA SE U POPUP TOČNO IME, CIJENA I URL TOG KLIKNUTOG PROIZVODA 
     */
    UpdateClickedUser(id, name, price, url) {
        var text = "Change product data of " + name + "!";
        $(".change-product-h1").text(text);
        $('.change-product-h1').attr('id', id);
        $("#edit-current-product-name").val(name);
        $("#edit-current-product-price").val(price);
        $("#edit-current-product-url").val(url);
        $(".edit-product-full-popup").css("display", "flex");
    }

    /*
     ZAHTJEV NA SERVER ZA UREĐIVANJE SPECIFIČNOG PROIZVODA U BAZU PODATAKA 
     */
    EditProduct() {
        var id = $('.change-product-h1').attr('id');
        var nameOfProduct = $("#edit-current-product-name").val();
        var priceOfProduct =  $("#edit-current-product-price").val();
        var urlOfProduct = $("#edit-current-product-url").val();

        $.ajax({
            url: "/Products/EditProduct",
            type: "POST",
            data: { "id": id, "name": nameOfProduct, "price": priceOfProduct, "url": urlOfProduct },
            success: function () {
                $(".edit-product-full-popup").css("display", "none");
                this.getAllData();
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    render() {

        console.log(this.state.products);
        return (
            <div className="products-main-item-container">
                <table id="items-table">
                    <thead>
                        <tr id="items-table-first-child" className="thead">
                            <th>Name</th>
                            <th>Price</th>
                            <th>URL</th>
                            <th>Is top product</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map(item =>
                                <tr key={item.id} id={item.id}>
                                    <td onClick={() => this.UpdateClickedUser(item.id, item.name, item.price, item.imageURL)}>{item.name} </td>
                                    <td onClick={() => this.UpdateClickedUser(item.id, item.name, item.price, item.imageURL)}>{item.price} USD </td>
                                    <td onClick={() => this.UpdateClickedUser(item.id, item.name, item.price, item.imageURL)} className="table-links"> Set new URL </td>
                                    <td className="table-links set-new-top-products"
                                        id={item.id}
                                        onClick={(e) => {
                                            this.SetTopElement(e)
                                        }}> {this.SetTopProductBoolean(item.isTopProduct)} </td>
                                    <td className="table-links"
                                        id={item.id}
                                        onClick={(e) => {
                                            this.DeleteSpecificItem(e)
                                        }}> Delete </td>
                                </tr>

                            )
                        }
                        <tr>
                            <th colSpan="5"></th>
                        </tr>
                        <tr>
                            <th colSpan="5" onClick={() => this.AddNewProductPopUp()}>Add new item</th>
                        </tr>
                    </tbody>
                </table>

                <div className="add-product-full-popup">
                    <div className="add-product-data-popup">
                        <h2> Add product </h2>
                        <input placeholder="Name" id="name-of-new-product" />
                        <input placeholder="Price" id="price-of-new-product" />
                        <input placeholder="URL" id="url-of-new-product" />
                        <div>
                            <button onClick={() => this.ReturnToProductsPage()}> Return </button>
                            <button onClick={() => this.AddNewProduct()}> Add a product </button>
                        </div>
                    </div>
                </div>

                <div className="edit-product-full-popup">
                    <div className="edit-product-data-popup">
                        <h2 className="change-product-h1"> </h2>
                        <input id="edit-current-product-name" />
                        <input id="edit-current-product-price" />
                        <input id="edit-current-product-url" />
                        <div>
                            <button onClick={() => this.ReturnToProductsPage()}> Return </button>
                            <button id="edit-product-btn" onClick={() => this.EditProduct()}> Edit a product </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <EditingShoppingItems />,
    document.getElementById('all-products-editing-view')
);