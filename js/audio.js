/*==========================================================
CASE FILE #0701
AUDIO ENGINE
==========================================================*/

class AudioEngine {

    constructor() {

        this.audio =
            document.getElementById("bgMusic");

        this.button =
            document.getElementById("musicButton");

        this.begin =
            document.getElementById("btnBegin");

        if (!this.audio || !this.button) return;

        this.volume = 0.35;

        this.fadeInterval = null;

        this.init();

    }

    /*======================================================
    INIT
    ======================================================*/

    init() {

        this.audio.volume = 0;

        this.restoreState();

        this.events();

    }

    /*======================================================
    EVENTS
    ======================================================*/

    events() {

        if (this.begin) {

            this.begin.addEventListener("click", () => {

                this.start();

            });

        }

        this.button.addEventListener("click", () => {

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

    /*======================================================
    START
    ======================================================*/

    start() {

        this.audio.play()
            .then(() => {

                this.audio.muted = false;

                this.fadeIn();

                this.button.classList.add("playing");

                this.button.innerHTML = "♫";

                localStorage.setItem(
                    "casefile_music",
                    "on"
                );

            })
            .catch(() => {

                console.warn(
                    "Audio autoplay blocked."
                );

            });

    }

    /*======================================================
    FADE IN
    ======================================================*/

    fadeIn() {

        clearInterval(this.fadeInterval);

        this.audio.volume = 0;

        this.fadeInterval = setInterval(() => {

            if (this.audio.volume < this.volume) {

                this.audio.volume =
                    Math.min(
                        this.volume,
                        this.audio.volume + 0.02
                    );

            } else {

                clearInterval(this.fadeInterval);

            }

        }, 120);

    }

    /*======================================================
    FADE OUT
    ======================================================*/

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

    /*======================================================
    MUTE
    ======================================================*/

    mute() {

        this.fadeOut(() => {

            this.audio.muted = true;

            this.button.classList.remove("playing");

            this.button.innerHTML = "🔇";

            localStorage.setItem(
                "casefile_music",
                "off"
            );

        });

    }

    /*======================================================
    UNMUTE
    ======================================================*/

    unmute() {

        this.audio.muted = false;

        this.fadeIn();

        this.button.classList.add("playing");

        this.button.innerHTML = "♫";

        localStorage.setItem(
            "casefile_music",
            "on"
        );

    }

    /*======================================================
    RESTORE STATE
    ======================================================*/

    restoreState() {

        const state =
            localStorage.getItem(
                "casefile_music"
            );

        if (state === "off") {

            this.button.innerHTML = "🔇";

            this.audio.muted = true;

        } else {

            this.button.innerHTML = "♫";

        }

    }

}

window.audioEngine =
    new AudioEngine();