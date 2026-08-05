/*==========================================================
CASE FILE #0701
GLITCH ENGINE
==========================================================*/

class GlitchEngine {

    constructor() {
        this.target = document.getElementById("identityName");
        if (!this.target) return;

        this.original = this.target.dataset.text || this.target.textContent;
        this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";
        this.running = false;

        this.observe();
    }

    observe() {
        const scene = document.getElementById("scene-identity");
        if (!scene) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.play();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(scene);
    }

    play() {
        if (this.running) return;
        this.running = true;

        let iteration = 0;
        const interval = setInterval(() => {
            this.target.textContent = this.original
                .split("")
                .map((letter, index) => {
                    if (index < iteration) return this.original[index];
                    return this.characters[Math.floor(Math.random() * this.characters.length)];
                })
                .join("");

            iteration += 0.45;

            if (iteration >= this.original.length) {
                clearInterval(interval);
                this.target.textContent = this.original;
                this.running = false;
            }
        }, 35);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.glitchEngine = new GlitchEngine();
});