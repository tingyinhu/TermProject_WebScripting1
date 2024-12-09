// Ting Yin (Ellie) Hu, A01383988, Term proj.
// Hamburger Menu
// select the menu conteiner
const menu = document.querySelector(".site-header__menu"); 
// select the hamburger button
const hamburger = document.querySelector(".hamburger");
// select the "open menu" icon
const menuIcon = document.querySelector(".hamburger-icon");
// select the "close menu" icon
const closeIcon = document.querySelector(".close-icon");
// select the <body> element to control scrolling
const body = document.querySelector("body");

function menuAppear() {
    // if the menu is open
        // remove the .open to hide the menu
        // remove the .no-scroll to allow the page scrolling
        // hide the 'close' icon, and show the 'menu' icon
    // else, if the menu is closed
        // add the .open to show the menu
        // add the .no-scroll to restrict the page scrolling
        // show the 'close' icon, and close the 'menu' icon
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        body.classList.remove("no-scroll");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    } else {
        menu.classList.add("open");
        body.classList.add("no-scroll");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
}

// click the hamburger button to make the function wotks
hamburger.addEventListener("click", menuAppear);

// Flickity for Carousel
    // use JQuery syntax
    // select .main-carousel, and run the function
        // cellAlign: align the items to the center
        // wrapAround: allow infinite scroll
        // pageDots: has dots
        // autoPlay: interval to 1500ms
        // prevNextButtons: do not show the prev and next buttons
$(function () {
    $('.main-carousel').flickity({
        contain: true,
        cellAlign: 'center',
        wrapAround: true,
        pageDots: true,
        autoPlay: 1500,
        prevNextButtons: false,
    });
});

// Masonry for Grid Layout Animation
// select grid conteiner
const grid = document.querySelector('.grid');
// creating the Masonry Layout
const msnry = new Masonry(grid, {
    itemSelector: '.grid-item'
});
// function works when clicking on .grid-items
grid.addEventListener('click', function (event) {
    // if clicked element (event.target) is a .grid-item
    if (!matchesSelector(event.target, '.grid-item')) {
        return;
    }
    // remove the clicked item from the layout
    msnry.remove(event.target);
    // rearrange remaining grid items
    msnry.layout();
});

// use this method is because <img> tag can not be use in html, when using Masonry.
    // select All .grid-item Elements
const whyEatery = document.querySelectorAll('.grid-item');
    // for each .grid-item, look for data-image attribute
    // sets the background image to the URL
whyEatery.forEach((img) => {
    const imageUrl = img.getAttribute('data-image');
    img.style.backgroundImage = `url('${imageUrl}')`;
});


// Button Ripple Effect
function playRipple(event) {
    // get the button that was clicked.
    const button = event.currentTarget;
    // get the button's position on the browser.
    const buttonRect = button.getBoundingClientRect();
    // create a new span element to represent the ripple.
    const circle = document.createElement("span");
    // calculate the size of the ripple 
        //based on the larger side of the button
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    // get the radius of the ripple.
    const radius = diameter / 2;
    // set the width and height of the ripple to match the diameter
    circle.style.width = circle.style.height = `${diameter}px`;
    // position the ripple
    circle.style.left = `${event.clientX - (buttonRect.left + radius)}px`;
    circle.style.top = `${event.clientY - (buttonRect.top + radius)}px`;
    // add a ".ripple" to style the circle
    circle.classList.add("ripple");
    // remove any previous ripple, only one ripple will be at a time
    removeRipple(button);
    // add the ripple circle to the button
    button.appendChild(circle);
}
// removes the ripple circle after it has been created
function removeRipple(button) {
    // select the ripple circle in the button
    const ripple = button.querySelector(".ripple");
    if (ripple) {
        // if there is a ripple, remove 
        ripple.remove();
    }
}
// when clicking, trigger the ripple effect in each button
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', playRipple);
});


// Leaflet Map
    // Actually, this function is from Leaflet doc.
    // I am not 100% know the sybtax.
        // So i just comment what i know.
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map').setView([49.288, -123.111], 15);
    // Add a tile layer?
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    // Add a marker?
    var marker = L.marker([49.288, -123.111]).addTo(map);
    marker.bindPopup("<b>Canada Place</b><br>A beautiful landmark in Vancouver.").openPopup();

    var popup = L.popup();
    // Add click event for map
    map.on('click', function (e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    });
});

// ScrollReveal Animation
ScrollReveal({ reset: true });
// Reveal the element with the .ingredients__pic after a 300ms delay.
ScrollReveal().reveal('.ingredients__pic', { delay: 300 });
// Reveal the element with the .ingredients__text after a 400ms delay.
ScrollReveal().reveal('.ingredients__text', { delay: 400 });

// jQuery Form Validation
// .ready makes sure the code runs after the page is loaded
$(document).ready(function () {
    // select the ID 'contact-form'
    $("#contact-form").validate({
        rules: {
            name: {
                required: true, // Name field is required.
                minlength: 2, // Name must be at least 2 characters long.
            },
            email: {
                required: true, // Email field is required.
                email: true, // Email must be a valid email format.
            },
            message: {
                required: true, // Message field is required.
                minlength: 10, // at least 10 characters long.
                maxlength: 165, // cannot be longer than 165 characters
            },
        },
        messages: {
            // Custom messages to show when validation fails for each field.
            name: {
                required: "Please enter your name.",
                minlength: "Your name must be at least 2 characters long.",
            },
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address.",
            },
            message: {
                required: "Please enter a message.",
                minlength: "Your message must be at least 10 characters long.",
                maxlength: "Your message must not exceed 165 characters.",
            },
        },
        // the error messages will be displayed
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        // function is called when the form is successfully validated.
        submitHandler: function (form) {
            alert("Form submitted successfully!");
            form.submit();
            
        },
    });
});
