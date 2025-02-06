const paragraphs = [
    "Amidst the sprawling meadow, a lone oak stood sentinel, its branches reaching toward the heavens as if seeking solace in the infinite sky. Beneath its canopy, a weary traveler found respite from the journey, lulled by the gentle rustle of leaves in the breeze. As twilight descended, the stars emerged, casting a shimmering tapestry across the night sky, igniting the imagination with dreams of distant galaxies and untold adventures.",
    
    "In the heart of the bustling city, amidst the towering skyscrapers and bustling streets, an alleyway lay hidden, a sanctuary for the lost and forgotten. Within its narrow confines, graffiti adorned the walls like vibrant tapestries, each stroke of paint telling a story of defiance and resilience. Here, amidst the chaos, a community thrived, bound together by shared struggles and unspoken bonds of solidarity.",
    
    "Along the rugged coastline, where cliffs met the relentless sea, a lighthouse stood tall, its beacon cutting through the darkness like a guiding star. For generations, it had stood watch, guiding sailors safely home through stormy seas and treacherous waters. To those who sought refuge in its light, it offered hope in the face of uncertainty, a beacon of resilience amidst the ever-changing tides of life.",

"Within the confines of a quaint bookstore, shelves lined with weathered tomes held the promise of adventure and escape. Here, amidst the scent of aged paper and ink, bibliophiles roamed like explorers in search of hidden treasures, lost in worlds of imagination and wonder. In this haven of literature, time seemed to stand still, allowing weary souls to lose themselves in the pages of a thousand different stories.",

"In the heart of an enchanted forest, where sunlight filtered through the canopy in golden threads, a hidden glade lay untouched by time. Within its sacred embrace, flora of every hue flourished, painting the earth with a vibrant palette of colors. Here, amidst the symphony of nature's chorus, woodland creatures danced with ethereal grace, weaving tales of magic and wonder.",

"Across the windswept moors, where heather bloomed in shades of purple and gold, a solitary cottage stood nestled against the elements. Its thatched roof weathered by centuries of storms, it bore witness to the passage of time, a silent sentinel guarding the secrets of the land. Within its cozy confines, a hearth crackled with warmth, inviting weary travelers to rest their bones and share tales of distant lands.",

"Beneath the azure expanse of a cloudless sky, a desert oasis lay hidden, its waters shimmering like liquid sapphires amidst the golden sands. Here, amidst the harsh beauty of the desert, life flourished in unexpected abundance, a testament to the resilience of nature's design. To those who stumbled upon its shores, it offered a brief respite from the relentless sun, a fleeting moment of peace in a world defined by hardship.",

"Within the labyrinthine streets of an ancient city, where history whispered secrets from every crumbling stone, a marketplace thrived with the vibrancy of life. Here, merchants bartered and beguiled with wares from distant lands, their voices mingling with the scent of exotic spices and the vibrant colors of silk and satin. In this bustling bazaar, the pulse of humanity beat strong, a testament to the enduring spirit of commerce and community.",

"Amidst the rolling hills of Tuscany, where vineyards stretched as far as the eye could see, a quaint villa stood bathed in the warm glow of the setting sun. Surrounded by olive groves and cypress trees, it exuded an aura of timeless elegance, a sanctuary for weary souls seeking refuge from the chaos of modern life. Within its ivy-clad walls, laughter echoed like music, mingling with the aroma of freshly baked bread and robust red wine.",

"Across the snow-capped peaks of the Himalayas, where the air was thin and the sky kissed the earth, a monastery perched precariously on the edge of a cliff. Its crimson banners fluttered in the mountain breeze, a beacon of spiritual enlightenment amidst the rugged terrain. Within its hallowed halls, monks chanted ancient mantras, their voices rising and falling like the rhythm of the universe itself.",

"In the heart of the Amazon rainforest, where the canopy teemed with life and the air hummed with the chorus of a thousand creatures, a hidden waterfall cascaded into a crystal-clear pool. Here, amidst the lush foliage and shimmering mist, indigenous tribes gathered to pay homage to the spirits of the land, their rituals steeped in ancient tradition and reverence for the natural world.",

"Beneath the shimmering lights of the aurora borealis, where colors danced across the night sky like celestial ribbons, a solitary cabin stood nestled in the wilderness of the Arctic tundra. Surrounded by towering pines and frozen lakes, it offered a haven for intrepid adventurers seeking the raw beauty of the northern wilderness. Within its cozy interior, a fireplace crackled with warmth, casting a comforting glow upon the faces of those who dared to venture so far from home."
];

const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);