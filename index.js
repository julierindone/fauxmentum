insertBackgroundPic();

async function fetchBackground() {
	const url = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";

	try {
		const response = await fetch(url);

		return response.json();
	}
	catch (error) {
		(document.getElementsByTagName("BODY"))[0].innerHTML = `<h1 style="color:blue;">WHAT'S ALL THIS, THEN?</h1>`;
		console.error(error);
	}
}

async function insertBackgroundPic() {
	const data = await fetchBackground();
	(document.getElementsByTagName("BODY"))[0].style.backgroundImage = `url(${data.urls.raw})`;
}
