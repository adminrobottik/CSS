class SFButton {
	instance;

	constructor() {
		if (!SFButton.instance) SFButton.instance = this;
		return SFButton.instance;
	}

	initButtons() {
		document.querySelectorAll(".js-sfbtn").forEach(this.createButton);
	}

	createButton(btn) {
		if (!btn.classList.contains("js-sfbtn")) exit;
		const btnContent = btn.innerHTML;

		const btnTail = document.createElement("div");
		btnTail.classList.add("btn-tail");

		const btnBody = document.createElement("div");
		btnBody.classList.add("btn-body");
		btnBody.innerHTML = `<p>${btnContent}</p>`;

		btn.innerHTML = "";
		btn.classList.add("btn-wrapper");
		btn.classList.remove("js-sfbtn");
		btn.appendChild(btnTail);
		btn.appendChild(btnBody);

		btn.style.setProperty("--bg-color", btn.dataset.bgColor);
		btn.style.setProperty("--font-color", btn.dataset.fontColor);
		btn.style.setProperty("--bg-color-hovered", btn.dataset.bgColorHovered);
		btn.style.setProperty("--font-color-hovered", btn.dataset.fontColorHovered);
	}

	formatLink(
		content,
		href,
		colorBG,
		colorBGHovered,
		colorFont,
		colorFontHovered
	) {
		const link = document.createElement("a");
		link.dataset.bgColor = colorBG;
		link.dataset.fontColor = colorFont;
		link.dataset.bgColorHovered = colorBGHovered;
		link.dataset.fontColorHovered = colorFontHovered;
		link.innerHTML = content;
		link.href = href;
		link.classList.add("js-sfbtn");
		return link;
	}
}

/*** JavaScript integration ***/
// First get the SFButton instance
const sfButton = new SFButton();

// There is two way to use SFButton builder

// When the page has been build ...
sfButton.initButtons();

// ... And to add a new button asynchronously
addALinkAsynchronously();

// Those are the functions used to create the asynchronous link
async function addALinkAsynchronously() {
	const linkData = await fetchDataFromAnAPIOrWhatEver();
	const link = sfButton.formatLink(
		linkData.content,
		linkData.href,
		"#fffff0",
		"#c4afff",
		"#000000",
		"#000000"
	);
	document.querySelector(".app-body").appendChild(link);
	sfButton.createButton(link);
}

function fetchDataFromAnAPIOrWhatEver() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				content:
					"About<span style='font-size: 0.7rem; margin-left: 5px;'>Added asynchronously</span>",
				href: "#"
			});
		}, 3000);
	});
}
