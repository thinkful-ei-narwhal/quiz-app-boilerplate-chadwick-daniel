'use strict';

/**
 * Example store structure
 */
const STORE = {
  // 6 question quiz
  questions: [
    {
      question: 'What is the name of the village where the anime Naruto takes place?',
      answers: [
        'Chicago',
        'Nippon',
        'Konoha',
        'Coruscant'
      ],
      correctAnswer: 'Konoha'
    },
    {
      question: 'In the anime Konosuba, what is the color of Kazumas tracksuit?',
      answers: [
        'Red',
        'Green',
        'Indigo',
        'Vanta Black'
      ],
      correctAnswer: 'Green'
    },
    {
      question: 'In Attack On Titan, how many walls are protecting humanity?',
      answers: [
        '5',
        '1',
        '9',
        '3'
      ],
      correctAnswer: '3'
    },
    {
      question: 'In the anime One Punch Man, what is the hero name of our protagonist Saitama?',
      answers: [
        'Caped Baldy',
        'One Punch Man',
        'Single Punch Hero',
        'The Strongest'
      ],
      correctAnswer: 'Caped Baldy'
    },
    {
      question: 'How many kingdoms are there in the anime Black Clover?',
      answers: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctAnswer: '4'
    },
    {
      question: 'In the anime One Piece, what is the name of the Devil Fruit that our protagonist Luffy consumes?',
      answers: [
        'Gomu Gomo no Mi',
        'Goro Goro no Mi',
        'Gura Gura no Mi',
        'Mera Mera no Mi'
      ],
      correctAnswer: 'Gomu Gomu no Mi'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates


function questionTemplate(){
  // uses the this function to make a constant variable we can use
  const currQuest = getQuestion();
  // we want to get the number of our current question so that it looks right in the h2 header
  const num = STORE.questionNumber + 1;
  // we want the array that the answers are in so we can use them
  const answerArray = currQuest.answers;
  return `
    <h2>Question ${num}:</h2>
    <p>${currQuest.question}</p>

    <form class="js-form">
      <fieldset>
        <input class="answer" type="radio" id="${answerArray[0]}" name="quiz" value="${answerArray[0]}">
        <label for="${answerArray[0]}">${answerArray[0]}</label>
        <input class="answer" type="radio" id="${answerArray[1]}" name="quiz" value="${answerArray[1]}">
        <label for="${answerArray[1]}">${answerArray[1]}</label>
        <input class="answer" type="radio" id="${answerArray[2]}" name="quiz" value="${answerArray[2]}">
        <label for="${answerArray[2]}">${answerArray[2]}</label>
        <input class="answer" type="radio" id="${answerArray[3]}" name="quiz" value="${answerArray[3]}">
        <label for="${answerArray[3]}">${answerArray[3]}</label>
        
        <label for="answer"></label>
        <input class="submit" type="button id="answer" value="Submit">
    </fieldset>
    </form> 
  `;
}

function startTemplate(){
  return `
    <form class="js-form">
        <fieldset>
            <label for="start"></label>
            <input class="submit" type="button" id="start" value="START!">
        </fieldset>
    </form>
  `;
}

function correctTemplate(){
  // this first part is so that we can show our score; the right amount is our score;
  // the wrong amount is the question number we are on (so how many we've answered)
  // minus the amount we have correct.

  const right = STORE.score;
  const wrong = ((STORE.questionNumber) - right);
  return `
    <h2>Correct!</h2>

      <h3>Score:</h3>
      <p class="score">Right: ${right}</p>
      <p class="score">Wrong: ${wrong}</p>

      <form class="js-form">
        <fieldset>
            <label for="next"></label>
            <input class="submit" type="button" id="next" value="Next">
        </fieldset>
      </form>
  `;
}

function incorrectTemplate(){
  // same thing
  const right = STORE.score;
  const wrong = ((STORE.questionNumber) - right);

  // we need to get the correct answer from the question we are on
  // (we will not move onto next until we press next)

  const correctAns = 'thing';

  return `
    <h2>Incorrect!</h2>

      <h3>The correct answer was: ${correctAns}</h3>

      <h3>Score:</h3>
      <p class="score">Right: ${right}p>
      <p class="score">Wrong: ${wrong}</p>

      <form class="js-form">
        <fieldset>
            <label for="next"></label>
            <input class="submit" type="button" id="next" value="Next">
        </fieldset>
      </form>
  `;
}

function resultsTemplate(){
  // same thing
  const right = STORE.score;
  const wrong = ((STORE.questionNumber) - right);

  return `
    <h1>End of Quiz!</h1>

      <h3>Score:</h3>
      <p class="score">Right: ${right}p>
      <p class="score">Wrong: ${wrong}</p>

      <form class="js-form">
        <fieldset>
            <label for="new-game"></label>
            <input class="submit" type="button" id="new-game" value="New Game">
        </fieldset>
      </form>
  `;

}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

// we need to make this ONE function

function renderPage() {
  console.log('`renderPage` ran');

  // if our quiz is not started, put the start template onto the main.

  if (!(STORE.quizStarted)) {
    const startString = startTemplate();
    // instert the HTML into the DOM
    $('main').html(startString);
  } else {
    // otherwise, render the question in the DOM
    const questionString = questionTemplate();

    // clear the html from the DOM
    $('main').html('');
    // insert that HTML into the DOM
    $('main').html(questionString);
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startGame(){

  // render the page initially

  renderPage();
  $('.submit').click( event => {
    event.preventDefault();

    // if it clicks, we change the quizStarted property of the STORE to true,
    // then we render it again...this is supposed to start the questions...but
    // isn't working.

    STORE.quizStarted = true;
    renderPage();
  });
  
}

function getQuestion(){
  // we want the store question number as an index number so we can use it as
  // an index for finding our question
  const indexNum = STORE.questionNumber;
  // save the Store.questions as an array
  const quest = STORE.questions;
  // we find the index number of our current question
  return quest[indexNum];
}

function getAnswer(){
  // this looks for a click on an answer class within the js form
  $('.js-form').on('click', '.answer', event => {
    event.preventDefault();
    // we get the value of this click and store it (which choice we made)
    const val = $(event.currentTarget).first().val();
    console.log(val);
    return val;
  });
}

function submitAnswer(){
  // we get our answer from before, and when we submit, we clear the page, 
  // render a new page, and return the answer we selected.backlink
  const ans = getAnswer();
  $('.submit').click( event => {
    event.preventDefault();
    $('main').html('');
    renderPage();
    return ans;
  });
}

function wasRight(){
  // we get the question object from the store.questions
  const quest = STORE.questions;
  // we store the correctAnswer property from the question
  const answer = quest.correctAnswer;
  // the submitted is a value that we check against our answer to see if
  // it's true or false and we return it
  const submitted = submitAnswer();
  return (submitted === answer);
}

function nextQuestion(){
  // working on this
  STORE.questionNumber += 1;
  renderPage();
}

function restartGame(){}

// -----------------------------------


// this function will be our callback when the page loads.

function handleAll() {
  startGame();
  renderPage();
}

// when the page loads, call `handleAll`
$(handleAll);