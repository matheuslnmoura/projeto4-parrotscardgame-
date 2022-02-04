let numberOfCards = null; 
let gameArray = [];
let cardsArray= [];
let turnedCards = 0;
let cardVerification = [];
let correctCards = 0;
let wrongCards = 0;
let clock = null;
let timerInterval = null;
let gameEndTimeEnglish = null;
let gameEndTimePortuguese = null;
let numberOfClicks = 0;

document.querySelector('.start-button').addEventListener('click', startGame);

function startGame() {
    numberOfCards = null; 
    gameArray = [];
    cardsArray= [];
    turnedCards = 0;
    cardVerification = [];
    correctCards = 0;
    wrongCards = 0;
    clock = null;
    timerInterval = null;
    gameEndTimeEnglish = null;
    gameEndTimePortuguese = null;
    numberOfClicks = 0;

    document.querySelector('section').innerHTML = "";
    document.querySelector('.start-button').classList.add('no-display');
    document.querySelector('.clock').classList.remove('no-display');

    askNumberOfCards();
    
}

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

        card.setAttribute('card-id', item.id);

        card.setAttribute('data-identifier', 'card');
        card.querySelector('.front-face').setAttribute('data-identifier','front-face');
        card.querySelector('.back-face').setAttribute('data-identifier','back-face');

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
            numberOfClicks++
            if (numberOfClicks === 1) {
                timer();
            }
            
            if(item.querySelector('.front-face').classList.contains('match-front')){
                // console.log('Essa carta já tem um par na tela');
            } else {
                if (cardVerification.length < 2) {
                    item.querySelector('.front-face').classList.add('front-face-turn');
                    item.querySelector('.back-face').classList.add('back-face-turn');

                    let cardKey = item.getAttribute('card-id');
                    cardVerification.push(cardKey);

                    if (cardVerification.length === 2) {
                        blockClicks();
                        if(cardVerification[0] === cardVerification[1]) {
                            correctCards++;
                            document.querySelector('.front-face-turn').classList.replace('front-face-turn','match-front');
                            document.querySelector('.back-face-turn').classList.replace('back-face-turn', 'match-back');
                            
                            if(document.querySelector('.front-face-turn') == null){
                                item.querySelector('.match-front').classList.toggle('match-front');
                                item.querySelector('.match-back').classList.toggle('match-back');
                                correctCards--;

                            } else {
                                document.querySelector('.front-face-turn').classList.replace('front-face-turn','match-front');
                                document.querySelector('.back-face-turn').classList.replace('back-face-turn', 'match-back');


                            }
                            console.log('Cartas Corretas ' + correctCards)
                            cardVerification = [];
                            
                        } else { 
                            cardVerification = [];
                            wrongCards++;
                            console.log('Jogadas Erradas ' + wrongCards);
                            setTimeout(()=>{
                                
                                document.querySelector('.front-face-turn').classList.remove('front-face-turn');
                                document.querySelector('.back-face-turn').classList.remove('back-face-turn');
                                
                                document.querySelector('.front-face-turn').classList.remove('front-face-turn');
                                document.querySelector('.back-face-turn').classList.remove('back-face-turn');
        
                            }, 1000);
                        }
            
                    }
                    
                }

                if (correctCards === (gameArray.length)/2) {
                    setTimeout(gameEnd, 500);
                    
                }
            }
        });
        
    });
}

function blockClicks() {
    document.querySelector('.block-clicks').classList.remove('no-display');
    setTimeout(() => {
        document.querySelector('.block-clicks').classList.add('no-display');
    }, 1000);
}


function gameEnd() {
    alert(`
    EN: Congratulations! 
        You won with ${(correctCards + wrongCards)*2} moves in ${gameEndTimeEnglish}

    PORT: Parabéns!
        Você ganhou com ${(correctCards + wrongCards)*2} jogadas em ${gameEndTimePortuguese}

    `);

    clearInterval(timerInterval);
    newGame();
}

function newGame() {
    let newGameAnswer = prompt(`
    EN: Would you like to play again?
        Type "yes" or "no"

    PORT: Gostaria de jogar novamente? 
        Digite "sim" ou "não"
    `)

    if (newGameAnswer === 'yes' || newGameAnswer === 'sim' || newGameAnswer === 's') {
        startGame();

    } else if (newGameAnswer === 'no' || newGameAnswer ==='não' || newGameAnswer ==='nao' || newGameAnswer ==='n') {
        document.location.reload(true);
    } else {
        alert(`
        EN: Invalid answer. Please type "yes" or "no"

        PORT: Resposta inválidade. Por favor, digite "sim" ou "não"
        `)
        newGame();
    }
}

function timer() {
    let hh = 0;
    let mm = 0;
    let ss = 0;

    let timer = document.querySelector('.clock');
    timer.innerHTML = '00:00:00';

    timerInterval = setInterval(() => {

        ss++;

        if(ss === 60) {
            ss = 0;
            mm++;

            if (mm === 60) {
                mm = 0;
                hh++;
            }
        }

        clock = (hh < 10 ? `0${hh}` : hh) + ':' + (mm < 10 ? `0${mm}` : mm) + ':' + (ss < 10 ? `0${ss}` : ss);

        timer.innerHTML = clock;

        gameEndTimeEnglish = (hh < 1 ? '' : (hh !== 1 ? `${hh} hours and ` : `${hh} hour and `)) + (mm < 1  ? '' : (mm !== 1 ? `${mm} minutes and ` : `${mm} minute and `)) + (ss < 1 ? '' : (ss !== 1 ? `${ss} seconds.` : `${ss} second.`));    

        gameEndTimePortuguese = (hh < 1 ? '' : (hh !== 1 ? `${hh} horas e ` : `${hh} hora e `)) +(mm < 1 ? '' : (mm !== 1 ? `${mm} minutos e ` : `${mm} minuto e `)) + (ss < 1 ? '' : (ss !== 1 ? `${ss} segundos.` : `${ss} segundo.`)); 

    }, 1000);
}






