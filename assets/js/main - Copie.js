jQuery(window).on("load", function () {
  "use strict";

  // HIDE PRELOADER
  $(".preloader").addClass("hide-preloader");

  // SHOW/ANIMATE ANIMATION CONTAINER
  setTimeout(function () {
    $("#intro .animation-container").each(function () {
      var e = $(this);

      setTimeout(function () {
        e.addClass("run-animation");
      }, e.data("animation-delay"));
    });
  }, 700);
});

jQuery(document).ready(function ($) {
  "use strict";

  // SMOOTH SCROLL FOR SAME PAGE LINKS
  $(document).on("click", "a.smooth-scroll", function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 130,
      },
      1000
    );
  });

  // SCROLL REVEAL SETUP
  window.sr = ScrollReveal();
  sr.reveal(".scroll-animated", {
    duration: 600,
    delay: 0,
    origin: "left",
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    distance: "20vh",
    viewFactor: 0.4,
    scale: 1,
  });

  // AJAX CONTACT FORM SUBMIT
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    var postdata = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "assets/php/contact.php",
      data: postdata,
      dataType: "json",
      success: function (json) {
        $("#contact-form input, #contact-form textarea").removeClass("error");

        setTimeout(function () {
          if (json.nameMessage !== "") {
            $("#contact-form-name").addClass("error");
          }

          if (json.emailMessage !== "") {
            $("#contact-form-email").addClass("error");
          }

          if (json.messageMessage !== "") {
            $("#contact-form-message").addClass("error");
          }
        }, 10);

        if (
          json.nameMessage === "" &&
          json.emailMessage === "" &&
          json.messageMessage === ""
        ) {
          $(
            "#contact-form.error input, #contact-form.error textarea"
          ).removeClass("error");
          $("#contact-form").addClass("success");
          $("#contact-form textarea, #contact-form input").val("");

          setTimeout(function () {
            $("#contact-form").removeClass("success");
          }, 4000);
        }
      },
    });
  });
});

//////// STICKY HEADER //////////

const nav = document.querySelector(".menu-container");

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the header
const header = document.getElementById("myHeader");
const section1 = document.getElementById("intro");
// const navHeight = nav.getBoundingClientRect().height;

// Get the offset position of the navbar
const sticky = header.offsetTop;
const initialCoords = section1.getBoundingClientRect();
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.scrollY > initialCoords.top) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
