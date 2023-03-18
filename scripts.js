const URL = "https://api.football-data.org/v4/matches";

const response = fetch(URL, {
  headers: {
    "X-Auth-Token": "5366492db9d34e64bd0bd57c503d82ed",
  },
})
  // const response = fetch(URL, {
  //   method: "GET",
  //   headers: {
  //     "X-Auth-Token": "5366492db9d34e64bd0bd57c503d82ed",
  //     "X-Unfold-Goals": "true",
  //     "Accept-Encoding": "gzip, deflate, br",
  //     Connection: "keep-alive",
  //     "Content-Type": "application/json",
  //   },
  // })
  .then((response) => response.json())
  .then((data) => data);

console.log(response);
