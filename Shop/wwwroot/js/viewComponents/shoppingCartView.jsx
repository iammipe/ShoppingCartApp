class ShoppingCart extends React.Component {

    state = {
        PriceWithoutDiscountState: 0,
        DiscountState: 0,
        TotalState: 0,
        ShoppingCartItemsState: []
    }

    constructor(props) {
        super(props);
        this.addOneMoreItemQuantityToShoppingBag = this.addOneMoreItemQuantityToShoppingBag.bind(this);
        this.removeOneItemQuantityFromShoppingBag = this.removeOneItemQuantityFromShoppingBag.bind(this);
        this.removeItemFromShoppingCart = this.removeItemFromShoppingCart.bind(this);
    }

    componentDidMount() {
        this.getData();
        $(".loading-screen").css("display", "none");
        $("#my-shop-cart-link").css("color", "white");
    }

    /*
        DOHVATI KOSARICU SA SERVERA
     */
    getData() {
        $.ajax({
            url: "/Cart/GetShoppingCart",
            type: "POST",
            success: function (json) {
                this.setState({
                    ShoppingCartItemsState: json.shoppingCartItems,
                    PriceWithoutDiscountState: json.priceWithoutDiscount,
                    DiscountState: json.discount,
                    TotalState: json.total
                });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    /**
        DOHVATI UKUPAN BROJ PROIZVODA U KOSARICI
     */
    getQuantityOfItemInShoppingBagFromCurrentState(id) {
        for (var j = 0; j < this.state.ShoppingCartItemsState.length; j++) {
            if (this.state.ShoppingCartItemsState[j].product.id === id)
                return this.state.ShoppingCartItemsState[j].quantity;
        }
    }

    /**
        ZAHTJEV NA SERVER ZA UREĐIVANJE VRIJEDNOSTI KOLIČINE - QUANTITY, PROIZVODU SA IDJEM - ID
     */
    updateQuantityInDatabase(id, quantity) {
        $.ajax({
            url: "/Cart/UpdateItemQuantity",
            data: { "id": id, "quantity": quantity },
            type: "POST",
            success: function () {
                this.getData();
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }


    addOneMoreItemQuantityToShoppingBag(id) {
        var quantity = this.getQuantityOfItemInShoppingBagFromCurrentState(id);
        quantity++;
        this.updateQuantityInDatabase(id, quantity);
    }

    removeOneItemQuantityFromShoppingBag(id) {
        var quantity = this.getQuantityOfItemInShoppingBagFromCurrentState(id);
        if (quantity !== 1)
            quantity--;
        this.updateQuantityInDatabase(id, quantity);
    }

    removeItemFromShoppingCart(id) {
        $.ajax({
            url: "/Cart/RemoveFromCart",
            data: { "id": id },
            type: "POST",
            success: function () {
                this.getData();
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    BackToShoppingButtonIsClicked() {
        window.history.back();
    }

    render() {
        if (this.state.ShoppingCartItemsState.length === 0) {
            return (
                <h1 id="empty-cart"> Your shopping cart is empty </h1>
            );
        }

        return (
            <div>
                <h1 id="title"> My shopping cart </h1>
                <div className="shopping-cart-container">
                    <div className="product-container">
                        <div> <p> Description </p> </div>
                        <div> <p> Quantity </p> </div>
                        <div> <p> Remove </p> </div>
                        <div> <p> Price </p> </div>
                    </div>

                    <hr />
                    {
                        this.state.ShoppingCartItemsState.map(item =>
                            <div key={item.product.id} className="product-container">
                                <div><p> {item.product.name} </p> </div>
                                <div className="quantity-container">
                                    <button onClick={() => this.removeOneItemQuantityFromShoppingBag(item.product.id)}> - </button>
                                    <p> {item.quantity} </p>
                                    <button onClick={() => this.addOneMoreItemQuantityToShoppingBag(item.product.id)}> + </button>
                                </div>
                                <div> <button onClick={() => this.removeItemFromShoppingCart(item.product.id)}> x </button> </div>
                                <div> <p> $ {item.product.price} </p> </div>
                            </div>
                        )
                    }
                    <div className="prices-div">
                        <div className="price-container"> <p> Subtotal </p> <p> ${this.state.PriceWithoutDiscountState} </p> </div>
                        <div className="price-container"> <p> Discount </p> <p> ${this.state.DiscountState} </p> </div>
                        <div className="price-container"> <p> Total </p> <p> ${this.state.TotalState} </p> </div>
                        <div className="price-container"> <p> PLACE ORDER </p> </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ShoppingCart />,
    document.getElementById('content')
);