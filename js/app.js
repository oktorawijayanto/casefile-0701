/*==========================================================
CASE FILE #0701
APP ENGINE
Final Bootstrap
==========================================================*/

class CaseFileApp {

    constructor() {

        this.preloader =
            document.getElementById("preloader");

        this.beginButton =
            document.getElementById("btnBegin");

        this.cursor =
            document.getElementById("cursor");

        this.revealItems = [
            ...document.querySelectorAll(".reveal")
        ];

        this.init();

    }

    /*======================================================
    INIT
    ======================================================*/

    init() {

        this.hidePreloader();

        this.bindOpenButton();

        this.cursorEffect();

        this.revealObserver();

        this.parallax();

        this.consoleMessage();

    }

    /*======================================================
    PRELOADER
    ======================================================*/

    hidePreloader() {

        window.addEventListener("load", () => {

            setTimeout(() => {

                if (!this.preloader) return;

                this.preloader.classList.add("hide");

                setTimeout(() => {

                    this.preloader.style.display = "none";

                },700);

            },1200);

        });

    }

    /*======================================================
    OPEN FILE BUTTON
    ======================================================*/

    bindOpenButton() {

        if (!this.beginButton) return;

        this.beginButton.addEventListener("click", () => {

            if(window.audioEngine){

                window.audioEngine.start();

            }

            if(window.sceneManager){

                window.sceneManager.next();

            }

        });

    }

    /*======================================================
    CURSOR
    ======================================================*/

    cursorEffect() {

        if(!this.cursor) return;

        document.addEventListener("mousemove",(e)=>{

            this.cursor.style.left=e.clientX+"px";

            this.cursor.style.top=e.clientY+"px";

        });

        document.querySelectorAll(

            "button,a,.card,.gallery-item"

        ).forEach(item=>{

            item.addEventListener("mouseenter",()=>{

                this.cursor.style.width="28px";

                this.cursor.style.height="28px";

            });

            item.addEventListener("mouseleave",()=>{

                this.cursor.style.width="14px";

                this.cursor.style.height="14px";

            });

        });

    }

    /*======================================================
    SCROLL REVEAL
    ======================================================*/

    revealObserver() {

        if(this.revealItems.length===0) return;

        const observer=new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        entry.target.classList.add("show");

                    }

                });

            },

            {

                threshold:.15

            }

        );

        this.revealItems.forEach(item=>{

            observer.observe(item);

        });

    }

    /*======================================================
    PARALLAX
    ======================================================*/

    parallax(){

        const floating=[

            ...document.querySelectorAll(".float")

        ];

        if(floating.length===0) return;

        window.addEventListener("mousemove",(e)=>{

            const x=

            (window.innerWidth/2-e.clientX)/45;

            const y=

            (window.innerHeight/2-e.clientY)/45;

            floating.forEach(item=>{

                item.style.transform=

                `translate(${x}px,${y}px)`;

            });

        });

    }

    /*======================================================
    CONSOLE MESSAGE
    ======================================================*/

    consoleMessage(){

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

/*==========================================================
BOOT
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        window.caseFile=

        new CaseFileApp();

    }

);