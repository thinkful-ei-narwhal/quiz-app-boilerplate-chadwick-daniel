'use strict';

/**
 * Example store structure
 */
const STORE = {
  // 10 question quiz

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
      question: 'In the orignal Pokemon anime, what is the first Pokemon Ash Ketchum actually catches?',
      answers: [
        'Pikachu',
        'Caterpie',
        'Ratatta',
        'Kirby'
      ],
      correctAnswer: 'Caterpie'
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
    },
    {
      question: 'In the anime Full Metal Alchemist: Brotherhood, what is the name of the dog used in the infamous Chimera Experiment?',
      answers: [
        'Fluffy',
        'Alexander',
        'Spot',
        'Buddy'
      ],
      correctAnswer: 'Alexander'
    },
    {
      question: 'In the anime Code Geass, what is official name of the occupied zone formerly known as Japan?',
      answers: [
        'It is still called Japan',
        'Nippon',
        'Area 12',
        'Area 11'
      ],
      correctAnswer: 'Area 11'
    },
    {
      question: 'In the anime Dragon Ball Super, what is the small special phrase at the end needed to summon the Super Dragon Balls?',
      answers: [
        'Lemon Squeezy',
        'I Wish With All My Heart',
        'Pretty Please',
        'Peas and Carrots'
      ],
      correctAnswer: 'Peas and Carrots'
    },
  ],
  isCorrect: true,
  isQuestion: false,
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** GENERAL FUNCTIONS **********/

// These functions assist us with other functions

function getQuestion(){
  // we want the store question number as an index number so we can use it as
  // an index for finding our question

  const indexNum = STORE.questionNumber;

  // save the Store.questions as an array

  const quest = STORE.questions;

  // we find the index number of our current question

  return quest[indexNum];
}

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function startTemplate(){
  return `
    <div class="fade-in">
      <div class="cutegif">
        <img src="https://data.whicdn.com/images/289130893/original.gif" alt="Naruto's Village">
      </div>

      <div>
        <form class="js-form">
            <fieldset>
                <label for="start"></label>
                <input class="submit" type="button" id="start" value="START!">
            </fieldset>
        </form>
      </div>
    </div>
  `;
}

function questionTemplate(){
  // use this for the current score
  const right = STORE.score;
  const wrong = ((STORE.questionNumber) - right);


  // uses the this function to make a constant variable we can use

  const currQuest = getQuestion();

  // we want to get the number of our current question so that it looks right in the h2 header

  const num = STORE.questionNumber + 1;

  // we want the array that the answers are in so we can use them

  const answerArray = currQuest.answers;

  // our iteration through an array to give us the radio answers, save it as a variable.

  const radioQuestions = answerArray.map(el => {
    let s = '';
    s += `
    <div class=fix>
    <input class="answer" type="radio" id="${el}" name="quiz" value="${el}">
    <label for="${el}">${el}</label>
    </div>
    `;
    return s;
  }).join('');

  // we employed .gifs in our quiz to make it more fun and modern.  We store those gifs in a array which we can
  // use for each question

  
  const gifArr = [
    '<img src="https://media1.tenor.com/images/357aa02bb868b08546ea4f60d2a2299b/tenor.gif" alt="naurto face">',
    '<img src="https://media.tenor.com/images/0b0010b6da27502d1a0a320c73eb07af/tenor.gif" alt="megumin face being pulled on">',
    '<img src="https://data.whicdn.com/images/241804269/original.gif" alt="erin spitting water">',
    '<img src="https://gifimage.net/wp-content/uploads/2017/08/saitama-one-punch-man-gif-14.gif" alt="saitama shocked">',
    '<img src="https://media1.giphy.com/media/12Tj4J6ghmN1pS/source.gif" alt="ash ketchum confused">',
    '<img src="https://media0.giphy.com/media/3ofRH40qYdZQwaq1Vh/giphy.gif?cid=790b7611b0832d98f46c342da57ef2a46bed8cd8ae9797f4&rid=giphy.gif" alt="wind spirit pulling on face">',
    '<img src="https://media0.giphy.com/media/XAZpfo9whz6nu/source.gif" alt="luffy is confused">',
    '<img src="https://media1.tenor.com/images/d924f89a2eae670612f4757b931d9f14/tenor.gif" alt="edward elric looks confused">',
    '<img src="https://i.imgur.com/qiND7mV.gif" alt="lelouch distraught">',
    '<img src="https://thumbs.gfycat.com/YellowishGrotesqueBlackbuck-size_restricted.gif" alt="goku confused">'
  ];

  return `
    <div class="fade-in">
      <div class="top">
        <h2>Question ${num} out of ${STORE.questions.length}:</h2>
        <div class="score">
          <h3>Current Score:</h3>
          <p class="score">Right: ${right} Wrong: ${wrong}</p>
        </div>
      </div>
        <p>${currQuest.question}</p>
      </div>

      <div class="cutegif">
        ${gifArr[STORE.questionNumber]}
      </div>

      <div class="form">
        <form class="js-form">
          <fieldset class="radio">
            ${radioQuestions}
            <label for="ans"></label>
            <input type="submit" id="ans" value="Submit">
        </fieldset>
        </form> 
      </div>
    </div>
  `;
}

