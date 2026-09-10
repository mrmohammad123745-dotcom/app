document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".btn-menu");
    const footer = document.querySelector("#scroll5");

    const observer = new IntersectionObserver(([entry]) => {
        button.classList.toggle("hide", entry.isIntersecting);
    });

    observer.observe(footer);
});
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