



let numberOfCards = null; 
let gameArray = [];
let cardsArray= [];
let turnedCards = 0;
let cardVerification = [];

document.querySelector('.start-button').addEventListener('click',()=>{
    document.querySelector('.start-button').classList.add('no-display');
    askNumberOfCards();
});

function askNumberOfCards() {
      
    numberOfCards = prompt('EN: How many cards would you like to play with? Choose any even number between 4 and 14. \n\nPORT: Com quantas cartas você gostaria de jogar? Escolha qualquer número par entre 4 e 14.'); 

    if (numberOfCards % 2 == 0 && numberOfCards >= 4 && numberOfCards <= 14) {
        alert(`
        EN: Starting game with ${numberOfCards} cards...
        PORT: Iniciando jogo com ${numberOfCards} cartas...`);

        buildGameArray(numberOfCards/2);

    } else {
        alert('EN: Choose an even number between 4 and 14.\n\nPORT: Escolha um número par entre 4 e 14.');
        askNumberOfCards();
    }
    
}

function buildGameArray(cardsNumber) {
    let slicedArray = cardsJson.slice(0, cardsNumber);

    slicedArray.map((item) => {
        gameArray.push(item);
        gameArray.push(item);
    });

    gameArray = gameArray.sort(comparator);

    createInterface();

}

function comparator() { 
	return Math.random() - 0.5; 
}

function createInterface() {

    gameArray.map((item) => {
        let card = document.querySelector('.card').cloneNode(true);

        card.setAttribute('card-id', item.id)
        card.querySelector('.back-face img').src = item.backImg;
        card.querySelector('.back-face img').alt = item.alt;

        document.querySelector('section').append(card);

    });

    cardsArray = Array.from(document.querySelectorAll('section .card'));

    cardSelection();

}



function cardSelection() {
    cardsArray.map((item) => {
        item.addEventListener("click", ()=>{
            if (cardVerification.length <= 2) {
                item.querySelector('.front-face').classList.add('front-face-turn');
                item.querySelector('.back-face').classList.add('back-face-turn');

                let cardKey = item.getAttribute('card-id');
                cardVerification.push(cardKey);

                if (cardVerification.length === 2) {
                    if(cardVerification[0] === cardVerification[1]) {
                        console.log('Acertou');
                        document.querySelector('.front-face-turn').classList.replace('front-face-turn','match-front');
                        document.querySelector('.back-face-turn').classList.replace('back-face-turn', 'match-back');
                        
                        document.querySelector('.front-face-turn').classList.replace('front-face-turn','match-front');
                        document.querySelector('.back-face-turn').classList.replace('back-face-turn', 'match-back');

                        cardVerification.splice(0,2);
                        
                    } else {
                        setTimeout(()=>{
                            document.querySelector('.front-face-turn').classList.remove('front-face-turn');
                            document.querySelector('.back-face-turn').classList.remove('back-face-turn');
                            
                            document.querySelector('.front-face-turn').classList.remove('front-face-turn');
                            document.querySelector('.back-face-turn').classList.remove('back-face-turn');
    
                            console.log('Errou');
                            cardVerification.splice(0,2);
                        }, 1000);


                        

                    }
                }
                
            }
        });
        
    });
}








