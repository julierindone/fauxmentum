const photographer = document.getElementById('author');
const cryptoDiv = document.getElementById('crypto');
const cryptoTop = document.getElementById('crypto-top');

getBackgroundPic();
getCrypto();

cryptoDiv.addEventListener('mouseover', () => {
	cryptoDiv.classList.replace('unfocused-backdrop', 'focused-backdrop');
});
cryptoDiv.addEventListener('mouseleave', () => {
	cryptoDiv.classList.replace('focused-backdrop', 'unfocused-backdrop');
});

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
		const cryptoData = createCryptoDataItem(data);
		insertFetchedCrypto(cryptoData);
	}
	catch {
		console.error("something went wrong. no crypto for you!");
		insertCryptoNotAvailable();
	}
}

function createCryptoDataItem(data) {
	return {
		name: data.name,
		image: data.image.small,
		alt: `${data.name} icon`,
		currentPrice: data.market_data.current_price.usd,
		highPrice: data.market_data.high_24h.usd,
		lowPrice: data.market_data.low_24h.usd
	};
}

function insertFetchedCrypto(data) {
	const cryptoTop = document.createElement('div');
	cryptoTop.id = 'crypto-top';
	cryptoTop.innerHTML = `
		<img alt="${data.alt}" class="crypto-icon" src="${data.image}" />
		<p>${data.name}</p>`;

	const cryptoValues = document.createElement('ul');
	cryptoValues.classList.add('crypto-values');
	cryptoValues.innerHTML = `
		<li>Current: $${data.currentPrice}</li>
		<li>24-hour high: $${data.highPrice}</li>
		<li>24-hour low: $${data.lowPrice}</li>`;

	cryptoDiv.appendChild(cryptoTop);
	cryptoDiv.appendChild(cryptoValues);
}

function insertCryptoNotAvailable() {
	cryptoDiv.innerHTML = `<p>Data not available.</p>`;
}
