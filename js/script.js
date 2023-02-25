const time = document.querySelector('.time');
const data = document.querySelector('.date');

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
}

showTime();
