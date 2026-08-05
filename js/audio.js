/*==========================================================
CASE FILE #0701
AUDIO ENGINE
==========================================================*/

class AudioEngine {

    constructor() {
        this.audio = document.getElementById("bgMusic");
        this.button = document.getElementById("musicButton");
        this.begin = document.getElementById("btnBegin");

        if (!this.audio || !this.button) return;

        this.targetVolume = 0.35;
        this.fadeInterval = null;

        this.init();
    }

    init() {
        this.audio.volume = 0;
        this.restoreState();
        this.events();
    }

    events() {
        if (this.begin) {
            this.begin.addEventListener("click", () => this.start());
        }

        this.button.addEventListener("click", (e) => {
            e.stopPropagation();
            if (this.audio.paused) {
                this.start();
            } else {
                if (this.audio.muted) {
                    this.unmute();
                } else {
                    this.mute();
                }
            }
        });
    }

    start() {
        this.audio.play().then(() => {
            this.audio.muted = false;
            this.fadeIn();
            this.button.innerHTML = "♫";
            localStorage.setItem("casefile_music", "on");
        }).catch(() => {
            console.warn("Audio autoplay prevented by browser.");
        });
    }

    fadeIn() {
        clearInterval(this.fadeInterval);
        this.fadeInterval = setInterval(() => {
            if (this.audio.volume < this.targetVolume) {
                this.audio.volume = Math.min(this.targetVolume, this.audio.volume + 0.02);
            } else {
                clearInterval(this.fadeInterval);
            }
        }, 100);
    }

    fadeOut(callback = null) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = setInterval(() => {
            if (this.audio.volume > 0.02) {
                this.audio.volume -= 0.02;
            } else {
                clearInterval(this.fadeInterval);
                this.audio.volume = 0;
                if (callback) callback();
            }
        }, 80);
    }

    mute() {
        this.fadeOut(() => {
            this.audio.muted = true;
            this.button.innerHTML = "🔇";
            localStorage.setItem("casefile_music", "off");
        });
    }

    unmute() {
        this.audio.muted = false;
        this.fadeIn();
        this.button.innerHTML = "♫";
        localStorage.setItem("casefile_music", "on");
    }

    restoreState() {
        const state = localStorage.getItem("casefile_music");
        if (state === "off") {
            this.button.innerHTML = "🔇";
            this.audio.muted = true;
        } else {
            this.button.innerHTML = "♫";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.audioEngine = new AudioEngine();
});