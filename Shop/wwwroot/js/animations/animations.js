var counter = 0;

$(".menu-bar-toggle").click(function () {
    if (counter % 2 == 0) {
        $(".menu-bar-options").css("display", "flex");
        $(".menu-bar-toggle img").attr("src", "/images/return.png");
    }
    else {
        $(".menu-bar-options").css("display", "none");
        $(".menu-bar-toggle img").attr("src", "/images/hamicon.webp");
    }

    counter++;
});