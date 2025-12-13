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
let jsonContainer;
// SELECTORS
const leftCard = document.querySelector(".left-card");
const rightCard = document.querySelector(".right-card");

const leftInfo = leftCard.querySelector(".left-info");
const rightInfo = rightCard.querySelector(".right-info");

//A B C D...0, 1 , 2 , 3

const question0 = document.getElementById("0");
const question1 = document.getElementById("1");
const question2 = document.getElementById("2");
const question3 = document.getElementById("3");

const questionsArray = [question0, question1, question2, question3];

// EVENT LISTENERS
rightCard.addEventListener("click", (e) => {
  e.preventDefault();
  //if we click and it's a certain id

  categoryState.state(e.target.id);
  quizTracker.clearMain();
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
  return data;
}

getQuizData().then((result) => {
  jsonContainer = result;
});

fetch("data.json")
  .then((result) => result.text())
  .then((result) => {
    jsonContainer = JSON.parse(result);
  });

// OBJECTS
const categoryState = {
  state: function (id) {
    for (const state in this) {
      if (state == id) {
        this[state] = true;
      } else if (state == "state" || state == "currentActiveState") {
        continue;
      } else {
        this[state] = false;
      }
    }
  },
  currentActiveState: function () {
    for (const state in this) {
      if (this[state] == true) {
        return state;
      }
    }
  },
  main: false,
  html: false,
  css: false,
  js: false,
  accessibility: false,
  score: false,
};

const quizTracker = {
  state: () => categoryState.currentActiveState(),
  stateIcon: "",
  totalQuestions: 0,
  currentScore: 0,
  currentQuestion: 0,
  //display current question
  //display current answers
  currentQuestionAnswer: "",
  currentUserAnswer: "",
  answerSubmitted: false,
  currentQuestions: "",

  clearMain: function () {
    leftInfo.classList.add("hidden");
    rightInfo.classList.add("hidden");
  },

  populateQuestions: function () {
    jsonContainer.quizzes.array.forEach((element) => {
      if (jsonContainer.quizzes[element].title == this.state()) {
        for (
          let question = 0;
          question <
          jsonContainer.quizzes[element].questions[this.currentQuestion].options
            .length;
          question++
        ) {
          questionsArray[question].textContent =
            jsonContainer.quizzes[element].questions[
              this.currentQuestion
            ].options[question];
        }
      }
    });
  },
  // keep track of everything populate the left and right side
};
