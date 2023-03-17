const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar li');
const toggleNav = document.querySelector('.hamburger');
const toggleNavBars = document.querySelectorAll('.hamburger span');
const mainBody = document.querySelector('body');
const aboutSection = document.querySelector('#about');

toggleNav.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mainBody.classList.toggle('unfocus');
});

navLinks.forEach((li) => {
    li.addEventListener("click", (e) => {
        li.classList.add("active");
        navLinks.forEach((el) => el.classList.remove("active"));
        navbar.classList.toggle('active');
        mainBody.classList.toggle('unfocus');
    });
});
