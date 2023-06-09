/// Global consts
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.input');
const cardContainer = document.querySelector('.card-container');


/// Search Terms for the Auto Fill function for search bar
var searchTerms = ['cardio', 'plyometrics', 'stretching', 'abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps', 'beginner', 'intermediate', 'expert',]

// Function that handles input and does API call
const handleInput = (input) => {
  console.log(input)
  fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${input}`, {
    headers: { 'X-Api-Key': '/a3wPcLBhSVR1BNq96vTjQ==oKDk6Uev3zRMZP6g' }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        /// Card selectors
        const card = document.createElement('div');
        const cardId = `card-${i}`;

        card.setAttribute('id', cardId);
        const saveButton = `<button id="save-button${i}">Save</button>`
        card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="name">${data[i].name}</h5>
            <h5 class="type">${data[i].type}</h5>
            <h5 class="difficulty">${data[i].difficulty}</h5>
            <span id="dots-${i}">...</span><span id="more-${i}">
            <p class="instructions">${data[i].instructions}</p>
            </span>
            <button onclick="readMore(${i})" id="myBtn-${i}">Read more</button>
        </div>
        ${saveButton}
        </div>
        `;
        cardContainer.append(card);
        const saveButtonNode = document.getElementById(`save-button${i}`)
        saveButtonNode.addEventListener('click', () => saveExercise(data[i], 1))
      }
    });
};

const saveExercise = async (exercise, user_id) => {
  console.log(exercise)
  const data = {
    name: exercise.name,
    type: exercise.type,
    difficulty: exercise.difficulty,
    instructions: exercise.instructions.substr(0, 254),
    user_id: user_id
  };
  const response = await fetch("/exercise", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({data})
  });
};

function readMore(cardIndex) {
  var dots = document.getElementById("dots-" + cardIndex);
  var moreText = document.getElementById("more-" + cardIndex);
  var btnText = document.getElementById("myBtn-" + cardIndex);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

/// Event listener for the search button on the workout page
searchButton.addEventListener('click', (e) => {
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

/// Autocomplete function pulled from w3schools
const autocomplete = (inp, arr) => {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  const addActive = (x) => {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  const removeActive = (x) => {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  const closeAllLists = (elmnt) => {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the searchTerms array as possible autocomplete values:*/
autocomplete(searchInput, searchTerms);



