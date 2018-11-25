class ShoppingItems extends React.Component {
        
    state = {
        productsInState: 0,
        products: []
    }

    constructor(props) {
        super(props);
        this.addItemToCart = this.addItemToCart.bind(this);
    }

    searchItemsAndUpdateState(x) {
        console.log("Shopping items is saying: " + x);
        
        $.ajax({
            url: "/Home/GetSearchedProducts",
            type: "POST",
            data: { "userData": x },
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                alert("fails");
            }.bind(this)
        });
    }

    getTopData() {
        $.ajax({
            url: "/Home/GetTopProducts",
            type: "POST",
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                alert("fails");
            }.bind(this)
        });
    }

    getAllData() {
        $.ajax({
            url: "/Home/GetAllProducts",
            type: "POST",
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                alert("fails");
            }.bind(this)
        });
    }

    addItemToCart(index) {
        $.ajax({
            url: "/Cart/AddToCart",
            type: "POST",
            data: { "id": index },
            success: function (nameOfItem) {
                //alert("You just added " + nameOfItem + " to your cart!");
            },
            error: function () {
                window.location.href = "/Login";
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
                                    <button aria-label="Add item" onClick={() => this.addItemToCart(item.id)}> </button>
                                </div>
                            </div>
                        )
                    }
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