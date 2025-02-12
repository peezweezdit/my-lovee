document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".grid-gallery .image-container img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            let parent = this.parentNode;
            let text = parent.querySelector(".hidden-text");

            if (!text) {
                text = document.createElement("span");
                text.classList.add("hidden-text");
                text.textContent = "Ini adalah teks untuk gambar ini";
                parent.appendChild(text);
            }
            
            text.style.display = (text.style.display === "none" || text.style.display === "") ? "block" : "none";
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
