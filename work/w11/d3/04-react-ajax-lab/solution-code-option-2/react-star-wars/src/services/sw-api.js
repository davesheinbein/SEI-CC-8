const BASE_URL = 'https://swapi.dev/api/';

export function getAllStarships() {
  return fetch(`${BASE_URL}starships`, {mode: "cors"})
    .then(res => res.json());
}
