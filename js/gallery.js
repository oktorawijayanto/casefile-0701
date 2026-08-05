/*==========================================================
CASE FILE #0701
GALLERY ENGINE
==========================================================*/

class Gallery {

    constructor() {
        this.slides = [...document.querySelectorAll(".gallery-item")];
        this.prev = document.getElementById("galleryPrev");
        this.next = document.getElementById("galleryNext");
        this.current = 0;
        this.touchStart = 0;
        this.touchEnd = 0;

        if (this.slides.length === 0) return;

        this.init();
    }

    init() {
        this.show(0);
        this.bindButtons();
        this.bindTouch();
    }

    show(index) {
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;

        this.slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        this.current = index;
    }

    nextSlide() { this.show(this.current + 1); }
    previousSlide() { this.show(this.current - 1); }

    bindButtons() {
        this.next?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.nextSlide();
        });

        this.prev?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.previousSlide();
        });
    }

    bindTouch() {
        const wrapper = document.getElementById("galleryWrapper");
        if (!wrapper) return;

        wrapper.addEventListener("touchstart", e => {
            this.touchStart = e.touches[0].clientX;
        }, { passive: true });

        wrapper.addEventListener("touchend", e => {
            this.touchEnd = e.changedTouches[0].clientX;
            const delta = this.touchStart - this.touchEnd;

            if (Math.abs(delta) > 40) {
                if (delta > 0) this.nextSlide();
                else this.previousSlide();
            }
        }, { passive: true });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.gallery = new Gallery();
});