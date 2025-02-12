const cardImages = [
    'https://cdn-icons-png.flaticon.com/512/4807/4807336.png',
    'https://i.pinimg.com/564x/44/b8/8a/44b88aec28d02c1c142601a6e1b7ee9f.jpg',
    'https://i.pinimg.com/564x/12/b3/e0/12b3e0362205a5845b278ebc5af363d3.jpg',
    'https://cdn-icons-png.flaticon.com/512/10775/10775498.png',
    'https://cdn-icons-png.flaticon.com/512/4095/4095404.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7x4XUrYJfxtg07BsLLCmlmImRea0ejbND0A&s',
    'https://cdn-icons-png.flaticon.com/512/3669/3669574.png',
    'https://cdn-icons-png.flaticon.com/512/6688/6688633.png'
];

const cardsContainer = document.querySelector('.cards');

function generateCards() {
    let cardArray = [...cardImages, ...cardImages];
    shuffleArray(cardArray); 

    cardArray.forEach(imgSrc => {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `
            <div class="view front-view">
                <img src="https://images.vexels.com/media/users/3/143554/isolated/preview/4891b5f6c604304b74f030ce8a13f762-red-3d-question-mark-icon.png" alt="icon"> <!-- Centered ? Icon -->
            </div>
            <div class="view back-view">
                <img src="${imgSrc}" alt="card-img">
            </div>
        `;
        cardsContainer.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('flip');
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('.back-view img').src,
            cardTwoImg = cardTwo.querySelector('.back-view img').src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched === 8) {
            setTimeout(() => {
                alert('Congratulations, you matched all pairs! Happy Valentine\'s Day! 💖      - INF 241 :]');
                return restartGame();
            }, 1000);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
        setTimeout(() => {
            cardOne.classList.remove('flip', 'shake');
            cardTwo.classList.remove('flip', 'shake');
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 500);
    }, 1000);
}

function restartGame() {
    matched = 0;
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.remove()); 
    generateCards(); 
}

generateCards();
