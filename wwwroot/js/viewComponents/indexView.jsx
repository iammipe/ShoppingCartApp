import MainIntro from "../components/mainIntro.jsx";
import ShoppingItems from "../components/shoppingitems.jsx";
import GentlemanWallpaper from "../components/gentlemanWallpaper.jsx";


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.shoppingItem = React.createRef();
    }

    componentDidMount() {
        this.shoppingItem.current.getTopData();
        $(".loading-screen").css("display", "none");
    }

    render() {
        return (
            <div>
                <div id="main">
                    <MainIntro />
                </div>

                <div id="content">
                    <ShoppingItems
                        ref={this.shoppingItem}
                    />
                </div>

                <div id="footer">
                    <GentlemanWallpaper />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Products />,
    document.getElementById('index-view')
);