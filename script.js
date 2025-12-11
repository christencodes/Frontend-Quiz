"use strict";
/* 
1. Create Main Screen
a. Create 4 buttons - HTML; CSS; JS: Accessibility
b.dark mode toggle
c.get dark mode toggle out of the way
2. Access JSON File
a. review how to access JSOn file

question: make it state based?
*/

// SELECTORS
const rightCard = document.querySelector(".right-card");

// EVENT LISTENERS
rightCard.addEventListener("click", (e) => {
  e.preventDefault();
  //if we click and it's a certain id

  categoryState.state(e.target.id);
  //? change the current state to
});

// FUNCTIONS
//function to get JSON data

async function getQuizData() {
  const requestURL = "data.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const dataText = await response.text();

  const data = JSON.parse(dataText);
  console.log(data);
}

getQuizData();

// OBJECTS
const categoryState = {
  state: function (id) {
    for (const state in this) {
      if (state == id) {
        this[state] = true;
      } else if (state == "state") {
        continue;
      } else {
        this[state] = false;
      }
    }
    //this.[id] -> true - change the others to false
    //I want this to loop through the values and determine which one is true and make the others false
  },
  main: false,
  html: false,
  css: false,
  js: false,
  accessibility: false,
  score: false,
};

const quizTracker = {
  state: "",
  stateIcon: "",
  totalQuestions: 0,
  currentScore: 0,
  currentQuestion: 0,
  //display current question
  //display current answers
  currentQuestionAnswer: "",
  currentUserAnswer: "",
  answerSubmitted: false,
};
