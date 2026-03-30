const photographer = document.getElementById('author');
getBackgroundPic();

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

async function insertBackgroundPic() {
	const data = await fetchBackground();
	(document.getElementsByTagName("BODY"))[0].style.backgroundImage = `url(${data.urls.raw})`;
}
