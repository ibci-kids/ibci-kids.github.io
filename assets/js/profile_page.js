// load the profile on page refresh
document.addEventListener("DOMContentLoaded", function () {
    renderProfile();
});

// --- Dynamic profile loader ---
function getProfileIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.has('index') ? parseInt(params.get('index')) : null;
}

function renderProfile() {
    const index = getProfileIndexFromURL();
    if (index === null) return;
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    const item = profiles[index];
    if (!item) return;

    // Set page title
    document.title = `Researcher Spotlight - ${item.title} ${item.name}`;
    // Set main content
    const mainContent = document.querySelector("#main .inner");
    if (!mainContent) return;

    // Affiliations
    const affiliations = (item.affiliations || []).map(a => `${a}<br>`).join('');
    // Research keywords
    const researchKeywords = (item.researchInterestKeywords || []).join(', ');
    // Current topics
    const currentTopics = (item.currentResearchTopics || []).map(t => `<li>${t}</li>`).join('');
    // Socials
    const socials = (item.socials && item.socials[0]) ? `<a href="${item.socials[0]}"> LinkedIn</a>` : '';

    mainContent.innerHTML = `
                <div class="inner">
                    <h1>${item.title} ${item.name}</h1>
                    <span class="image left"><img src="../${item.imageURL}" alt="${item.imageAltText}" /></span>
                    <p>
                        <b>Lab Name:</b> ${item.labName} <br>
                        <b>Affiliations:</b> ${affiliations}
                        <b>Contact: </b>${item.contact}<br>
                        <b>Website:</b><a href="${item.website}"> ${item.websiteDisplayText}</a><br>
                        <b>Socials:</b>${socials}
                    </p>
                </div>
                <hr />
                <div class ="inner">
                    <h2>Lab Description</h2>
                    <p>${item.labDescription}</p>
                    <h2>Research Interest Keywords</h2>
                    <p>${researchKeywords}</p>
                    <h2>Current research topics</h2>
                    <ul>${currentTopics}</ul>
                </div>
            `;
}
