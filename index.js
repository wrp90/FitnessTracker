const button = document.querySelector('.button');

// API call function
const APIcall = () => {
  fetch("https://wger.de/api/v2/", {
    headers: {
      Authorization: "Token 4f79ebb6fbc51e404161b06d7aa339d854859d36"
    }
  }).then((response) => response.json()).then((data) => console.log(data));
}

button.addEventListener('click', () => {
  APIcall();
});



