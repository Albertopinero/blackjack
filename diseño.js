var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck;

var canHit = true;

window.onload = function() {
    buildDeck();
    Baraja();
    EmpezarJuego();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function Baraja() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function EmpezarJuego() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let carta = deck.pop();
        cardImg.src = "./cartas/" + carta + ".png";
        dealerSum += getValue(carta);
        dealerAceCount += checkAce(carta);
        document.getElementById("cartas-dealer").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let carta = deck.pop();
        cardImg.src = "./cartas/" + carta + ".png";
        yourSum += getValue(carta);
        yourAceCount += checkAce(carta);
        document.getElementById("tus-cartas").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("tomar-carta").addEventListener("click", TomarCarta);
    document.getElementById("plantarse").addEventListener("click", Plantarse);

}

function TomarCarta() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cartas/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("tus-cartas").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { 
        canHit = false;
    }

}

function Plantarse() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cartas/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "Has Perdido!";
    }
    else if (dealerSum > 21) {
        message = "Has Ganado!";
    }

    else if (yourSum == dealerSum) {
        message = "EMPATE!";
    }
    else if (yourSum > dealerSum) {
        message = "Has Ganado!";
    }
    else if (yourSum < dealerSum) {
        message = "Has Perdido!";
    }

    document.getElementById("suma-dealer").innerText = dealerSum;
    document.getElementById("mi-suma").innerText = yourSum;
    document.getElementById("resultados").innerText = message;
}

function getValue(carta) {
    let data = carta.split("-"); 
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(carta) {
    if (carta[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

const rendirseBtn = document.getElementById("rendir");

rendirseBtn.addEventListener("click", function() {
  rendirse();
});

function rendirse() {
  
  saldo -= apuesta / 2;
  finalizarJuego();
}


