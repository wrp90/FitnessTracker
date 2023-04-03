const button = document.querySelector('.button');
const workoutbutton=document.querySelector('.workoutbutton')

// API call function
const ButtonAPIcall = () => {
  fetch("https://wger.de/api/v2/", {
    headers: {
      Authorization: "Token 4f79ebb6fbc51e404161b06d7aa339d854859d36"
    }
  }).then((response) => response.json()).then((data) => console.log(data));
}

button.addEventListener('click', () => {
  ButtonAPIcall();
});


const WorkoutButtonAPIcall = () => {
  fetch("https://wger.de/api/v2/workout/", {
    headers: {
      Authorization: "Token 4f79ebb6fbc51e404161b06d7aa339d854859d36"
    }
  }).then((response) => response.json()).then((data) => console.log(data));
}

workoutbutton.addEventListener('click', () => {
  WorkoutButtonAPIcall();
});