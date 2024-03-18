document.addEventListener("DOMContentLoaded", function () {
    // Elementen selecteren
    const petImages = document.getElementById("pet-images");
    const levelProgress = document.getElementById("level-progress");
    const feedButton = document.getElementById("feedButton");
    const playButton = document.getElementById("playButton");
    const happinessValue = document.getElementById("happinessValue");
    const levelValue = document.getElementById("levelValue");

    const neutralPet = document.getElementById("neutralPet");
    const happyPet = document.getElementById("happyPet");
    const sadPet = document.getElementById("sadPet");

    // Variabelen voor het spel
    let happiness = 50;
    let level = 1;
    let timerSeconds = 0;

    // Voedsel en speelgoed arrays
    const foodItems = ["appel", "kaas", "vis"];
    const toyItems = ["bal", "touw", "muis"];

    // Timer variabelen
    let startTime;
    let elapsedTime;

    // Start de timer
    function startTimer() {
        startTime = Date.now();
    }

    // Bereken de verstreken tijd
    function calculateElapsedTime() {
        const currentTime = Date.now();
        elapsedTime = Math.floor((currentTime - startTime) / 1000); // Omzetten naar seconden
        return elapsedTime;
    }

    // Reset het spel en toon een melding
    function resetGame(elapsedTimeFormatted, timerInterval) {
        clearInterval(happinessInterval);
        clearInterval(timerInterval);
        alert("Helaas! Je huisdier is niet meer gelukkig. Tijd: " + elapsedTimeFormatted);
        resetHappiness();
        startTimer(); // Start de timer opnieuw
    }

    // Voed het huisdier en verhoog het geluksniveau
    function feedPet(food) {
        const randomIndex = Math.floor(Math.random() * food.length);
        const randomFood = food[randomIndex];
        const randomIncrease = Math.floor(Math.random() * 10) + 1;
        happiness += randomIncrease;
        happiness = Math.min(happiness, 100);
        updateHappiness();
    }

    // Speel met het huisdier en verhoog het geluksniveau
    function playWithPet(toys) {
        const randomIndex = Math.floor(Math.random() * toys.length);
        const randomToy = toys[randomIndex];
        const randomIncrease = Math.floor(Math.random() * 15) + 1;
        happiness += randomIncrease;
        happiness = Math.min(happiness, 100);
        updateHappiness();
    }

    // Update het geluksniveau van het huisdier en voer acties uit op basis daarvan
    function updateHappiness(timerInterval) {
        happinessValue.textContent = happiness;

        // Controleer of het huisdier is gestegen naar een nieuw niveau
        if (happiness >= 100) {
            levelUp();
        }

        // Controleer of de happiness-meter op 0 staat
        if (happiness <= 0) {
            const elapsedTime = calculateElapsedTime();
            const elapsedTimeFormatted = formatTime(elapsedTime);
            resetGame(elapsedTimeFormatted, timerInterval);
        } else {
            // Update de afbeelding en levelbalk als de happiness niet 0 is
            if (happiness >= 75) {
                setPetImage(happyPet);
            } else if (happiness >= 50) {
                setPetImage(neutralPet);
            } else {
                setPetImage(sadPet);
            }
            updateLevelBar();
        }
    }

    // Reset het geluksniveau van het huisdier naar 50
    function resetHappiness() {
        happiness = 50;
        updateHappiness();
    }

    // Wijzig de afbeelding van het huisdier op basis van het geluksniveau
    function setPetImage(activePet) {
        [neutralPet, happyPet, sadPet].forEach((pet) => {
            pet.style.display = "none";
        });
        activePet.style.display = "block";
    }

    // Verhoog het niveau van het huisdier
    function levelUp() {
        level++;
        levelValue.textContent = level;
        happiness = 50; // Reset de happiness na het stijgen naar een nieuw niveau
        updateHappiness();

        // Geluid afspelen bij level up
        const levelUpSound = new Audio('audio/levelup.mp3');
        levelUpSound.play();
    }

    // Werk de level progressiebalk bij op basis van het geluksniveau
    function updateLevelBar() {
        if (levelProgress) { // Controleer of levelProgress is gedefinieerd
            const progressWidth = (happiness / 100) * 300;
            levelProgress.style.width = `${progressWidth}px`;
        }
    }

    // Verminder het geluksniveau van het huisdier na verloop van tijd
    function decreaseHappiness() {
        // Verhoog dit getal om de happiness sneller te laten afnemen
        const randomDecrease = Math.floor(Math.random() * 10) + 1; // bijvoorbeeld 10 in plaats van 5
        happiness -= randomDecrease;
        happiness = Math.max(happiness, 0);
        updateHappiness();
    }

    // Start de timer bij het laden van de pagina
    startTimer();

    // Voer de decreaseHappiness-functie uit op een vast interval
    const happinessInterval = setInterval(decreaseHappiness, 2000); // Verlaag de intervaltijd naar 2 seconden

    // Voeg event listeners toe aan de voed- en speelknoppen
    if (feedButton) { // Controleer of feedButton is gedefinieerd
        feedButton.addEventListener("click", function () {
            feedPet(foodItems);
        });
    }
    if (playButton) { // Controleer of playButton is gedefinieerd
        playButton.addEventListener("click", function () {
            playWithPet(toyItems);
        });
    }
});

// Formatteer de verstreken tijd naar mm:ss formaat
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
}
