function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}
function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}

const texts = ["DESIGN", "DEVELOP APPLICATIONS", "PHOTOGRAPH", "EDIT"];

let speed = 100;
const textElements = document.querySelector(".typewriter_text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
  if (characterIndex < texts[textIndex].length) {
    textElements.innerHTML += texts[textIndex].charAt(characterIndex);
    characterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 1000);
  }
}
window.onload = function () {
  // Start typewriter
  typeWriter();

  // Reveal page (slide overlay up)
  const overlay = document.getElementById("pageOverlay");
  if (overlay) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("reveal");
      });
    });
  }
};

function eraseText() {
  if (textElements.innerHTML.length > 0) {
    textElements.innerHTML = textElements.innerHTML.slice(0, -1);
    setTimeout(eraseText, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    characterIndex = 0;
    setTimeout(typeWriter, 500);
  }
}

// ── Page transition: intercept nav-link clicks ──
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target =
        this.getAttribute("data-target") || this.getAttribute("href");
      const overlay = document.getElementById("pageOverlay");

      if (overlay) {
        // Slide overlay back down to cover the page
        overlay.style.transition =
          "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)";
        overlay.classList.remove("reveal");

        setTimeout(() => {
          window.location.href = target;
        }, 500);
      } else {
        window.location.href = target;
      }
    });
  });
});
