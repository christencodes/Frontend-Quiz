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

const leftQuiz = leftCard.querySelector(".left-quiz");
const rightQuiz = rightCard.querySelector(".right-quiz");

const quizQuestion = document.getElementById("quiz-question");

//A B C D...0, 1 , 2 , 3

const question0 = document.getElementById("0");
const question1 = document.getElementById("1");
const question2 = document.getElementById("2");
const question3 = document.getElementById("3");

const questionsArray = [question0, question1, question2, question3];

// EVENT LISTENERS FOR CLICKING BUTTONS
// For selecting which quiz
rightCard.addEventListener("click", (e) => {
  e.preventDefault();
  //if we click and it's a certain id
  if (categoryState.currentActiveState() == "main") {
    categoryState.state(e.target.id);
    quizTracker.clearMain();
    quizTracker.showQuizInfo();
  }

  //? change the current state to
});

//For selecting which answer
rightQuiz.addEventListener("click", (e) => {
  e.preventDefault();
  quizTracker.currentUserAnswer = e.target.id;
  console.log(e.target.id);
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
      } else if (
        state == "state" ||
        state == "currentActiveState" ||
        state == "returnStateIndex" ||
        state == "stateIndex" ||
        state == "populateAnswers"
      ) {
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

  returnStateIndex: function () {
    return this.stateIndex.indexOf(this.currentActiveState());
  },
  main: true,
  html: false,
  css: false,
  js: false,
  accessibility: false,
  score: false,
  stateIndex: ["html", "css", "js", "accessibility", "main", "score"],
};

const quizTracker = {
  stateIcon: "",
  totalQuestions: 0,
  currentScore: 0,
  currentQuestion: 0,
  // THIS IS WHERE WE LEFT OFF!
  currentQuestionAnswer: function () {
    return jsonContainer.quizzes[categoryState.returnStateIndex()].questions[
      this.currentQuestion
    ].answer;
  },
  currentUserAnswer: 0,
  answerSubmitted: false,

  clearMain: function () {
    leftInfo.classList.add("hidden");
    rightInfo.classList.add("hidden");
  },

  showQuizInfo: function () {
    leftQuiz.classList.remove("hidden");
    rightQuiz.classList.remove("hidden");
    this.populateQuestion();
    this.populateOptions();
  },

  populateQuestion: function () {
    quizQuestion.textContent =
      jsonContainer.quizzes[categoryState.returnStateIndex()].questions[
        this.currentQuestion
      ].question;
  },

  populateOptions: function () {
    const options =
      jsonContainer.quizzes[categoryState.returnStateIndex()].questions[
        this.currentQuestion
      ].options;

    console.log(options);

    options.forEach((element) => {
      questionsArray[options.indexOf(element)].textContent += ` ${element}`;
    });
  },
};
