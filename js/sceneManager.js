/* =========================================================
   CASE FILE #0701 — COMPLETE JAVASCRIPT ENGINE
   Includes: Tap/Click Anywhere Navigation, Keyboard Controls, Auto-Terminal & Gallery Engine
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AUDIO ENGINE ---
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicButton');
    let isMusicPlaying = false;

    function playAudio() {
        if (!music || isMusicPlaying) return;

        music.play().then(() => {
            isMusicPlaying = true;
            if (musicBtn) {
                musicBtn.innerText = '🔊';
            }
        }).catch(err => {
            console.log("Autoplay blocked, awaiting first interaction...", err);
        });
    }

    // Autoplay trigger
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
        window.addEventListener(evt, playAudio, { once: true });
    });

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!music) return;

            if (music.paused) {
                music.play();
                isMusicPlaying = true;
                musicBtn.innerText = '🔊';
            } else {
                music.pause();
                isMusicPlaying = false;
                musicBtn.innerText = '🔇';
            }
        });
    }

    // --- 2. SCENE MANAGER & NAVIGATION ---
    const scenes = document.querySelectorAll('.scene');
    let currentSceneIndex = 0;

    function showScene(index) {
        if (index < 0 || index >= scenes.length) return;

        scenes.forEach((scene, i) => {
            if (i === index) {
                scene.classList.add('active');
                triggerSceneEvents(scene);
            } else {
                scene.classList.remove('active');
            }
        });

        currentSceneIndex = index;
    }

    function nextScene() {
        if (currentSceneIndex < scenes.length - 1) {
            showScene(currentSceneIndex + 1);
        }
    }

    function prevScene() {
        if (currentSceneIndex > 0) {
            showScene(currentSceneIndex - 1);
        }
    }

    // KLIK DI MANA SAJA UNTUK PINDAH SCENE (Kecuali tombol kontrol musik & panah galeri)
    scenes.forEach(scene => {
        scene.addEventListener('click', (e) => {
            if (e.target.closest('#musicButton') || e.target.closest('.gallery-control')) {
                return;
            }
            playAudio();
            nextScene();
        });
    });

    // NAVIGASI KEYBOARD (Panah Kanan / Space / Enter)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            nextScene();
        } else if (e.key === 'ArrowLeft') {
            prevScene();
        }
    });

    // --- 3. DYNAMIC SCENE EVENTS ---
    function triggerSceneEvents(activeScene) {
        // A. Terminal Progress & Auto Next
        const progressBar = activeScene.querySelector('.progress-bar');
        const progressValue = activeScene.querySelector('#progressValue');
        const terminalLines = activeScene.querySelectorAll('.terminal-content p');

        if (progressBar && progressValue) {
            let progress = 0;
            progressBar.style.width = '0%';
            progressValue.innerText = '0%';

            if (terminalLines.length > 0) {
                terminalLines.forEach(line => {
                    line.style.opacity = '0';
                    line.style.transition = 'opacity 0.6s ease';
                });
            }

            if (activeScene.dataset.progressInterval) {
                clearInterval(parseInt(activeScene.dataset.progressInterval));
            }

            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                progressValue.innerText = `${progress}%`;

                if (terminalLines.length > 0) {
                    const stepThreshold = 100 / terminalLines.length;
                    terminalLines.forEach((line, index) => {
                        if (progress >= index * stepThreshold) {
                            line.style.opacity = '1';
                        }
                    });
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        nextScene();
                    }, 1200);
                }
            }, 200);

            activeScene.dataset.progressInterval = interval.toString();
        }

        // B. Typing Effect (Unsent Letter)
        const typingContainer = activeScene.querySelector('#typingContainer');
        if (typingContainer && !typingContainer.dataset.typed) {
            const rawText = "There were so many words I wanted to send, but I kept them stored right here instead.\n\nThank you for being a part of my journey, even for a moment. You brought a quiet light into my days that I won't ever forget.";
            
            typingContainer.dataset.typed = "true";
            typingContainer.innerText = '';
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                if (charIndex < rawText.length) {
                    typingContainer.innerText += rawText.charAt(charIndex);
                    charIndex++;
                    typingContainer.scrollTop = typingContainer.scrollHeight;
                } else {
                    clearInterval(typeInterval);
                }
            }, 35);
        }
    }

    // --- 4. GALLERY CONTROLLER ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    let currentGalleryIndex = 0;

    function updateGallery(index) {
        if (galleryItems.length === 0) return;
        galleryItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    if (prevBtn && nextBtn && galleryItems.length > 0) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
            updateGallery(currentGalleryIndex);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
            updateGallery(currentGalleryIndex);
        });
    }

    showScene(0);
});