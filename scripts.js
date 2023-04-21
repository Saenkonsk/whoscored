const URL =
  "https://api.football-data.org/v4/matches/?dateFrom=2023-03-19&dateTo=2023-03-20";

// вот эта функция всё отрисовывает
async function render() {
  let res = await fetch(URL, {
    headers: {
      "X-Auth-Token": "5366492db9d34e64bd0bd57c503d82ed",
    },
  })

  let json = await res.json();

  // Получает список турниров
  function getCompetitions(json) {
    return json.resultSet.competitions.split(",");
  }

  function formatDate(value = "") {
    const date = new Date(value);
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${hours}:${minutes}`;
  }

  function createMatches(matches) {
    let res = "";

    matches.forEach((match) => {
      res += `<li>
    <article class="competitionList__matchWrapper">
      <span>${formatDate(match.utcDate)}</span>
      <img src="${match.homeTeam.crest}" width="30" height="30" alt="Логотип ${match.homeTeam.name}" />
      <span>${match.homeTeam.name}</span>
      <span>${match.score.fullTime.home}:${match.score.fullTime.away}</span>
      <img src="${match.awayTeam.crest}" width="30" height="30"  alt="Логотип ${match.awayTeam.name}" />
      <span>${match.awayTeam.name}</span>
    </article>
  </li>`;
    });

    return res;
  }

  // ul для соревнований
  const competitionList = document.createElement("ul");
  competitionList.className = "competitionList list";

  const competitions = getCompetitions(json);

  competitions.forEach((competition) => {
    // получили список матчей для турнира
    const matches = json.matches.filter(
      (match) => match.competition.code === competition
    );

    const li = document.createElement("li");
    li.className = "competitionList__item";
    li.innerHTML = ` 
    <section class="competitionList__itemSection">
      <div class="competitionList__headWrapper">
        <img class="competitionLogo" src="${
          matches[0].competition.emblem
        }" width="24" height="24" alt="Логотип ${matches[0].competition.name}" />
        <h2 class="comtetitionTitle">${matches[0].competition.name}</h2>
        <span class="comtetitionStage">${matches[0].matchday} тур</span>
      </div>
      <ul class="competitionList__matches list">
        ${createMatches(matches)}
      </ul>
    </section>
  `;

    competitionList.append(li);
  });

  const wrapper = document.querySelector(".mapping");
  wrapper.append(competitionList);
}

render();
