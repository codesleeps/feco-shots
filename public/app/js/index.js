
// Register the Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Registered!😎", reg);
      })
      .catch((err) => {
        console.log("🤮 Registration failed: ", err);
      });
  });
}

// Get the button element with the ID "myBtn"
let mybutton = document.getElementById("myBtn");

// Scroll function for the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Display the "myBtn" button when scrolling down
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
