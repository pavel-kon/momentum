const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const input = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
// 1

function showDate() {
	const date = new Date();
	const options = {
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'UTC',
	};
	const currentDate = date.toDateString('ua-UA', options);
	data.textContent = currentDate;
}

function showTime() {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;
	setTimeout(showTime, 1000);
	showDate();
	showGreeting();
}

showTime();

/**
================================>	2 Greeting 
*/

function getTimeOfDay() {
	const date = new Date();
	const hours = date.getHours();
	if (hours < 6) {
		return 'night';
	} else if (hours < 12) {
		return 'morning';
	} else if (hours < 18) {
		return 'afternoon';
	} else {
		return 'evening';
	}
}
function showGreeting() {
	const timeOfDay = getTimeOfDay();
	const greetingText = `Good ${timeOfDay}`;
	greeting.textContent = greetingText;
}

function setLocalStorage() {
	localStorage.setItem('name', input.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		input.value = localStorage.getItem('name');
	}
}
window.addEventListener('load', getLocalStorage);

/**
================================>	3 Slider
*/

let randomNum = getRandomNum();

function getRandomNum() {
	return Math.floor(Math.random() * 20) + 1;
}

let bgNum = String(randomNum).padStart(2, '0');

function setBg() {
	const timeOfDay = getTimeOfDay();

	const img = new Image();
	img.src = `https://raw.githubusercontent.com/pavel-kon/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

	img.onload = () => {
		document.body.style.backgroundImage = `url(${img.src})`;
	};
}
setBg();

function getSlideNext() {
	if (randomNum < 20) {
		randomNum++;
	} else {
		randomNum = 1;
	}
	bgNum = String(randomNum).padStart(2, '0');

	setBg();
}

function getSlideprev() {
	if (randomNum > 1) {
		randomNum--;
	} else {
		randomNum = 20;
	}
	bgNum = String(randomNum).padStart(2, '0');

	setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlideprev);

/**
================================>	4 Weather
*/
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=db411c9b44c1b2e6e6f85a2c68550155&units=metric`;

	const res = await fetch(url);
	const data = await res.json();

	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${data.main.temp}°C`;
	weatherDescription.textContent = data.weather[0].description;
}
getWeather();

city.addEventListener('change', getWeather);

/**
================================>	5 Quotes
*/
const author = document.querySelector('.author');
const quote = document.querySelector('.quote');
const btnChangeQuote = document.querySelector('.change-quote');

let randomQoute;
randomQoute = Math.floor(Math.random() * 3);

function getQuotes() {
	const quotes = '/js/data.json';
	fetch(quotes)
		.then((res) => res.json())
		.then((data) => {
			author.textContent = data[randomQoute].author;
			quote.textContent = data[randomQoute].text;
		});
}
getQuotes();

function changeQuote() {
	let newRanomQuote = Math.floor(Math.random() * 3);
	while (newRanomQuote === randomQoute) {
		newRanomQuote = Math.floor(Math.random() * 3);
	}
	randomQoute = newRanomQuote;
	getQuotes();
}

btnChangeQuote.addEventListener('click', changeQuote);

/**
================================>	6 Player
*/
import playList from './playList.js';

const btnPlay = document.querySelector('.play');
const btnPlayNext = document.querySelector('.play-next');
const btnPlayPrev = document.querySelector('.play-prev');

function toggleBtn() {
	btnPlay.classList.toggle('pause');
	if (!isPlay) {
		btnPlay.classList.remove('pause');
	}
}

let isPlay = false;
let playNum = 0;

const audio = new Audio();

function playAudio() {
	audio.src = playList[playNum].src;
	audio.currentTime = 0;

	if (!isPlay) {
		audio.play();
		isPlay = true;
	} else {
		audio.pause();
		isPlay = false;
	}
}

function playNext() {
	btnPlay.classList.add('pause');
	isPlay = false;
	if (playNum < 3) {
		playNum++;
	} else if (playNum === 3) {
		playNum = 0;
	}

	playAudio();
}
function playPrev() {
	btnPlay.classList.add('pause');
	isPlay = false;
	if (playNum > 0) {
		playNum--;
	} else if (playNum === 0) {
		playNum = 3;
	}

	playAudio();
}

btnPlay.addEventListener('click', playAudio);
btnPlay.addEventListener('click', toggleBtn);
btnPlayNext.addEventListener('click', playNext);
btnPlayPrev.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list');

playList.forEach((el) => {
	const li = document.createElement('li');
	li.classList.add('play-item');
	playListContainer.append(li);
	li.textContent = el.title;
});
