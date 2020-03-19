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
  const currQuest = getQuestion();
  const num = STORE.questionNumber + 1;
  const answerArray = currQuest.answers;
  return `
    <h2>Question ${num}:</h2>
    <p>${currQuest.question}</p>

    <form class="js-form">
      <fieldset>
        <input type="radio" id="${answerArray[0]}" name="quiz" value="${answerArray[0]}">
        <label for="${answerArray[0]}">${answerArray[0]}</label>
        <input type="radio" id="${answerArray[1]}" name="quiz" value="${answerArray[1]}">
        <label for="${answerArray[1]}">${answerArray[1]}</label>
        <input type="radio" id="${answerArray[2]}" name="quiz" value="${answerArray[2]}">
        <label for="${answerArray[2]}">${answerArray[2]}</label>
        <input type="radio" id="${answerArray[3]}" name="quiz" value="${answerArray[3]}">
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
  // render the question in the DOM
  if (STORE.quizStarted) {
    console.log('`renderQuestion` ran');
    const questionString = questionTemplate();

    // clear the html from the DOM
    $('main').html('');
    // insert that HTML into the DOM
    $('main').html(questionString);
  }
}

function renderStart() {
  console.log('`renderStart` ran');
  const startString = startTemplate();
  // instert the HTML into the DOM
  $('main').html(startString);

}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startGame(){
  renderStart();
  $('.submit').click( event => {
    event.preventDefault();
    // moves out of the first screen, onto first question
    STORE.quizStarted = true;
  });
}

function getQuestion(){
  const indexNum = STORE.questionNumber;
  const quest = STORE.questions;
  return quest[indexNum];
}

function getAnswer(){

}

function submitAnswer(){
  const ans = getAnswer();
  $('.submit').click( event => {
    event.preventDefault();
    $('main').html('');
    return ans;
  });
}

function wasRight(){
  // if the answer is right, move on and show the correct render

  // if the answer is wrong, move on and show the incorrect render
}

function nextQuestion(){

  STORE.questionNumber += 1;
}

function restartGame(){}