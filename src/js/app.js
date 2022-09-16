// Variables
const cardsDiv = document.querySelector('#cards');
const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');
const current = document.querySelector('current');
const previous = document.querySelector('previous');
const url = './data.json';
// Init App
document.addEventListener('DOMContentLoaded', init);
// Functions
function init() {
    assignInfo();
    dailyBtn.classList.add('selected'); 
}
// Event Listeners
dailyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    erasePreviousSelection();
    dailyBtn.classList.add('selected'); 
    clearHTML();
    assignInfo();
});
weeklyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    erasePreviousSelection();
    weeklyBtn.classList.add('selected');
    clearHTML();
    assignInfo();
});
monthlyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    erasePreviousSelection();
    monthlyBtn.classList.add('selected'); 
    clearHTML();
    assignInfo();
});

function assignInfo() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            json.forEach(data => {
                build(data);
            });
        })
    .catch(error => console.log(error));
}

function build(data) {
    const {title, timeframes} = data;
    // Main Div for Each Card
    const cardContainer = document.createElement('DIV');
    cardContainer.classList.add('card-container');
    const card = document.createElement('DIV');
    card.classList.add('card');
    // Build Upper Info
    buildCards(cardContainer, card, title);
    buildTimes(card, timeframes);
}

function buildCards(cardContainer, card, title) {
    if(title === 'Self Care'){
        card.classList.add('self-care');
    } else {
        card.classList.add(title.toLowerCase());
    }

    // Card Background
    const cardBg = document.createElement('DIV');
    const cardBgImg = document.createElement('IMG');
    if(title === 'Self Care') {
        cardBgImg.src = 'images/icon-self-care.svg';
    } else {
        cardBgImg.src = `images/icon-${title}.svg`;
    }
    // Class Style Control
    if(title === 'Self Care'){
        cardBg.classList.add('card__bg--self-care');
    } else {
        cardBg.classList.add(`card__bg--${title}`.toLowerCase());
    }

    // Title and Info
    const headingCardInfo = document.createElement('DIV');
    const ellipsisImg = document.createElement('IMG');
    ellipsisImg.src = 'images/icon-ellipsis.svg';
    const cardTitle = document.createElement('H2');
    cardTitle.textContent = title;
    headingCardInfo.classList.add('card__head-info');
    headingCardInfo.appendChild(cardTitle);
    headingCardInfo.appendChild(ellipsisImg);

    cardBg.appendChild(cardBgImg);
    cardContainer.appendChild(cardBg);
    card.appendChild(headingCardInfo);
    cardContainer.appendChild(card);
    cardsDiv.appendChild(cardContainer);
}

function buildTimes(card, timeframes){
    const {daily, weekly, monthly} = timeframes;
    const lowerCardInfo = document.createElement('DIV');
    lowerCardInfo.classList.add('card__lower-info');
    const cardCurrent = document.createElement('P');
    cardCurrent.classList.add('current');
    const cardPrevious = document.createElement('P');
    cardPrevious.classList.add('previous');

    if(dailyBtn.classList.contains('selected')){
        cardCurrent.textContent = `${daily.current}hrs`;
        cardPrevious.textContent = `Yesterday - ${daily.previous}hrs`;
        
    }
    if(weeklyBtn.classList.contains('selected')) {
        cardCurrent.textContent = `${weekly.current}hrs`;
        cardPrevious.textContent = `Last week - ${weekly.previous}hrs`;
    }
    if(monthlyBtn.classList.contains('selected')) {
        cardCurrent.textContent = `${monthly.current}hrs`;
        cardPrevious.textContent = `Last month - ${monthly.previous}hrs`;
    }
    lowerCardInfo.appendChild(cardCurrent);
    lowerCardInfo.appendChild(cardPrevious);
    card.appendChild(lowerCardInfo);
}

function erasePreviousSelection() {
    const selected = document.querySelector('.selected');
    if(selected) {
        selected.classList.remove('selected');
    }
    return;
}

function clearHTML() {
    while(cardsDiv.firstChild) {
        cardsDiv.removeChild(cardsDiv.firstChild);
    }
}