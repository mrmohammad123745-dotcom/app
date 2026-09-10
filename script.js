
const menuBtn = document.querySelector(".menu-icon");
const menu = document.querySelector(".nav-list");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("open");
});
const links = document.querySelectorAll(".nav-list a");

links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuBtn.classList.remove("open");
    });
});
window.addEventListener("load", () => {

    const coffeeLoader =
        document.getElementById("coffee-loader");

    if (!coffeeLoader) return;

    setTimeout(() => {

        coffeeLoader.classList.add(
            "coffee-loader-hidden"
        );

        setTimeout(() => {
            coffeeLoader.remove();
        }, 900);

    }, 700);

});