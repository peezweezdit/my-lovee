document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".grid-gallery img");
    
    images.forEach(img => {
        img.addEventListener("click", function () {
            let text = this.nextElementSibling;
            if (text && text.classList.contains("hidden-text")) {
                text.style.display = text.style.display === "none" ? "block" : "none";
            }
        });
    });

    // Background music control
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    musicBtn.addEventListener("click", function () {
        if (music.paused) {
            music.play();
            musicBtn.textContent = "Pause Music";
        } else {
            music.pause();
            musicBtn.textContent = "Play Music";
        }
    });
});
