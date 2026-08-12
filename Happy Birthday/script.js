/* =========================================
   BIRTHDAY SURPRISE
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const cakeScreen =
    document.getElementById("cakeScreen");

const celebrationScreen =
    document.getElementById("celebrationScreen");

const gift =
    document.getElementById("gift");

const openGiftBtn =
    document.getElementById("openGiftBtn");

const micButton =
    document.getElementById("micButton");

const blowButton =
    document.getElementById("blowButton");

const micStatus =
    document.getElementById("micStatus");

const soundLevel =
    document.getElementById("soundLevel");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const replayButton =
    document.getElementById("replayButton");

const messageScreen =
    document.getElementById("messageScreen");

const messageButton =
    document.getElementById("messageButton");

const backToCelebrationButton =
    document.getElementById("backToCelebrationButton");

const messagesList =
    document.getElementById("messagesList");

let birthdayAudioContext = null;
let birthdayMusicGain = null;

const storedMessages = [
    {
        name: "Ken",
        message: `Hello, Chellycocoooooooo. I know u know na og kinsacoco. HAHAHAHAHAHHAHAHA pero yaaah. Happy Happy Happy Happy Birthday. Salamat sooo much sa everything. u know na og unsa ko ka thankful nga nakaila tika. Isa ka’s rason og nganong nakalingkawas tawun ko anang UMshet HAHHAAHAHAHAHA. sa maka usab, Happy Birthday and Iloveyouhurooot. mwamwa ka sa akin.`,
        time: Date.now()
    },
    {
        name: "Chelo",
        message: `Happy birthday, Silicakes my loveeeeesssss! Today marks the day na same natag edad tas tiguwang na pud ka (huhu jk pero real) pero I hope that you don't lose the whimsy and the love for art and niche stuff that we both share maskin na older na ka (kay ikaw rajud ang makarelate sa akoa about ani). Need na pud nato mukaon og gulay and healthy foods kay tigulang nata (pero sige ra diay gihapon fastfood HAHAHHAHA).

I wish you a very fortuitous 22nd year on this planet and may your life be filled with all the love and blessings that you deserve!

Again, happy happy birthday! Pahabol ra nakong gift kay padulong pa. Wala diay nako naask maskin na sige kog send ato kay nabusy sab ko 😭. Date rata soonest hihihi. You know all the rest. I loaf you, my since day one bestiecakes! 🤩🩷`,
        time: Date.now()
    },
    {
        name: "Honeyaaaaa",
        message: `Hi there chell louvreville🫶🏻 I just want to say Happiest 22nd Birthday! Wish you all the best in life and may we have more selfies to come? HAHAHAHAHA love youuuuu from the bottom of my ingrown😂 charizzzz mwaaaah2 ka saken chell😘`,
        time: Date.now()
    },
    {
        name: "Rey",
        message: `I hope you know how much you mean to the people around you. Keep smiling and being your wonderful self. Happy Birthday!`,
        time: Date.now()
    },
    {
        name: "Anonymous",
        message: `Hi, dear. Happy 22nd Birthday! I wish you all the best and unta mag-undang naka sige og coke. Sa sunod na akong gift og naa nakoy work. Pogi ko : P.`,
        time: Date.now()
    }
];

function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

function renderMessages() {
    messagesList.innerHTML = "";

    if (storedMessages.length === 0) {
        messagesList.innerHTML =
            `<p class="messages-empty">
                No messages yet. Friends can leave a note here.
            </p>`;
        return;
    }

    storedMessages
        .slice()
        .reverse()
        .forEach((item) => {
            const card = document.createElement(
                "div"
            );
            card.className =
                "message-item";

            card.innerHTML =
                `<h3>${
                    item.name
                        ? escapeHtml(
                            item.name
                        )
                        : "A friend"
                }</h3>
                <p>${escapeHtml(
                    item.message
                )}</p>
                <time>${formatMessageTime(
                    item.time
                )}</time>`;

            messagesList.appendChild(card);
        });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/\'/g, "&#039;");
}

renderMessages();


function playBirthdayTuneFallback() {
    if (birthdayAudioContext) {
        birthdayAudioContext.close();
    }

    birthdayAudioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    birthdayMusicGain =
        birthdayAudioContext.createGain();

    birthdayMusicGain.gain.value = 0.12;
    birthdayMusicGain.connect(
        birthdayAudioContext.destination
    );

    const melody = [
        { freq: 392.00, dur: 0.35 }, // G4
        { freq: 392.00, dur: 0.35 },
        { freq: 440.00, dur: 0.7 }, // A4
        { freq: 392.00, dur: 0.7 },
        { freq: 523.25, dur: 0.7 }, // C5
        { freq: 493.88, dur: 1.4 }, // B4

        { freq: 392.00, dur: 0.35 },
        { freq: 392.00, dur: 0.35 },
        { freq: 440.00, dur: 0.7 },
        { freq: 392.00, dur: 0.7 },
        { freq: 587.33, dur: 0.7 }, // D5
        { freq: 523.25, dur: 1.4 },

        { freq: 392.00, dur: 0.35 },
        { freq: 392.00, dur: 0.35 },
        { freq: 784.00, dur: 0.7 }, // G5
        { freq: 659.25, dur: 0.7 }, // E5
        { freq: 523.25, dur: 0.7 },
        { freq: 493.88, dur: 0.7 },
        { freq: 440.00, dur: 1.4 },

        { freq: 349.23, dur: 0.35 }, // F4
        { freq: 349.23, dur: 0.35 },
        { freq: 329.63, dur: 0.7 }, // E4
        { freq: 523.25, dur: 0.7 },
        { freq: 587.33, dur: 0.7 },
        { freq: 523.25, dur: 1.4 }
    ];

    const startTime =
        birthdayAudioContext.currentTime + 0.05;

    let currentTime = startTime;

    melody.forEach((note) => {
        const osc =
            birthdayAudioContext.createOscillator();

        osc.type = "triangle";
        osc.frequency.value = note.freq;
        osc.connect(birthdayMusicGain);

        osc.start(currentTime);
        osc.stop(currentTime + note.dur);

        currentTime += note.dur;
    });
}


function playBirthdayMusic() {
    if (
        birthdayMusic &&
        birthdayMusic.src
    ) {
        birthdayMusic.currentTime = 0;
        birthdayMusic
            .play()
            .catch(() => {
                console.log(
                    "Music autoplay blocked."
                );
                playBirthdayTuneFallback();
            });
        return;
    }

    playBirthdayTuneFallback();
}


/* =========================================
   CHANGE YOUR FRIEND'S NAME HERE
========================================= */

