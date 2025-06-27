// run generatePreviews when page is loaded
document.addEventListener("DOMContentLoaded", () => {
    generatePreviews();
    generateMenuItems();
}
);

function generatePreviews() {
    fetch("profiles.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("profiles", JSON.stringify(data));
            displayPreviews(data);
        })
        .catch(error => console.error("Error loading menu items: ", error));
}

function displayPreviews(data) {
    const tiles = document.querySelector(".tiles"); // Use the correct selector for your tiles section

    if (!tiles) {
        console.log("Tile section not found");
        return;
    }

    tiles.innerHTML = '';
    const htmlArr = [];
    data.forEach((item, index) => {
        htmlArr.push(`
            <article>
                <span class="image">
                    <img src="${item.imageURL}" alt="${item.imageAltText}">
                </span>
                <a href="javascript:goToPage(${index})">
                    <h2>${item.name}</h2>
                    <div class="content">
                        <p>${item.shortDescription}</p>
                    </div>
                </a>
            </article>`);
    });
    tiles.innerHTML = htmlArr.join('');
}

function generateMenuItems() {
    const menu = document.querySelector("#menu");

    const htmlArr = [];
    profiles = JSON.parse(localStorage.getItem("profiles"));

    profiles.forEach((item, index) => {
        htmlArr.push(`<li><a href="javascript:goToPage(${index})">${item.name}</a>`);
    });

    menu.innerHTML = `
    <div claSS="inner">
        <h2>Menu</h2>
        <ul>
            <li><a href="index.html">Home</a></li>
            ${htmlArr.join('')}
        </ul>
    </div>
    `;
}

function goToPage(index) {
    // redirect page with index as query parameter
    console.log("Going to page # " + index);
    document.location.href = "pages/profile.html?index=" + index;
}