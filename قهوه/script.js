document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".btn-menu");
    const footer = document.querySelector("#scroll5");

    const observer = new IntersectionObserver(([entry]) => {
        button.classList.toggle("hide", entry.isIntersecting);
    });

    observer.observe(footer);
});