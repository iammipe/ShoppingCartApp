class ShoppingItems extends React.Component {
        
    state = {
        productsInState: 0,
        products: []
    }

    /*
        KONSTRUKTOR - Deklariranje lokalnih funkcija
     */
    constructor(props) {
        super(props);
        this.addItemToCart = this.addItemToCart.bind(this); 
        this.ReturnToShopping = this.ReturnToShopping.bind(this);
        this.GoToShoppingCart = this.GoToShoppingCart.bind(this);
    }

    /*
        Funkcija prima varijablu "x" koja je vrijednost "input" search komponente
        AJAX zahtjev se poziva i vraca sa backenda sve proizvode koji u sebi sadrže varijablu x i sprema u state
     */
    searchItemsAndUpdateState(x) {
        $.ajax({
            url: "/Home/GetSearchedProducts",
            type: "POST",
            data: { "userData": x },
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    /*
        AJAX zahtjev se poziva i vraca sa backenda sve top proizvode i sprema u state
     */
    getTopData() {
        $.ajax({
            url: "/Home/GetTopProducts",
            type: "POST",
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });

        this.CheckWhichRoleIsLoggedIn();
    }
    /*
        AJAX zahtjev se poziva i vraca sa backenda sve proizvode i sprema u state
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
        
        this.CheckWhichRoleIsLoggedIn();
    }

    /*
        Funkcija prima varijablu "index" koja je id od proizvoda
        AJAX zahtjev se poziva i dodaje proizvod u kosaricu
     */
    addItemToCart(index) {
        $.ajax({
            url: "/Cart/AddToCart",
            type: "POST",
            data: { "id": index },
            success: function (nameOfItem) {
                $(".added-to-shopping-cart-full-popup").css("display", "flex");
            },
            error: function () {
                window.location.href = "/Login";
            }
        });
    }

    /*
        POP UP - Dodavanje itema u kosaricu 
     */
    ReturnToShopping() {
        $(".added-to-shopping-cart-full-popup").css("display", "none");
    }

    /*
        POP UP - Dodavanje itema u kosaricu 
     */
    GoToShoppingCart() {
        window.location = "/Cart";
    }

    /*
        PROVJERAVA KOJA JE ROLA USER TAKO DA MOZE HIDE-AT ADD TO CART BOTUN
        JER EMPLOYEE I ADMIN NEMOGU DODAT TO CART
      */
    CheckWhichRoleIsLoggedIn() {
        $.ajax({
            url: "/Users/CurrentUserRoleIsLoggedInAsync",
            type: "POST",
            success: function (role) {
                if (role === "Member" || role === "Unauthorize")
                    $(".add-to-cart-button").css("dislay", "flex");
                else {
                    $(".add-to-cart-button").css("display", "none");
                }
            },
            error: function () {
                window.location.href = "/Error";
            }
        });
    }


    render() {
        console.log(this.state.products);
        if (this.state.products.length !== 0 || this.state.products == "undefined") {
            return (
                <div className="container">
                    {
                        this.state.products.map(item =>
                            <div key={item.id} className="item-container">
                                <div className="item-container-image">
                                    <img className="lazyload" data-src={item.imageURL} />
                                </div>

                                <div className="item-data">
                                    <div>
                                        <p className="item-name"> {item.name}</p>
                                        <p className="item-price"> {item.price} USD</p>
                                    </div>

                                    <button aria-label="Add item" className="add-to-cart-button" onClick={() => this.addItemToCart(item.id)}> </button>
                                </div>
                            </div>
                        )
                    }
                    <div className="added-to-shopping-cart-full-popup">
                        <div className="added-to-shopping-cart-popup">
                            <img src="../images/added.png" />
                            <h2> Product is added to Shopping Cart </h2>
                            <div>
                                <button onClick={() => this.ReturnToShopping()}> Return to shopping </button>
                                <button onClick={() => this.GoToShoppingCart()}> Go to shopping cart </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div id="empty-search-container">
                    <h2>We're sorry :(  </h2>
                    <h2>There are no products matching your search </h2>

                </div>
             )
        }
    }
}

export default ShoppingItems;