/// Global consts
const workoutButton = document.querySelector('.workout-button');
const searchInput = document.querySelector('.input');

// API call function
const handleInput = (input) => {
  console.log(input)
  fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${input}`, {
    headers: { 'X-Api-Key': '/a3wPcLBhSVR1BNq96vTjQ==oKDk6Uev3zRMZP6g'}
  }).then((response) => response.json()).then((data) => console.log(data));
};

/// Event listener for the search button on the workout page
workoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleInput(searchInput.value);
});

/// Input event listener that activates search when pressing enter key
searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    handleInput(searchInput.value);
  }
});



