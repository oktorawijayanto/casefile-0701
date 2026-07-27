/*==========================================================
CASE FILE #0701
GALLERY ENGINE
==========================================================*/

class Gallery {

    constructor() {

        this.slides = [
            ...document.querySelectorAll(".gallery-item")
        ];

        this.prev =
            document.getElementById("galleryPrev");

        this.next =
            document.getElementById("galleryNext");

        this.current = 0;

        this.autoPlay = true;

        this.interval = 6000;

        this.timer = null;

        this.touchStart = 0;
        this.touchEnd = 0;

        if (this.slides.length === 0) return;

        this.init();

    }

    init() {

        this.show(0);

        this.bindButtons();

        this.bindKeyboard();

        this.bindTouch();

        this.start();

    }

    /*======================================================
    SHOW SLIDE
    ======================================================*/

    show(index) {

        if (index < 0)
            index = this.slides.length - 1;

        if (index >= this.slides.length)
            index = 0;

        this.slides.forEach(slide => {

            slide.classList.remove("active");

        });

        this.slides[index].classList.add("active");

        this.current = index;

    }

    /*======================================================
    NEXT
    ======================================================*/

    nextSlide() {

        this.show(this.current + 1);

    }

    /*======================================================
    PREVIOUS
    ======================================================*/

    previousSlide() {

        this.show(this.current - 1);

    }

    /*======================================================
    BUTTON
    ======================================================*/

    bindButtons() {

        if (this.next) {

            this.next.addEventListener("click", () => {

                this.stop();

                this.nextSlide();

            });

        }

        if (this.prev) {

            this.prev.addEventListener("click", () => {

                this.stop();

                this.previousSlide();

            });

        }

    }

    /*======================================================
    KEYBOARD
    ======================================================*/

    bindKeyboard() {

        window.addEventListener("keydown", e => {

            if (e.key === "ArrowRight") {

                this.stop();

                this.nextSlide();

            }

            if (e.key === "ArrowLeft") {

                this.stop();

                this.previousSlide();

            }

        });

    }

    /*======================================================
    TOUCH
    ======================================================*/

    bindTouch() {

        const wrapper =
            document.getElementById("galleryWrapper");

        if (!wrapper) return;

        wrapper.addEventListener("touchstart", e => {

            this.touchStart =
                e.touches[0].clientX;

        }, { passive: true });

        wrapper.addEventListener("touchend", e => {

            this.touchEnd =
                e.changedTouches[0].clientX;

            const delta =
                this.touchStart - this.touchEnd;

            if (Math.abs(delta) < 40)
                return;

            this.stop();

            if (delta > 0) {

                this.nextSlide();

            } else {

                this.previousSlide();

            }

        }, { passive: true });

    }

    /*======================================================
    AUTO PLAY
    ======================================================*/

    start() {

        if (!this.autoPlay) return;

        this.timer = setInterval(() => {

            this.nextSlide();

        }, this.interval);

    }

    stop() {

        clearInterval(this.timer);

        this.autoPlay = false;

    }

}

window.gallery = new Gallery();