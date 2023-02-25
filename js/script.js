const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const input = document.querySelector('.name');
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

function showGreeting() {
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
