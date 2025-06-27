// load header, footer, and hamburger menu on page load
document.addEventListener("DOMContentLoaded", () => {
    loadHeaderAndFooter();
    generateMenuItems();
}
);

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
    document.location.href = "profile.html?index=" + index;
}

function loadHeaderAndFooter() {
    fetch("components/header.html").then(res => res.text()).then(html => {
        document.getElementById("page-header").innerHTML = html;
    });

    fetch("components/footer.html").then(res => res.text()).then(html => {
        document.getElementById("footer").innerHTML = html;
    });
}