const FRIEND_NAME = "Chell";


/* =========================================
   OPEN GIFT
========================================= */

let giftOpened = false;

function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    gift.classList.add("open");

    openGiftBtn.textContent =
        "✨ Opening your surprise...";

    setTimeout(() => {

        welcomeScreen.classList.remove("active");

        cakeScreen.classList.add("active");

    }, 1500);
}


gift.addEventListener(
    "click",
    openGift
);

openGiftBtn.addEventListener(
    "click",
    openGift
);


/* =========================================
   MICROPHONE VARIABLES
========================================= */

let audioContext;

let analyser;

let microphone;

let microphoneStream;

let microphoneActive = false;

let blowStartTime = null;

let celebrationStarted = false;


/*
    Adjust these if needed.

    Higher = harder blow required.
    Lower = easier to trigger.
*/

const BLOW_THRESHOLD = 0.20;

const REQUIRED_BLOW_TIME = 250;


/* =========================================
   START MICROPHONE
========================================= */

async function startMicrophone() {

    if (microphoneActive) return;

    try {

        micStatus.textContent =
            "Requesting microphone access...";

        microphoneStream =
            await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: false
                }
            });


        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 1024;

        analyser.smoothingTimeConstant = 0.25;


        microphone =
            audioContext.createMediaStreamSource(
                microphoneStream
            );


        microphone.connect(analyser);


        microphoneActive = true;

        micButton.classList.add("listening");

        micStatus.textContent =
            "🎤 Listening... Blow toward the microphone!";


        detectBlow();

    } catch (error) {

        console.error(error);

        micStatus.textContent =
            "Microphone permission was denied.";

        alert(
            "Please allow microphone access so you can blow out the candles! 🎤"
        );
    }
}


