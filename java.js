document.addEventListener("DOMContentLoaded", function () {
    // Elementen selecteren
    const huisdierAfbeeldingen = document.getElementById("huisdier-afbeeldingen");
    const niveauVoortgang = document.getElementById("niveau-voortgang");
    const voedKnop = document.getElementById("voedKnop");
    const speelKnop = document.getElementById("speelKnop");
    const gelukWaarde = document.getElementById("gelukWaarde");
    const niveauWaarde = document.getElementById("niveauWaarde");

    const neutraalHuisdier = document.getElementById("neutraalHuisdier");
    const blijHuisdier = document.getElementById("blijHuisdier");
    const verdrietigHuisdier = document.getElementById("verdrietigHuisdier");

    // Variabelen voor het spel
    let geluk = 50;
    let niveau = 1;
    let timerSeconden = 0;

    // Voedsel en speelgoed arrays 
    const voedselItems = ["appel", "kaas", "vis"];
    const speelgoedItems = ["bal", "touw", "muis"];

    // Timer variabelen
    let startTijd;
    let verstrekenTijd;

    // Start de timer
    function startTimer() {
        startTijd = Date.now();
    }

    // Bereken de verstreken tijd
    function berekenVerstrekenTijd() {
        const huidigeTijd = Date.now();
        verstrekenTijd = Math.floor((huidigeTijd - startTijd) / 1000); 
        return verstrekenTijd;
    }

    // Reset het spel en toon een melding
    function resetSpel(verstrekenTijdGeformatteerd, timerInterval) {
        clearInterval(gelukInterval);
        clearInterval(timerInterval);
        alert("Helaas! Je huisdier is niet meer gelukkig. Tijd: " + verstrekenTijdGeformatteerd);
        resetGeluk();
        startTimer(); // Start de timer opnieuw
    }

    // Voed het huisdier en verhoog het geluksniveau
    function voerHuisdier(voedsel) {
        const willekeurigeIndex = Math.floor(Math.random() * voedsel.length);
        const willekeurigVoedsel = voedsel[willekeurigeIndex];
        const willekeurigeToename = Math.floor(Math.random() * 10) + 1;
        geluk += willekeurigeToename;
        geluk = Math.min(geluk, 100);
        updateGeluk();
    }

    // Speel met het huisdier en verhoog het geluksniveau
    function speelMetHuisdier(speelgoed) {
        const willekeurigeIndex = Math.floor(Math.random() * speelgoed.length);
        const willekeurigSpeelgoed = speelgoed[willekeurigeIndex];
        const willekeurigeToename = Math.floor(Math.random() * 15) + 1;
        geluk += willekeurigeToename;
        geluk = Math.min(geluk, 100);
        updateGeluk();
    }

    // Update het geluksniveau van het huisdier en voer acties uit op basis daarvan
    function updateGeluk(timerInterval) {
        gelukWaarde.textContent = geluk;

        // Controleer of het huisdier is gestegen naar een nieuw niveau
        if (geluk >= 100) {
            niveauOmhoog();
        }

        // Controleer of de geluksmeter op 0 staat
        if (geluk <= 0) {
            const verstrekenTijd = berekenVerstrekenTijd();
            const verstrekenTijdGeformatteerd = formatteerTijd(verstrekenTijd);
            resetSpel(verstrekenTijdGeformatteerd, timerInterval);
        } else {
            // Update de afbeelding en niveauvoortgang als de gelukswaarde niet 0 is
            if (geluk >= 75) {
                stelHuisdierAfbeeldingIn(blijHuisdier);
            } else if (geluk >= 50) {
                stelHuisdierAfbeeldingIn(neutraalHuisdier);
            } else {
                stelHuisdierAfbeeldingIn(verdrietigHuisdier);
            }
            updateNiveauBalk();
        }
    }

    // Reset het geluksniveau van het huisdier naar 50
    function resetGeluk() {
        geluk = 50;
        updateGeluk();
    }

    // Wijzig de afbeelding van het huisdier op basis van het geluksniveau
    function stelHuisdierAfbeeldingIn(actiefHuisdier) {
        [neutraalHuisdier, blijHuisdier, verdrietigHuisdier].forEach((huisdier) => {
            huisdier.style.display = "none";
        });
        actiefHuisdier.style.display = "block";
    }

    // Verhoog het niveau van het huisdier
    function niveauOmhoog() {
        niveau++;
        niveauWaarde.textContent = niveau;
        geluk = 50; 

        // Geluid afspelen bij level up (Via YouTube geleerd)
        const levelOmhoogGeluid = new Audio('audio/levelup.mp3');
        levelOmhoogGeluid.play();
    }

    // Werk de niveauvoortgangsbalk bij (Laatste regel met behulp van ChatGPT)
    function updateNiveauBalk() {
        if (niveauVoortgang) { 
            const voortgangBreedte = (geluk / 100) * 300;
            niveauVoortgang.style.width = `${voortgangBreedte}px`;
        }
    }

    // Verminder het geluksniveau van het huisdier na verloop van tijd
    function verminderGeluk() {
        const willekeurigeAfname = Math.floor(Math.random() * 10) + 1; 
        geluk -= willekeurigeAfname;
        geluk = Math.max(geluk, 0);
        updateGeluk();
    }

    // Start de timer bij het laden van de pagina
    startTimer();

    // Voer de verminderGeluk-functie uit op een vast interval
    const gelukInterval = setInterval(verminderGeluk, 2000); // Verlaag de intervaltijd naar 2 seconden

    // Voeg event listeners toe aan de voed- en speelknoppen
    if (voedKnop) { 
        voedKnop.addEventListener("click", function () {
            voerHuisdier(voedselItems);
        });
    }
    if (speelKnop) { 
        speelKnop.addEventListener("click", function () {
            speelMetHuisdier(speelgoedItems);
        });
    }
});

// Formatteer de verstreken tijd naar mm:ss formaat (Dit heb ik met behulp van ChatGPT gedaan)
function formatteerTijd(seconden) {
    const minuten = Math.floor(seconden / 60);
    const resterendeSeconden = seconden % 60;
    const geformatteerdeTijd = `${minuten.toString().padStart(2, '0')}:${resterendeSeconden.toString().padStart(2, '0')}`;
    return geformatteerdeTijd;
}


