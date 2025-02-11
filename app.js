document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");
    
    musicBtn.addEventListener("click", function() {
        if (music.paused) {
            music.play();
            musicBtn.textContent = "Pause Music";
        } else {
            music.pause();
            musicBtn.textContent = "Play Music";
        }
    });

    // Page transition effect
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute("href");
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        });
    });
    
    document.body.style.opacity = 1;
});
