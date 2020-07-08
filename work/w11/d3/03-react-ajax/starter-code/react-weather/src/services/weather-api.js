export function getCurWeatherByLatLng(lat, lng){
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=4507ec27b0a5b32877e856da0ceca6c9`;

  return fetch(endpoint).then(res => res.json())
}
