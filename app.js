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
      correctAnswer: 'Gomu Gomo no Mi'
    }
  ],
  isCorrect: true,
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
  let indexNum = STORE.questionNumber;
  console.log(indexNum);
  // save the Store.questions as an array
  let quest = STORE.questions;
  console.log(quest);
  // we find the index number of our current question
  return quest[indexNum];
}

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function startTemplate(){
  return `
    <div class="cutegif">
      <img src="https://data.whicdn.com/images/289130893/original.gif" alt="Naruto's Village" width=300px>
    </div>

    <div>
      <form class="js-form">
          <fieldset>
              <label for="start"></label>
              <input class="submit" type="button" id="start" value="START!">
          </fieldset>
      </form>
    </div>
  `;
}

function questionTemplate(){
  // uses the this function to make a constant variable we can use
  let currQuest = getQuestion();
  console.log(currQuest);
  // we want to get the number of our current question so that it looks right in the h2 header
  let num = STORE.questionNumber + 1;
  // we want the array that the answers are in so we can use them
  let answerArray = currQuest.answers;
  // we probably want a loop that handles the radio answer thing here...its just way less lines
  
  const gifArr = [
    '<img src="https://media1.tenor.com/images/357aa02bb868b08546ea4f60d2a2299b/tenor.gif" alt="naurto face" width=400px>',
    '<img src="https://media.tenor.com/images/0b0010b6da27502d1a0a320c73eb07af/tenor.gif" alt="megumin face being pulled on" width=400px>',
    '<img src="https://data.whicdn.com/images/241804269/original.gif" alt="erin spitting water" width=400px>',
    '<img src="https://gifimage.net/wp-content/uploads/2017/08/saitama-one-punch-man-gif-14.gif" alt="luffy is confused" width=400px>',
    '<img src="https://media0.giphy.com/media/3ofRH40qYdZQwaq1Vh/giphy.gif?cid=790b7611b0832d98f46c342da57ef2a46bed8cd8ae9797f4&rid=giphy.gif" alt="wind spirit pulling on face" width=400px>',
    '<img src="https://media0.giphy.com/media/XAZpfo9whz6nu/source.gif" alt="luffy is confused" width=400px>',
  ];

  return `
    <h2>Question ${num}:</h2>
    <p>${currQuest.question}</p>

    <div class="cutegif">
      ${gifArr[STORE.questionNumber]}
    </div>

    <div class="form">
      <form class="js-form">
        <fieldset class="radio">
          <input class="answer" type="radio" id="${answerArray[0]}" name="quiz" value="${answerArray[0]}">
          <label for="${answerArray[0]}">${answerArray[0]}</label>
          <input class="answer" type="radio" id="${answerArray[1]}" name="quiz" value="${answerArray[1]}">
          <label for="${answerArray[1]}">${answerArray[1]}</label>
          <input class="answer" type="radio" id="${answerArray[2]}" name="quiz" value="${answerArray[2]}">
          <label for="${answerArray[2]}">${answerArray[2]}</label>
          <input class="answer" type="radio" id="${answerArray[3]}" name="quiz" value="${answerArray[3]}">
          <label for="${answerArray[3]}">${answerArray[3]}</label>
          
          <label for="ans"></label>
          <input type="submit" id="ans" value="Submit">
      </fieldset>
      </form> 
    </div>
  `;
}

function correctTemplate(){
  // this first part is so that we can show our score; the right amount is our score;
  // the wrong amount is the question number we are on (so how many we've answered)
  // minus the amount we have correct.

  let right = STORE.score;
  let wrong = ((STORE.questionNumber + 1) - right);
  return `
    <h2>Correct!</h2>

    <div class="cutegif">
      <img src="https://media.giphy.com/media/Diym3aZO1dHzO/giphy.gif" alt="Rei clapping" width=400px>
    </div>

    <div class="score">
      <h3>Score:</h3>
      <p class="score">Right: ${right}</p>
      <p class="score">Wrong: ${wrong}</p>
    </div>

    <div class="form">
      <form class="js-form">
        <fieldset>
            <label for="next"></label>
            <input class="submit" type="button" id="next" value="Next">
        </fieldset>
      </form>
    </div>
  `;
}

