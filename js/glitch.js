/*==========================================================
CASE FILE #0701
GLITCH ENGINE
==========================================================*/

class GlitchEngine {

    constructor() {

        this.target = document.getElementById("identityName");

        if (!this.target) return;

        this.original =
            this.target.dataset.text ||
            this.target.textContent;

        this.characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";

        this.running = false;

        this.randomLoop();

        this.observe();

    }

    /*======================================================
    OBSERVER
    ======================================================*/

    observe() {

        const scene =
            document.getElementById("scene-identity");

        if (!scene) return;

        const observer =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        this.play();

                    }

                });

            }, {

                threshold:0.6

            });

        observer.observe(scene);

    }

    /*======================================================
    MAIN GLITCH
    ======================================================*/

    play() {

        if (this.running) return;

        this.running = true;

        let iteration = 0;

        const interval = setInterval(() => {

            this.target.textContent =
                this.original
                    .split("")
                    .map((letter,index)=>{

                        if(index < iteration){

                            return this.original[index];

                        }

                        return this.characters[
                            Math.floor(
                                Math.random() *
                                this.characters.length
                            )
                        ];

                    })
                    .join("");

            iteration += 0.45;

            if(iteration >= this.original.length){

                clearInterval(interval);

                this.target.textContent =
                    this.original;

                this.running = false;

            }

        },35);

    }

    /*======================================================
    RANDOM MICRO GLITCH
    ======================================================*/

    randomLoop(){

        setInterval(()=>{

            if(this.running) return;

            if(Math.random()>.7){

                this.microGlitch();

            }

        },4000);

    }

    /*======================================================
    MICRO GLITCH
    ======================================================*/

    microGlitch(){

        this.target.classList.add("glitch-active");

        const original=this.target.textContent;

        const randomIndex=
            Math.floor(
                Math.random()*original.length
            );

        let chars=original.split("");

        chars[randomIndex]=
            this.characters[
                Math.floor(
                    Math.random()*
                    this.characters.length
                )
            ];

        this.target.textContent=
            chars.join("");

        setTimeout(()=>{

            this.target.textContent=
                this.original;

            this.target.classList.remove(
                "glitch-active"
            );

        },120);

    }

    /*======================================================
    SCAN EFFECT
    ======================================================*/

    static createScanLine(){

        const scan=document.createElement("div");

        scan.id="scanLine";

        document.body.appendChild(scan);

        setInterval(()=>{

            scan.classList.add("scan");

            setTimeout(()=>{

                scan.classList.remove("scan");

            },900);

        },7000);

    }

}

window.glitchEngine =
    new GlitchEngine();

GlitchEngine.createScanLine();