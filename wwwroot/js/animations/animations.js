var counter = 0;

$(".menu-bar-toggle").click(function () {
    if (counter % 2 == 0) {
        $(".menu-bar-options").css("display", "flex");
    }
    else {
        $(".menu-bar-options").css("display", "none");
    }

    counter++;
});

var images = new Array()
function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image()
        images[i].src = preload.arguments[i]
    }
}
preload(
    "../images/rm.jpg",
    "../images/audem.webp",
    "../images/rm11-03-transparent.webp",
    "../images/dark-side.webp"
)