function incorrectTemplate(){
  // same thing
  let right = STORE.score;
  let wrong = ((STORE.questionNumber +1) - right);

  // we need to get the correct answer from the question we are on
  // (we will not move onto next until we press next)

  let currQuest = getQuestion();
  console.log(currQuest);
  // we want the correctAnswer property
  let correctAns = currQuest.correctAnswer;

  return `
    <h2>Incorrect!</h2>

    <h3>The correct answer was: ${correctAns}</h3>

    <div class="cutegif">
      <img src="https://thumbs.gfycat.com/MeaslyJaggedBrontosaurus-size_restricted.gif" alt="aqua crying" width=400px>
    </div>

    <div class="score">
      <h3>Score:</h3>
      <p class="score">Right: ${right}<p>
      <p class="score">Wrong: ${wrong}</p>
    </div>

    <div class="form">
      <form class="js-form">
        <fieldset>
            <label for="next"></label>
            <input class="submit" type="button" id="next" value="Next">
        </fieldset>
      </form>
    </div>
  `;
}

function resultsTemplate(){
  // same thing
  let right = STORE.score;
  let wrong = ((STORE.questionNumber +1) - right);

  return `
    <h1>End of Quiz!</h1>

    <div class="score">
      <h3>Score:</h3>
      <p class="score">Right: ${right}p>
      <p class="score">Wrong: ${wrong}</p>
    </div>

    <div class="cutegif">
      <img src="https://media.giphy.com/media/EktbegF3J8QIo/giphy.gif" alt="pikachu and togepi with party hats" width=400px>
    </div>

    <div class="form">
      <form class="js-form">
        <fieldset>
            <label for="new-game"></label>
            <input class="submit" type="button" id="new-game" value="New Game">
        </fieldset>
      </form>
    </div>
  `;

}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

// we need to make this ONE function

function renderPage() {
  console.log('`renderPage` ran');
  console.log(getQuestion());

  // if our quiz is not started, put the start template onto the main.

  if (!(STORE.quizStarted) && !(STORE.isQuestion)) {
    // instert the HTML into the DOM
    $('main').html(startTemplate());
  } else if ((STORE.quizStarted) && (STORE.isQuestion)) {
    // otherwise, render the question in the DOM
    // clear the html from the DOM
    $('main').html('');
    // insert that HTML into the DOM
    $('main').html(questionTemplate());
  } else if ((STORE.quizStarted) && !(STORE.isQuestion)) {
    if (STORE.isCorrect) {
      // clear the html from the DOM
      $('main').html('');
      // insert that HTML into the DOM
      $('main').html(correctTemplate());
    } else {
      // clear the html from the DOM
      $('main').html('');
      // insert that HTML into the DOM
      $('main').html(incorrectTemplate());
    }
  } else if ((STORE.questionNumber > STORE.questions.length) && (STORE.quizStarted)) {
    // show results screen
    $('main').html('');
    // insert that HTML into the DOM
    $('main').html(resultsTemplate());
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// make the radio button form a submit and use 'submit'!


function handleStartClick() {
  $('main').on('click', '#start', function(event) {
    console.log(event);
    event.preventDefault();
    STORE.isQuestion = true;
    STORE.quizStarted = true;
    renderPage();
  });
}

function handleSubmitAnswer(){
  // we listen for the submit to get our answer from the radio button
  $('main').on('submit', '.js-form', function(event) {
    console.log(event);
    event.preventDefault();
    let answer = $("input[name='quiz']:checked").val();
    
    if (answer) {
      STORE.isQuestion = false;
      STORE.quizStarted = true;
      
    }
    console.log(answer);
    console.log(typeof(answer));
    
    let realAnswer = getQuestion().correctAnswer;
  
    // the submitted is a value that we check against our answer to see if
    // it's true or false and we return it
    if (answer === realAnswer) {
      STORE.score += 1;
      STORE.isCorrect = true;
    } else {
      STORE.isCorrect = false;
    }
    renderPage();
  });
  
}

function handleNextClick(){
  $('main').on('click', '#next', function(event) {
    event.preventDefault();
    STORE.questionNumber += 1;
    STORE.isQuestion = true;
    renderPage();
  });
}

function handleRestartGameClick(){
  $('main').on('click', '#new-game', function(event) {
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
  renderPage();
  handleStartClick();
  handleSubmitAnswer();
  handleNextClick();
  handleRestartGameClick();
  
}

// when the page loads, call `handleAll`
$(handleAll);