/* =========================================
   DETECT BLOW
========================================= */

function detectBlow() {

    if (!microphoneActive) return;

    if (celebrationStarted) return;


    const dataArray =
        new Uint8Array(
            analyser.fftSize
        );


    analyser.getByteTimeDomainData(
        dataArray
    );


    /*
        Calculate RMS volume.
    */

    let sum = 0;

    for (
        let i = 0;
        i < dataArray.length;
        i++
    ) {

        const normalized =
            (dataArray[i] - 128) / 128;

        sum +=
            normalized *
            normalized;
    }


    const rms =
        Math.sqrt(
            sum /
            dataArray.length
        );


    /*
        Convert volume to percentage
        for visual meter.
    */

    const visualLevel =
        Math.min(
            rms * 300,
            100
        );


    soundLevel.style.width =
        `${visualLevel}%`;


    /*
        Blow detection.
    */

    if (
        rms >
        BLOW_THRESHOLD
    ) {

        if (!blowStartTime) {

            blowStartTime =
                performance.now();
        }


        const blowDuration =
            performance.now() -
            blowStartTime;


        if (
            blowDuration >
            REQUIRED_BLOW_TIME
        ) {

            blowOutCandles();

            return;
        }

    } else {

        blowStartTime = null;
    }


    requestAnimationFrame(
        detectBlow
    );
}


/* =========================================
   BLOW OUT CANDLES
========================================= */

function blowOutCandles() {

    if (celebrationStarted)
        return;

    celebrationStarted = true;


    /*
        Turn off every flame.
    */

    const flames =
        document.querySelectorAll(
            ".flame"
        );


    flames.forEach(
        flame => {

            flame.style.animation =
                "none";

            flame.style.transition =
                "all 0.5s ease";

            flame.style.transform =
                "scale(0) translateY(-20px)";

            flame.style.opacity =
                "0";
        }
    );


    micStatus.textContent =
        "💨 You did it!";


    micButton.classList.remove(
        "listening"
    );


    /*
        Stop microphone.
    */

    stopMicrophone();


    /*
        Play birthday music.
    */

    playBirthdayMusic();


    /*
        Small dramatic pause.
    */

    setTimeout(() => {

        startCelebration();

    }, 700);
}


messageButton.addEventListener(
    "click",
    () => {
        celebrationScreen.classList.remove("active");
        messageScreen.classList.add("active");
    }
);


backToCelebrationButton.addEventListener(
    "click",
    () => {
        messageScreen.classList.remove("active");
        celebrationScreen.classList.add("active");
    }
);


/* =========================================
   STOP MICROPHONE
========================================= */

function stopMicrophone() {

    microphoneActive = false;

    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );
    }


    if (audioContext) {

        audioContext.close();

    }
}


/* =========================================
   FALLBACK BLOW BUTTON
========================================= */

blowButton.addEventListener(
    "click",
    () => {

        blowOutCandles();

    }
);


/* =========================================
   MIC BUTTON
========================================= */

micButton.addEventListener(
    "click",
    () => {

        if (!microphoneActive) {

            startMicrophone();

        }

    }
);


/* =========================================
   CELEBRATION
========================================= */

function startCelebration() {

    /*
        Change name.
    */

    document.getElementById(
        "friendName"
    ).textContent =
        FRIEND_NAME + " 💖";


    /*
        Switch screen.
    */

    cakeScreen.classList.remove(
        "active"
    );

    celebrationScreen.classList.add(
        "active"
    );


    /*
        Fireworks!
    */

    launchMassiveFireworks();


    /*
        Confetti.
    */

    createConfetti();


    /*
        Try to start music.
        Browser may block it,
        so don't rely on it.
    */

    if (birthdayMusic) {

        birthdayMusic
            .play()
            .catch(() => {
                console.log(
                    "Music autoplay blocked."
                );
            });
    }
}


/* =========================================
   FIREWORK ENGINE
========================================= */

const canvas =
    document.getElementById(
        "fireworksCanvas"
    );

const ctx =
    canvas.getContext("2d");


let fireworks = [];

let particles = [];


