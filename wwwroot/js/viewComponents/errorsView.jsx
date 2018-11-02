class Errors extends React.Component {
    componentDidMount() {
        $(".loading-screen").css("display", "none");
    }

    render() {
        return (
            <div>
                <h2> Oooups.  </h2>
                <h1> YOU JUST CAME TO THE DARK SIDE  </h1>
                <h2> Error just occurred. Return to <a href="/"> main page </a> </h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Errors />,
    document.getElementById('errors')
);