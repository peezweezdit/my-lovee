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
        musicIcon.innerHTML = "⏸ ılılılllıılılıllllıılılllıllı";
        window.globalMusic.isPlaying = true;
    }

    musicBtn.addEventListener("click", function () {
        if (window.globalMusic.paused) {
            window.globalMusic.play().catch(error => console.log("Playback error: ", error));
            musicIcon.innerHTML = "⏸ ılılılllıılılıllllıılılllıllı";
            sessionStorage.setItem("isPlaying", "true");
        } else {
            window.globalMusic.pause();
            musicIcon.innerHTML = "▶ ılılılllıılılıllllıılılllıllı";
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

    // Memastikan hanya satu video yang diputar dalam satu waktu
    const videos = document.querySelectorAll(".grid-gallery video");
    videos.forEach(video => {
        video.addEventListener("play", function () {
            videos.forEach(v => {
                if (v !== video) {
                    v.pause();
                }
            });
        });
    });

    // Animasi transisi saat video muncul
    videos.forEach((video, index) => {
        video.style.opacity = "0";
        video.style.transform = "translateY(50px)";
        setTimeout(() => {
            video.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
            video.style.opacity = "1";
            video.style.transform = "translateY(0)";
        }, index * 500);
    });

    // Menampilkan teks saat halaman digulir
    function revealTextOnScroll() {
        const hiddenTexts = document.querySelectorAll(".hidden-text");
        hiddenTexts.forEach((text, index) => {
            const rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && !text.classList.contains("visible")) { 
                setTimeout(() => {
                    text.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
                    text.style.opacity = "1"; // Muncul dengan fade-in
                    text.style.transform = "translateY(0)"; // Geser ke posisi normal
                    text.classList.add("visible"); // Hindari animasi berulang
                }, index * 200); // Tambahkan delay untuk efek bertahap
            }
        });
    }

    window.addEventListener("scroll", revealTextOnScroll);
    revealTextOnScroll(); // Panggil fungsi sekali saat halaman dimuat
});
