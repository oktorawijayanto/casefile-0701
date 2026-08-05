/*==========================================================
CASE FILE #0701
APP ENGINE — 60 FPS Optimized
==========================================================*/

class CaseFileApp {

    constructor() {
        this.preloader = document.getElementById("preloader");
        this.beginButton = document.getElementById("btnBegin");
        this.cursor = document.getElementById("cursor");
        this.revealItems = [...document.querySelectorAll(".reveal")];

        this.init();
    }

    init() {
        this.hidePreloader();
        this.bindOpenButton();
        this.cursorEffect();
        this.revealObserver();
        this.parallax();
        this.consoleMessage();
    }

    hidePreloader() {
        window.addEventListener("load", () => {
            setTimeout(() => {
                if (!this.preloader) return;
                this.preloader.classList.add("hide");
                setTimeout(() => {
                    this.preloader.style.display = "none";
                }, 700);
            }, 800);
        });
    }

    bindOpenButton() {
        if (!this.beginButton) return;

        this.beginButton.addEventListener("click", () => {
            if (window.audioEngine) {
                window.audioEngine.start();
            }
            if (window.sceneManager) {
                window.sceneManager.next();
            }
        });
    }

    cursorEffect() {
        if (!this.cursor) return;

        // Tampilkan kursor khusus hanya pada desktop
        if (window.matchMedia("(pointer: fine)").matches) {
            this.cursor.style.display = "block";
        }

        let ticking = false;

        document.addEventListener("mousemove", (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.cursor.style.left = e.clientX + "px";
                    this.cursor.style.top = e.clientY + "px";
                    ticking = false;
                });
                ticking = true;
            }
        });

        document.querySelectorAll("button, a, .card, .gallery-item, .memory-card").forEach(item => {
            item.addEventListener("mouseenter", () => {
                this.cursor.style.width = "28px";
                this.cursor.style.height = "28px";
            });
            item.addEventListener("mouseleave", () => {
                this.cursor.style.width = "14px";
                this.cursor.style.height = "14px";
            });
        });
    }

    revealObserver() {
        if (this.revealItems.length === 0) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.15 }
        );

        this.revealItems.forEach(item => {
            observer.observe(item);
        });
    }

    /* 60 FPS Optimized Parallax */
    parallax() {
        const floating = [...document.querySelectorAll(".float")];
        if (floating.length === 0) return;

        let ticking = false;

        window.addEventListener("mousemove", (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const x = (window.innerWidth / 2 - e.clientX) / 45;
                    const y = (window.innerHeight / 2 - e.clientY) / 45;

                    floating.forEach(item => {
                        item.style.transform = `translate(${x}px, ${y}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    consoleMessage() {
        console.clear();
        console.log(
`=================================================
CASE FILE #0701
ACCESS LEVEL : AUTHORIZED
STATUS       : OPEN

Happy Birthday, ANINDYA.
If you're reading the console...
I hope you smile today.
=================================================`
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.caseFile = new CaseFileApp();
});