function resizeCanvas() {

    const dpr =
        window.devicePixelRatio ||
        1;

    canvas.width =
        window.innerWidth *
        dpr;

    canvas.height =
        window.innerHeight *
        dpr;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   FIREWORK CLASS
========================================= */

class Firework {

    constructor(
        startX,
        targetX,
        targetY
    ) {

        this.x =
            startX;

        this.y =
            window.innerHeight + 10;

        this.targetX =
            targetX;

        this.targetY =
            targetY;

        this.speed =
            9 +
            Math.random() * 4;

        this.angle =
            Math.atan2(
                targetY - this.y,
                targetX - this.x
            );

        this.velocityX =
            Math.cos(
                this.angle
            ) * this.speed;

        this.velocityY =
            Math.sin(
                this.angle
            ) * this.speed;

        this.trail = [];

        this.exploded = false;

        this.color =
            `hsl(${
                Math.random() * 360
            }, 100%, 65%)`;
    }


    update() {

        if (!this.exploded) {

            this.trail.push({
                x: this.x,
                y: this.y
            });


            if (this.trail.length > 8) {

                this.trail.shift();

            }


            this.x +=
                this.velocityX;

            this.y +=
                this.velocityY;


            /*
                Check target.
            */

            const distance =
                Math.hypot(
                    this.targetX -
                    this.x,

                    this.targetY -
                    this.y
                );


            if (distance < 18) {

                this.explode();

            }

        }

    }


    draw() {

        if (this.exploded)
            return;


        /*
            Trail.
        */

        ctx.beginPath();

        ctx.moveTo(
            this.trail[0]?.x ||
                this.x,
            this.trail[0]?.y ||
                this.y
        );


        for (
            let i = 1;
            i < this.trail.length;
            i++
        ) {

            ctx.lineTo(
                this.trail[i].x,
                this.trail[i].y
            );

        }


        ctx.lineTo(
            this.x,
            this.y
        );


        ctx.strokeStyle =
            this.color;

        ctx.lineWidth = 2;

        ctx.stroke();


        /*
            Rocket.
        */

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#ffffff";

        ctx.fill();
    }


    explode() {

        this.exploded = true;


        /*
            Lots of particles.
        */

        const amount =
            80 +
            Math.floor(
                Math.random() * 80
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                2 +
                Math.random() *
                7;


            particles.push(
                new Particle(
                    this.x,
                    this.y,
                    Math.cos(angle) *
                        speed,
                    Math.sin(angle) *
                        speed,
                    this.color
                )
            );

        }


        /*
            Secondary sparkle particles.
        */

        for (
            let i = 0;
            i < 20;
            i++
        ) {

            particles.push(
                new Particle(
                    this.x,
                    this.y,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    "#ffffff"
                )
            );

        }

    }
}


/* =========================================
   PARTICLES
========================================= */

class Particle {

    constructor(
        x,
        y,
        velocityX,
        velocityY,
        color
    ) {

        this.x = x;
        this.y = y;

        this.velocityX =
            velocityX;

        this.velocityY =
            velocityY;

        this.color =
            color;

        this.alpha = 1;

        this.life =
            60 +
            Math.random() * 60;

        this.size =
            1.5 +
            Math.random() * 2.5;

        this.gravity =
            0.06 +
            Math.random() * 0.04;

        this.friction =
            0.985;

    }


    update() {

        this.velocityX *=
            this.friction;

        this.velocityY *=
            this.friction;


        this.velocityY +=
            this.gravity;


        this.x +=
            this.velocityX;

        this.y +=
            this.velocityY;


        this.life--;

        this.alpha =
            this.life / 120;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha =
            Math.max(
                this.alpha,
                0
            );


        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            this.color;

        ctx.shadowBlur =
            15;

        ctx.shadowColor =
            this.color;

        ctx.fill();

        ctx.restore();

    }

}


/* =========================================
   FIREWORK ANIMATION
========================================= */

function animateFireworks() {

    if (fireworks.length === 0 && particles.length === 0) {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    } else {
        ctx.fillStyle =
            "rgba(5, 2, 12, 0.18)";

        ctx.fillRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
    }


    /*
        Fireworks.
    */

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const firework =
            fireworks[i];


        firework.update();
        firework.draw();


        if (firework.exploded) {

            fireworks.splice(
                i,
                1
            );
        }

    }


    /*
        Particles.
    */

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];


        particle.update();
        particle.draw();


        if (
            particle.life <= 0 ||
            particle.alpha <= 0
        ) {

            particles.splice(
                i,
                1
            );
        }

    }


    requestAnimationFrame(
        animateFireworks
    );
}


