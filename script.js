"use strict";

let jsonContainer;
// SELECTORS
const leftCard = document.querySelector(".left-card");
const rightCard = document.querySelector(".right-card");

const leftInfo = leftCard.querySelector(".left-info");
const rightInfo = rightCard.querySelector(".right-info");

const leftQuiz = leftCard.querySelector(".left-quiz");
const rightQuiz = rightCard.querySelector(".right-quiz");

const quizQuestion = document.getElementById("quiz-question");

const submitButton = document.querySelector(".submit");

const quizQuestionNumber = document.getElementById("quiz-question-number");

//A B C D...0, 1 , 2 , 3

const question0 = document.getElementById("0").querySelector(".A");
const question1 = document.getElementById("1").querySelector(".B");
const question2 = document.getElementById("2").querySelector(".C");
const question3 = document.getElementById("3").querySelector(".D");

const questionsArray = [question0, question1, question2, question3];

const questionsParents = [
  question0.parentNode,
  question1.parentNode,
  question2.parentNode,
  question3.parentNode,
];

// EVENT LISTENERS FOR CLICKING BUTTONS
// For selecting which quiz
rightCard.addEventListener("click", (e) => {
  e.preventDefault();
  //if we click and it's a certain id
  if (categoryState.currentActiveState() == "main") {
    categoryState.state(e.target.id);
    quizTracker.clearMain();
    quizTracker.showQuizInfo();
    updateCategoryImg(categoryState.currentActiveState());
  }

  //? change the current state to
});

//For selecting which answer
rightQuiz.addEventListener("click", (e) => {
  e.preventDefault();
  quizTracker.currentUserAnswer = e.target.textContent;
  e.target.classList.add("clicked");
  clickAndUnclick(e);
  console.log(e.target);
  console.log(e.target.textContent);
});

function clickAndUnclick(e) {
  // e.target.classList.toggle("clicked");
  questionsParents.forEach((element) => {
    if (element != e.target) {
      element.classList.remove("clicked");
    }
  });
}

//^^^
// Need a function to keep buttons active after clicking - lets try the toggle event listener

// FUNCTIONS
//Submit button Function
const addSubmitButtonListener = () => {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    //HERE
    quizTracker.checkAnswer();
  });
};

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
  score: 0,
  stateIcon: "",
  totalQuestions: 0,
  currentScore: 0,
  currentQuestion: 0,
  currentOptions: [],
  // THIS IS WHERE WE LEFT OFF!
  currentQuestionAnswer: function () {
    return jsonContainer.quizzes[categoryState.returnStateIndex()].questions[
      this.currentQuestion
    ].answer;
  },
  //this is a string? change it to int
  currentUserAnswer: 0,

  clearMain: function () {
    leftInfo.classList.add("hidden");
    rightInfo.classList.add("hidden");
  },

  showMain: function () {
    leftInfo.classList.remove("hidden");
    rightInfo.classList.remove("hidden");
  },

  showQuizInfo: function () {
    leftQuiz.classList.remove("hidden");
    rightQuiz.classList.remove("hidden");
    this.populateQuestion();
    this.populateOptions();
    addSubmitButtonListener();
  },

  clearQuizInfo: function () {
    leftQuiz.classList.add("hidden");
    rightQuiz.classList.add("hidden");
  },

  showScoreScreen: function () {
    //
  },

  populateQuestion: function () {
    quizQuestion.textContent =
      jsonContainer.quizzes[categoryState.returnStateIndex()].questions[
        this.currentQuestion
      ].question;

    quizQuestionNumber.textContent = `Question ${
      this.currentQuestion + 1
    } of 10`;
  },

  populateOptions: function () {
    this.currentOptions =
      jsonContainer.quizzes[categoryState.returnStateIndex()].questions[
        this.currentQuestion
      ].options;

    console.log(this.currentOptions);

    this.currentOptions.forEach((element) => {
      questionsArray[this.currentOptions.indexOf(element)].textContent =
        element;
      console.log(element);
    });
  },

  checkAnswer: function () {
    this.increaseOrDecreaseScore(
      this.currentUserAnswer.trim() == this.currentQuestionAnswer()
    );

    this.nextQuestion();
  },

  increaseOrDecreaseScore: function (trueOrFalse) {
    trueOrFalse ? this.score++ : (this.score += 0);
    console.log(trueOrFalse ? "the answer is correct" : "the answer is wrong");
    console.log(`Current Score: ${this.score}`);
  },

  //WE STOPPED HERE!
  nextQuestion: function () {
    this.currentQuestion > 9 ? "do this" : "do that";
    this.currentQuestion += 1;
    this.populateQuestion();
    this.populateOptions();
  },
};

//Category Information
const categoryImgContainer = document.querySelector(".category-img-container");
const categoryImg = document.getElementById("category-img");
const categoryName = document.querySelector(".category-name");
//img urls
categoryName.textContent = "";
const htmlIcon = "assets/images/icon-html.svg";
const cssIcon = "assets/images/icon-css.svg";
const jsIcon = "assets/images/icon-js.svg";
const accessibilityIcon = "assets/images/icon-accessibility.svg";

function updateCategoryImg(state) {
  switch (categoryState.currentActiveState()) {
    case "html":
      categoryImg.src = htmlIcon;
      categoryImgContainer.classList.add("html");
      categoryName.textContent = "HTML";
      break;
    case "css":
      categoryImg.src = cssIcon;
      categoryImgContainer.classList.add("css");
      categoryName.textContent = "CSS";
      break;
    case "js":
      categoryImg.src = jsIcon;
      categoryImgContainer.classList.add("js");
      categoryName.textContent = "Javascript";
      break;
    case "accessibility":
      categoryImg.src = accessibilityIcon;
      categoryImgContainer.classList.add("accessibility");
      categoryName.textContent = "Accessibility";
      break;
    default:
      categoryImg.src = "assets/images/favicon-32x32.png";
      categoryName.textContent = "";
      break;
  }
}

// DARK MODE TOGGLE STUFF
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

const darkSun = "assets/images/icon-sun-dark.svg";
const darkMoon = "assets/images/icon-moon-dark.svg";
const lightSun = "assets/images/icon-sun-light.svg";
const lightMoon = "assets/images/icon-moon-light.svg";
const toggle = document.getElementById("toggle");
const ball = document.getElementById("ball");

ball.addEventListener("click", (e) => {
  e.preventDefault();
  e.target.classList.toggle("toggle-ball-dark");
  e.target.classList.toggle("toggle-ball-light");
});

const colorTheme = {
  //starting theme will be dark
  darkMode: function () {
    //change the background
    //change the colors
  },

  lightMode: function () {
    //change the background
    //change the colors
  },
};
