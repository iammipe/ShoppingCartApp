var images = new Array()

function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image()
        images[i].src = preload.arguments[i]
    }
}

preload(
    "../images/rm.jpg",
    "../images/audem.jpg",
    "../images/RM11-03-Transparent.jpg",
    "../images/dark-side.jpg",
    "../images/return.png"
)