function correctTemplate(){
  // this first part is so that we can show our score; the right amount is our score;
  // the wrong amount is the question number we are on (so how many we've answered)
  // minus the amount we have correct.

  const right = STORE.score;
  const wrong = ((STORE.questionNumber + 1) - right);
  return `
    <div class="fade-in">
      <div class="top">
        <h2>Correct!</h2>
      </div>
      
      <div class="cutegif">
        <img src="https://media.giphy.com/media/Diym3aZO1dHzO/giphy.gif" alt="Rei clapping">
      </div>

      <div class="score">
        <h3>Current Score:</h3>
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
    </div>
  `;
}

function incorrectTemplate(){
  // same thing
  const right = STORE.score;
  const wrong = ((STORE.questionNumber + 1) - right);

  // we need to get the correct answer from the question we are on
  // (we will not move onto next until we press next)

  const currQuest = getQuestion();

  // we want the correctAnswer property

  const correctAns = currQuest.correctAnswer;

  return `
    <div class="fade-in">
      <div class="top">
        <h2>Incorrect!</h2>
        <h3>The correct answer was: ${correctAns}</h3>
      </div>

      <div class="cutegif">
        <img src="https://thumbs.gfycat.com/MeaslyJaggedBrontosaurus-size_restricted.gif" alt="aqua crying">
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
    </div>
  `;
}

function resultsTemplate(){
  // same thing
  const right = STORE.score;
  const wrong = ((STORE.questionNumber +1) - right);

  return `
    <div class="fade-in">
      <div class="top">
        <h1>End of Quiz!</h1>
      </div>

      <div class="score">
        <h3>Score:</h3>
        <p class="score">Right: ${right}<p>
        <p class="score">Wrong: ${wrong}</p>
      </div>

      <div class="cutegif">
        <img src="https://media.giphy.com/media/EktbegF3J8QIo/giphy.gif" alt="pikachu and togepi with party hats">
      </div>

      <div class="form">
        <form class="js-form">
          <fieldset>
              <label for="new-game"></label>
              <input class="submit" type="button" id="new-game" value="New Game">
          </fieldset>
        </form>
      </div>
    </div>
  `;

}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

// we need to make this ONE function

function renderPage() {
  // if our quiz is not started, put the start template onto the main.

  if ((STORE.questionNumber === STORE.questions.length - 1) && (STORE.quizStarted) && !(STORE.isQuestion)) {
    // show results screen
    $('main').html(resultsTemplate());
  }
  else if (!(STORE.quizStarted) && !(STORE.isQuestion)) {
    // insert the HTML into the DOM
    $('main').html(startTemplate());
  } else if ((STORE.quizStarted) && (STORE.isQuestion)) {
    // render the question in the DOM
    $('main').html(questionTemplate());
  } else if ((STORE.quizStarted) && !(STORE.isQuestion)) {
    if (STORE.isCorrect) {
      // insert that HTML into the DOM
      $('main').html(correctTemplate());
    } else {
      // insert that HTML into the DOM
      $('main').html(incorrectTemplate());
    }
  } 
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// make the radio button form a submit and use 'submit'!


function handleStartClick() {
  $('main').on('click', '#start', function(event) {
    event.preventDefault();
    STORE.isQuestion = true;
    STORE.quizStarted = true;
    renderPage();
  });
}

function handleSubmitAnswer(){
  // we listen for the submit to get our answer from the radio button
  $('main').on('submit', '.js-form', function(event) {
    event.preventDefault();
    const answer = $('input[name="quiz"]:checked').val();
    
    if (answer) {
      STORE.isQuestion = false;
      STORE.quizStarted = true;
    }
    
    const realAnswer = getQuestion().correctAnswer;
  
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
    if (STORE.questionNumber <= STORE.questions.length - 1) {
      STORE.questionNumber += 1;
      STORE.isQuestion = true;
    } else {
      STORE.questionNumber += 1;
      STORE.isQuestion = false;
    }
    renderPage();
  });
}

function handleRestartGameClick(){
  $('main').on('click', '#new-game', function(event) {
    event.preventDefault();
    // reset the STORE
    STORE.questionNumber = 0;
    STORE.isQuestion = false;
    STORE.quizStarted = false;
    STORE.isCorrect = true;
    STORE.score = 0;
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