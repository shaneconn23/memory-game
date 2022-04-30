let score = 0;
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let noClicking = false;

const cardColors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

const gameContainer = document.getElementById("game");


function shuffle(array) {
    let cardCount = array.length;

    // While there are elements in the array
    while (cardCount > 0) {
        let i = Math.floor(Math.random() * cardCount);
        //  decrease by 1
        cardCount--;
        //  swap
        let temp = array[cardCount];
        array[cardCount] = array[i];
        array[i] = temp;
    }

    return array;
}

let shuffledColors = shuffle(cardColors);


//  looping over the array 
// create a new div and gives it a class with the value of the color
//  adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!firstCard || !secondCard) {
        currentCard.classList.add("flipped");
        firstCard = firstCard || currentCard;
        secondCard = currentCard === firstCard ? null : currentCard;
    }

    if (firstCard && secondCard) {
        noClicking = true;
        // debugger
        let gif1 = firstCard.className;
        let gif2 = secondCard.className;

        if (gif1 === gif2) {
            cardsFlipped += 2;
            firstCard.removeEventListener("click", handleCardClick);
            secondCard.removeEventListener("click", handleCardClick);
            firstCard = null;
            secondCard = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                firstCard.style.backgroundColor = "";
                secondCard.style.backgroundColor = "";
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard = null;
                secondCard = null;
                noClicking = false;
            }, 500);
        }
    }

    if (cardsFlipped === cardColors.length) alert("YOU WIN!");
}

createDivsForColors(shuffledColors);