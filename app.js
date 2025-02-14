document.addEventListener("DOMContentLoaded", function () {
    if (!window.globalMusic) {
        window.globalMusic = new Audio("music.mp3");
        window.globalMusic.loop = true;
        window.globalMusic.volume = 1.0;
        window.globalMusic.isPlaying = false;
        document.body.appendChild(window.globalMusic);
    }

    const musicBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");
    
    let isPlaying = sessionStorage.getItem("isPlaying") === "true";
    
    if (isPlaying && window.globalMusic.paused) {
        window.globalMusic.play().catch(error => console.log("Playback error: ", error));
        musicIcon.innerHTML = "⏸";
        window.globalMusic.isPlaying = true;
    }

    musicBtn.addEventListener("click", function () {
        if (window.globalMusic.paused) {
            window.globalMusic.play().catch(error => console.log("Playback error: ", error));
            musicIcon.innerHTML = "⏸";
            sessionStorage.setItem("isPlaying", "true");
        } else {
            window.globalMusic.pause();
            musicIcon.innerHTML = "▶";
            sessionStorage.setItem("isPlaying", "false");
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            sessionStorage.setItem("musicPaused", window.globalMusic.paused);
        } else {
            if (sessionStorage.getItem("musicPaused") === "false" && window.globalMusic.paused) {
                window.globalMusic.play().catch(error => console.log("Playback error: ", error));
            }
        }
    });

    // Menampilkan hidden text secara otomatis dengan animasi
    const hiddenTexts = document.querySelectorAll(".hidden-text");
    hiddenTexts.forEach((text, index) => {
        setTimeout(() => {
            text.style.display = "flex";
            text.style.justifyContent = "center";
            text.style.alignItems = "center";
            text.style.opacity = "0";
            text.style.transition = "opacity 0.8s ease-in-out";
            setTimeout(() => {
                text.style.opacity = "1";
            }, 50);
        }, index * 1000); // Muncul satu per satu setiap 1 detik
    });

    // Tampilkan gambar full-screen
    const images = document.querySelectorAll(".image-container img");
    images.forEach(img => {
        img.addEventListener("click", function () {
            let lightbox = document.createElement("div");
            lightbox.id = "lightbox";
            lightbox.style.position = "fixed";
            lightbox.style.top = "0";
            lightbox.style.left = "0";
            lightbox.style.width = "100vw";
            lightbox.style.height = "100vh";
            lightbox.style.background = "rgba(0, 0, 0, 0.8)";
            lightbox.style.display = "flex";
            lightbox.style.justifyContent = "center";
            lightbox.style.alignItems = "center";
            lightbox.style.zIndex = "1000";
            
            let imgFull = document.createElement("img");
            imgFull.src = this.getAttribute("src");
            imgFull.style.maxWidth = "90%";
            imgFull.style.maxHeight = "90%";
            imgFull.style.borderRadius = "10px";
            imgFull.style.display = "block";
            
            let closeBtn = document.createElement("span");
            closeBtn.innerHTML = "❌";
            closeBtn.style.position = "absolute";
            closeBtn.style.top = "20px";
            closeBtn.style.right = "30px";
            closeBtn.style.fontSize = "30px";
            closeBtn.style.color = "white";
            closeBtn.style.cursor = "pointer";

            closeBtn.addEventListener("click", function () {
                document.body.removeChild(lightbox);
            });

            lightbox.appendChild(imgFull);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
        });
    });
});
