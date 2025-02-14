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
    if (!window.globalMusic) {
        window.globalMusic = new Audio("music.mp3");
        window.globalMusic.loop = true;
    }

    const musicBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");
    
    if (sessionStorage.getItem("isPlaying") === "true") {
        window.globalMusic.play();
        musicIcon.innerHTML = "⏸";
    }

    musicBtn.addEventListener("click", function () {
        if (window.globalMusic.paused) {
            window.globalMusic.play();
            musicIcon.innerHTML = "⏸";
            sessionStorage.setItem("isPlaying", "true");
        } else {
            window.globalMusic.pause();
            musicIcon.innerHTML = "▶";
            sessionStorage.setItem("isPlaying", "false");
        }
    });
});
