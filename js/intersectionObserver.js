const featured = document.querySelector('#featured-list');
const main = document.querySelector('main');
const landingBtn = document.querySelector('#landing button');

landingBtn.addEventListener('click', function () {
    main.scrollIntoView({
        behavior: 'smooth'
    });
    // featured.classList.add('visible');
});

// Create an IntersectionObserver
var observer = new IntersectionObserver(function(entries) {
    // Check if the element is intersecting
    if (entries[0].isIntersecting) {
        // Add the class to the element to trigger the animation
        featured.classList.add("visible");
        // Stop observing the element
        observer.unobserve(featured);
    }
});

// Start observing the element
observer.observe(featured);