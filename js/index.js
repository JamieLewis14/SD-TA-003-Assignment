console.log("index.js loaded on:", window.location.pathname);
console.log("search:", window.location.search);
// Matches content

fetch("/js/matches.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load matches.json");
    }
    return response.json();
  })
  .then((matches) => {
    renderMatches(matches);
  })
  .catch((error) => {
    console.error(error);
    const container = document.getElementById("matchesList");
    if (container) {
      container.innerHTML = "<p>Unable to load matches at this time.</p>";
    }
  });

function renderMatches(matches) {
  const container = document.getElementById("matchesList");
  if (!container) return;

  container.innerHTML = "";

  matches.forEach((match) => {
    const card = document.createElement("article");
    card.classList.add("match-card");

    card.innerHTML = `
  <div class="match-teams">
    <span class="team team-home">
      <img class="team-logo" src="${match.homeLogo}" alt="${match.homeTeam} logo">
      <span>${match.homeTeam}</span>
    </span>
    <span class="vs">vs</span>
    <span class="team team-away">
      <img class="team-logo" src="${match.awayLogo}" alt="${match.awayTeam} logo">
      <span>${match.awayTeam}</span>
    </span>
  </div>
  <div class="match-meta">
    <span class="match-date">${match.date}</span>
    <span class="match-time">${match.time}</span>
    <span class="match-stage">${match.stage}</span>
  </div>
  <button class="match-btn">Match Details</button>
`;

    container.appendChild(card);
  });
}

// Store content

class Jersey {
  constructor(id, team, price, imageName) {
    this.id = id;
    this.team = team;
    this.price = price;
    this.imageName = imageName;
  }
}

const jerseys = [
  new Jersey(1, "Vegas Faze", 79.99, "images/fazejersey.png"),
  new Jersey(2, "Optic Texas", 79.99, "images/opticjersey.png"),
  new Jersey(3, "LA Thieves", 79.99, "images/latjersey.png"),
  new Jersey(4, "Toronto KOI", 79.99, "images/torontojersey.png"),
  new Jersey(5, "Vancouver Surge", 79.99, "images/vancouverjersey.png"),
  new Jersey(6, "Boston Breach", 79.99, "images/bostonjersey.png"),
  new Jersey(7, "Miami Heretics", 79.99, "images/miamijersey.png"),
  new Jersey(8, "Paris Gentlemates", 79.99, "images/gentlematesjersey.png"),
  new Jersey(9, "Riyadh Falcons", 79.99, "images/riyadh.png"),
  new Jersey(10, "Carolina Royal Ravens", 79.99, "images/carolinajersey.png"),
  new Jersey(11, "Cloud 9 New York", 79.99, "images/c9jersey.png"),
  new Jersey(12, "G2 Minnesota", 79.99, "images/g2jersey.png"),
  new Jersey(13, "Optic Gaming 2017 Champs", 119.99, "images/2017optic.png"),
];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-buy").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const jerseyId = btn.dataset.id;
      const card = btn.closest(".product-card");
      const size = card?.querySelector(".product-size")?.value;

      if (!size) {
        alert("Please select a size first.");
        return;
      }

      window.location.href = `cart.html?jerseyId=${encodeURIComponent(
        jerseyId
      )}&size=${encodeURIComponent(size)}`;
    });
  });

  const teamNameEl = document.getElementById("teamName");
  const priceEl = document.getElementById("price");
  const jerseySizeEl = document.getElementById("jerseySize");
  const imgEl = document.getElementById("jerseyImg");

  // if none of these exist, we're not on cart.html (or IDs are wrong)
  if (!teamNameEl && !priceEl && !jerseySizeEl && !imgEl) return;

  const params = new URLSearchParams(window.location.search);
  const selectedJerseyID = params.get("jerseyId");
  const selectedSize = params.get("size");

  const jersey = jerseys.find((j) => j.id === Number(selectedJerseyID));
  if (!selectedJerseyID || !selectedSize || !jersey) {
    document.body.insertAdjacentHTML(
      "beforeend",
      "<p>Invalid selection. <a href='Jerseys.html'>Go back to Jerseys</a></p>"
    );
    return;
  }

  if (teamNameEl) teamNameEl.textContent = jersey.team;
  if (priceEl) priceEl.textContent = "€" + jersey.price.toFixed(2);
  if (jerseySizeEl) jerseySizeEl.textContent = selectedSize;

  if (imgEl) {
    imgEl.src = jersey.imageName;
    imgEl.alt = jersey.team + " Jersey";
  }
});
