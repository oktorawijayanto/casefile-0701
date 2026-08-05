/*==========================================================
CASE FILE #0701
SCENE MANAGER
==========================================================*/

class SceneManager {

    constructor() {
        this.scenes = [...document.querySelectorAll('.scene')];
        this.nav = document.getElementById('sceneNav');
        this.btnPrev = document.getElementById('btnPrevScene');
        this.btnNext = document.getElementById('btnNextScene');
        this.currentIndex = 0;
        this.terminalTimer = null;

        if (this.scenes.length === 0) return;

        this.init();
    }

    init() {
        this.showScene(0);
        this.bindEvents();
    }

    showScene(index) {
        if (index < 0 || index >= this.scenes.length) return;

        this.scenes.forEach((scene, i) => {
            if (i === index) {
                scene.classList.add('active');
                scene.scrollTop = 0;
                this.triggerSceneEvents(scene);
            } else {
                scene.classList.remove('active');
            }
        });

        this.currentIndex = index;
        this.updateNavVisibility();
    }

    next() {
        if (this.currentIndex < this.scenes.length - 1) {
            this.showScene(this.currentIndex + 1);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.showScene(this.currentIndex - 1);
        }
    }

    updateNavVisibility() {
        if (!this.nav) return;
        const currentScene = this.scenes[this.currentIndex];
        
        // Sembunyikan navigasi melayang pada intro
        if (currentScene && currentScene.dataset.scene === 'intro') {
            this.nav.style.display = 'none';
        } else {
            this.nav.style.display = 'flex';
        }
    }

    bindEvents() {
        // Tombol navigasi melayang
        this.btnPrev?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prev();
        });

        this.btnNext?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.next();
        });

        // Navigasi keyboard
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });
    }

    triggerSceneEvents(scene) {
        const sceneId = scene.dataset.scene;

        // Logika terminal otomatis
        if (sceneId === 'terminal') {
            this.runTerminalProgress(scene);
        } else {
            if (this.terminalTimer) clearInterval(this.terminalTimer);
        }

        // Pemicu Typewriter untuk Scene Letter
        if (sceneId === 'letter' && window.typewriter) {
            window.typewriter.start();
        }
    }

    runTerminalProgress(scene) {
        const progressBar = scene.querySelector('#progressBar');
        const progressValue = scene.querySelector('#progressValue');
        const lines = scene.querySelectorAll('.terminal-content p');

        if (!progressBar || !progressValue) return;

        let progress = 0;
        progressBar.style.width = '0%';
        progressValue.innerText = '0%';

        lines.forEach(l => l.style.opacity = '0.3');

        if (this.terminalTimer) clearInterval(this.terminalTimer);

        this.terminalTimer = setInterval(() => {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            progressValue.innerText = `${progress}%`;

            const activeLine = Math.floor((progress / 100) * lines.length);
            lines.forEach((l, idx) => {
                if (idx <= activeLine) l.style.opacity = '1';
            });

            if (progress >= 100) {
                clearInterval(this.terminalTimer);
                setTimeout(() => {
                    this.next();
                }, 800);
            }
        }, 80);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.sceneManager = new SceneManager();
});