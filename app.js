'use strict';

/**
 * Example store structure
 */
const STORE = {
  // 6 question quiz

  // daniel, and this is in an array, in an object, in an array?
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
  isQuestion: false,
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

/********** GENERAL FUNCTIONS **********/

// These functions assist us with other functions

function getQuestion(){
  // we want the store question number as an index number so we can use it as
  // an index for finding our question
  const indexNum = STORE.questionNumber;
  console.log(indexNum);
  // save the Store.questions as an array
  const quest = STORE.questions;
  console.log(quest);
  // we find the index number of our current question
  return quest[indexNum];
}

function wasRight(){
  // we get the question object from the store.questions
  const quest = STORE.questions;
  // we store the correctAnswer property from the question
  const answer = quest.correctAnswer;
  // the submitted is a value that we check against our answer to see if
  // it's true or false and we return it
  const submitted = handleSubmitAnswer();
  return (submitted === answer);
}

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates


function questionTemplate(){
  // uses the this function to make a constant variable we can use
  const currQuest = getQuestion();
  console.log(currQuest);
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
        
        <label for="ans"></label>
        <input class="submit" type="button" id="ans" value="Submit">
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

  const correctAns = 'thing';  //daniel, shouldn't this be set to some kind of function that reveals the right answer?

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

  if (!(STORE.quizStarted) && !(STORE.isQuestion)) {
    const startString = startTemplate();
    // instert the HTML into the DOM
    $('main').html(startString);
  } else if ((STORE.quizStarted) && (STORE.isQuestion)) {
    // otherwise, render the question in the DOM
    const questionString = questionTemplate();

    // clear the html from the DOM
    $('main').html('');
    // insert that HTML into the DOM
    $('main').html(questionString);
  } else if ((STORE.quizStarted) && !(STORE.isQuestion)) {
    const correct = correctTemplate();
    const incorrect = incorrectTemplate();
    const bool = wasRight();
    if (bool) {
      // clear the html from the DOM
      $('main').html('');
      // insert that HTML into the DOM
      $('main').html(correct);
    } else {
      // clear the html from the DOM
      $('main').html('');
      // insert that HTML into the DOM
      $('main').html(incorrect);
    }
  } else if (STORE.questionNumber > STORE.questions.length) {
    const result = resultsTemplate();
    // show results screen
    $('main').html('');
    // insert that HTML into the DOM
    $('main').html(result);
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startGame(){
  renderPage();
  handleStartClick();
}

function handleSubmitAnswer(){
  // we listen for the submit to get our answer from the radio button
  $('#ans').click( function(event) {
    event.preventDefault();
    const val = $(event.currentTarget).val();
    console.log(val);  
    STORE.isQuestion = false;
    renderPage();
    return val;
  });
}

function handleStartClick() {
  $('#start').click( function(event) {
    console.log(event);
    event.preventDefault();
    STORE.isQuestion = true;
    STORE.quizStarted = true;
    renderPage();
  });
}

function handleNextClick(){
  $('#next').on( function(event) {
    event.preventDefault();
    STORE.questionNumber += 1;
    STORE.isQuestion = true;
    renderPage();
  });
}

function handleRestartGameClick(){
  $('#new-game').on( function(event) {
    event.preventDefault();
    STORE.questionNumber = 0;
    STORE.isQuestion = false;
    STORE.quizStarted = false;
    renderPage();
  });
}

// -----------------------------------


// this function will be our callback when the page loads.

function handleAll() {
  handleStartClick();
  handleSubmitAnswer();
  handleNextClick();
  handleRestartGameClick();
  startGame();
  
}

// when the page loads, call `handleAll`
$(handleAll);