animateFireworks();


/* =========================================
   LAUNCH FIREWORK
========================================= */

function launchFirework() {

    const startX =
        Math.random() *
        window.innerWidth;


    const targetX =
        100 +
        Math.random() *
        (window.innerWidth - 200);


    const targetY =
        80 +
        Math.random() *
        (window.innerHeight * 0.55);


    fireworks.push(
        new Firework(
            startX,
            targetX,
            targetY
        )
    );
}


/* =========================================
   MASSIVE FIREWORK SHOW
========================================= */

function launchMassiveFireworks() {

    /*
        Immediate huge burst.
    */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            () => {
                launchFirework();
            },
            i * 180
        );

    }


    /*
        More fireworks.
    */

    let count = 0;


    const interval =
        setInterval(
            () => {

                launchFirework();

                count++;


                if (count >= 35) {

                    clearInterval(
                        interval
                    );

                }

            },
            250
        );


    /*
        Second wave.
    */

    setTimeout(
        () => {

            for (
                let i = 0;
                i < 20;
                i++
            ) {

                setTimeout(
                    () => {
                        launchFirework();
                    },
                    i * 220
                );

            }

        },
        4500
    );

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    const amount =
        window.innerWidth < 600
            ? 100
            : 180;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        const x =
            Math.random() *
            window.innerWidth;


        const duration =
            3 +
            Math.random() * 5;


        const rotation =
            Math.random() *
            360;


        const rotationEnd =
            rotation +
            500 +
            Math.random() *
            1000;


        piece.style.left =
            `${x}px`;


        piece.style.setProperty(
            "--x",
            `${
                (Math.random() - 0.5) *
                400
            }px`
        );


        piece.style.setProperty(
            "--duration",
            `${duration}s`
        );


        piece.style.setProperty(
            "--rotation",
            `${rotation}deg`
        );


        piece.style.setProperty(
            "--rotationEnd",
            `${rotationEnd}deg`
        );


        /*
            Random confetti color.
        */

        const colors = [
            "#ff4fa3",
            "#ffd166",
            "#7bdff2",
            "#b8f2e6",
            "#cdb4db",
            "#ffffff"
        ];


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.animationDelay =
            `${
                Math.random() * 1.5
            }s`;


        container.appendChild(
            piece
        );


        setTimeout(
            () => {
                piece.remove();
            },
            (duration + 2) * 1000
        );

    }

}


/* =========================================
   REPLAY
========================================= */

replayButton.addEventListener(
    "click",
    () => {

        /*
            Reset flames.
        */

        const flames =
            document.querySelectorAll(
                ".flame"
            );


        flames.forEach(
            flame => {

                flame.style.animation =
                    "";

                flame.style.transform =
                    "";

                flame.style.opacity =
                    "";

            }
        );


        /*
            Clear fireworks.
        */

        fireworks = [];

        particles = [];


        /*
            Clear confetti.
        */

        document.getElementById(
            "confetti-container"
        ).innerHTML = "";


        /*
            Reset variables.
        */

        celebrationStarted =
            false;

        giftOpened =
            false;

        blowStartTime =
            null;


        /*
            Reset gift.
        */

        gift.classList.remove(
            "open"
        );


        openGiftBtn.textContent =
            "🎁 Open Your Gift";


        /*
            Return to start.
        */

        celebrationScreen.classList.remove(
            "active"
        );

        cakeScreen.classList.remove(
            "active"
        );

        messageScreen.classList.remove(
            "active"
        );

        welcomeScreen.classList.add(
            "active"
        );


        /*
            Stop music.
        */

        if (birthdayMusic) {

            birthdayMusic.pause();

            birthdayMusic.currentTime =
                0;
        }

        if (birthdayAudioContext) {
            birthdayAudioContext.close();
            birthdayAudioContext = null;
        }

    }
);