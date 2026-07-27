/*==========================================================
CASE FILE #0701
TYPEWRITER ENGINE
==========================================================*/

class Typewriter{

    constructor(){

        this.container=document.getElementById("typingContainer");

        if(!this.container)return;

        this.speed=32;

        this.started=false;

        this.text=`

Happy Birthday, ANINDYA.

If you're reading this,

it means you've reached
the last pages
of this little archive.

This website
isn't just about memories.

It's about someone
who unknowingly
became one of
the most meaningful
parts of my life.

Thank you
for every conversation.

Thank you
for every laugh.

Thank you
for every little moment
that slowly became
something unforgettable.

You taught me
that consistency matters.

You reminded me
that caring
doesn't always
have to be loud.

Sometimes...

it's hidden
inside
the smallest things.

I sincerely hope

you'll always be happy.

May your dreams
find their way.

May your prayers
be answered.

May your smile
never disappear.

And if one day
life becomes difficult,

I hope
you'll always remember

how incredible
you really are.

There is no reason
to lie to me.

I'm way too understanding.

I get shit.

I get life.

I understand
that shit happens.

Sure I'll be sad,

but I'll get over it.

I will never forget
the day
I started talking to you

without knowing

that I was going
to love you.

So...

please

just be straight up
with me.

Be honest with me.

Happy Birthday.

With all my respect,

❤️

`;

        this.observe();

    }

    observe(){

        const scene=document.getElementById("scene-letter");

        if(!scene)return;

        const observer=new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting && !this.started){

                        this.started=true;

                        this.type();

                    }

                });

            },

            {

                threshold:.45

            }

        );

        observer.observe(scene);

    }

    async type(){

        this.container.innerHTML="";

        for(let i=0;i<this.text.length;i++){

            this.container.innerHTML+=this.text.charAt(i);

            window.scrollBy(0,0);

            await this.sleep(this.speed);

        }

    }

    sleep(ms){

        return new Promise(resolve=>{

            setTimeout(resolve,ms);

        });

    }

}

window.typewriter=new Typewriter();