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

// EVENT LISTENERS

// OBJECTS
const currentState = {
  state: "",
  main: true,
  // Change data on left and right panel
  // Based on JSON
  quiz: false,
  // We gather curent score data
  score: false,
};

const categoryState = {
  //function that loops through states and gives state the key that's true
  state: "",
  html: false,
  css: false,
  js: false,
  accessibility: false,
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
