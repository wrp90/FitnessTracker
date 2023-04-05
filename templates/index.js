
const workoutbutton = document.querySelector('.workout-button')

// API call function
const APIcall = () => {
  fetch("https://api.api-ninjas.com/v1/exercises", {
    headers: { 'X-Api-Key': '/a3wPcLBhSVR1BNq96vTjQ==oKDk6Uev3zRMZP6g'}
  }).then((response) => response.json()).then((data) => console.log(data));
}

workoutbutton.addEventListener('click', () => {
  APIcall();
});
