const photographer = document.getElementById('author');
const cryptoDiv = document.getElementById('crypto');

getBackgroundPic();
getCrypto();

async function getBackgroundPic() {
	const url = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("oh fuck! it's an error!");
		}

		const data = await response.json();
		insertFetchedBackground(data);
	}
	catch {
		console.error("Something went wrong. Using default image.");
		insertDefaultBackground();
	}
}

function insertFetchedBackground(data) {
	document.body.style.backgroundImage = `url("${data.urls.raw}")`;
	photographer.innerText = `Photographer: ${data.user.name}`;
}

function insertDefaultBackground() {
	document.body.style.backgroundImage = `url("./assets/images/Yellowjackets-campfire.jpg")`;
	photographer.innerText = `"We'd love to have you for dinner..."`;
}

async function getCrypto() {
	const url = `https://api.coingecko.com/api/v3/coins/dogecoin`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("It's an error!");
		}
		const data = await response.json();
		insertFetchedCrypto(data);
	}
	catch {
		console.error("something went wrong. no crypto for you!");
		insertCryptoNotAvailable();
	}
}

function insertFetchedCrypto(data) {
	cryptoDiv.innerHTML = `
		<img alt="crypto icon" class="crypto-icon" src="${data.image.small}" />
		<p>${data.id}</p>`;
}

function insertCryptoNotAvailable() {
	cryptoDiv.innerHTML = `<p>Data not available.</p>`;
}
