fetch('/js/matches.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load matches.json');
    }
    return response.json();
  })
  .then(matches => {
    renderMatches(matches);
  })
  .catch(error => {
    console.error(error);
    const container = document.getElementById('matchesList');
    if (container) {
      container.innerHTML = '<p>Unable to load matches at this time.</p>';
    }
  });

function renderMatches(matches) {
  const container = document.getElementById('matchesList');
  if (!container) return;

  // Clear any existing content
  container.innerHTML = '';

  matches.forEach(match => {
    const card = document.createElement('article');
    card.classList.add('match-card');

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