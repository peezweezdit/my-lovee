document.addEventListener("DOMContentLoaded", function () {
    if (!window.globalMusic) {
        window.globalMusic = new Audio("music.mp3");
        window.globalMusic.loop = true;
        window.globalMusic.volume = 1.0;
        window.globalMusic.playing = false;
    }

    const musicBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");
    
    let isPlaying = sessionStorage.getItem("isPlaying") === "true";
    
    if (isPlaying && !window.globalMusic.playing) {
        window.globalMusic.play().catch(error => console.log("Playback error: ", error));
        musicIcon.innerHTML = "⏸";
        window.globalMusic.playing = true;
    }

    musicBtn.addEventListener("click", function () {
        if (window.globalMusic.paused) {
            window.globalMusic.play().catch(error => console.log("Playback error: ", error));
            musicIcon.innerHTML = "⏸";
            sessionStorage.setItem("isPlaying", "true");
            window.globalMusic.playing = true;
        } else {
            window.globalMusic.pause();
            musicIcon.innerHTML = "▶";
            sessionStorage.setItem("isPlaying", "false");
            window.globalMusic.playing = false;
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            sessionStorage.setItem("musicPaused", window.globalMusic.paused);
        } else {
            if (sessionStorage.getItem("musicPaused") === "false" && window.globalMusic.paused) {
                window.globalMusic.play().catch(error => console.log("Playback error: ", error));
                window.globalMusic.playing = true;
            }
        }
    });
});
