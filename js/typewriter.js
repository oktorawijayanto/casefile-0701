/*==========================================================
CASE FILE #0701
TYPEWRITER ENGINE — Single Source of Truth
==========================================================*/

class Typewriter {

    constructor() {
        this.container = document.getElementById("typingContainer");
        this.speed = 32;
        this.started = false;
        this.text = `My Favorite Person, ANINDYA.

If you're reading this, it means you've reached the last pages of this little archive.

This website isn't just about memories. It's about someone who unknowingly became one of the most meaningful parts of my life.

Thank you for every conversation.
Thank you for every laugh.
Thank you for every little moment that slowly became something unforgettable.

You taught me that consistency matters.
You reminded me that caring doesn't always have to be loud.
Sometimes... it's hidden inside the smallest things.

I sincerely hope you'll always be happy.
May your dreams find their way.
May your prayers be answered.
May your smile never disappear.

And if one day life becomes difficult, I hope you'll always remember how incredible you really are.

With all my respect,

❤️`;
    }

    start() {
        if (this.started || !this.container) return;
        this.started = true;
        this.type();
    }

    async type() {
        this.container.innerHTML = '<span id="twText"></span><span class="typing-cursor"></span>';
        const textSpan = document.getElementById("twText");

        for (let i = 0; i < this.text.length; i++) {
            if (textSpan) {
                textSpan.textContent += this.text.charAt(i);
                this.container.scrollTop = this.container.scrollHeight;
            }
            await this.sleep(this.speed);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.typewriter = new Typewriter();
});