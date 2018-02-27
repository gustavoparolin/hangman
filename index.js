const wordsBank = "hammer promise maniacal string taste shelf fool excite rail release enjoy trade dorks girl sticks pretend relieved pickle volleyball plate puncture panoramic name motionless wail sad knowledge water smash produce yam large care observe name hulking jaded wood insidious rate pretty paddle damp nation dance colorful limsy curl park childlike fierce fair gun soothe abounding trace nest swanky battle wiry nose broken tight reduce stormy homeless uppity look exam nervous joke fix simplistic level paint saint gratis spiders wire obtainable humdrum tesseract change piquant witty explain delay mutter languid woebegone disturbed slow romantic caption squander rule list ambiguous present telephone butter";

$(document).ready(function() {
  const words = wordsBank.toUpperCase().split(' ');
  const chooseOne = Math.floor(Math.random() * words.length);
  const mysteryWord = words[chooseOne].split('');
  let myWord = [];
  let strWord = '';
  let correctLetters = [];
  let wrongLetters = [];
  let wrongTryCounter = 0;

  // creating the keyboard
  for (let i = 65; i <= 90; i++){
    $('#keyboard').append(
      `<button id="${String.fromCharCode(i)}" class="btn btn-outline-secondary keyboard">${String.fromCharCode(i)}</button>`
    );
  }

  // creating Mistery Word
  buildMisteryWord();

  console.log(mysteryWord.join(''));

  // Create the Gallows image
  $('img').attr('src', `img/g${wrongTryCounter}.jpg`);

  // creating the Hidden Word
  function buildMisteryWord() {
    strWord = '';
    myWord = [];
    for (let w = 0; w <= mysteryWord.length - 1; w++){
      if (correctLetters.includes(mysteryWord[w])) {
        myWord.push(mysteryWord[w]);
        strWord += `<span class="letter">${mysteryWord[w]}</span>`;
      } else {
        strWord += `<span class="letter">&nbsp;</span>`;
      }
    }
    // print the word below the keyboard
    $('#word').html(strWord);

    // test if the actual word is equal to mistery word. If yes, call gameOver function
    if (myWord.length == mysteryWord.length) {
      for (let i = 0; i < myWord.length; i++) {
        if (myWord[i] != mysteryWord[i]) {
          return false;
        }
      }
      gameOver('WON');
    }
  }

  // listen to the click buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', event => {
      const {currentTarget} = event;
      let chosenLetter = currentTarget.getAttribute('id');
      guess(chosenLetter);
    })
  })

  // listen to the type keyboard
  document.addEventListener('keypress', event => {
    const {key, keyCode} = event;
    let chosenLetter = key.toUpperCase();
    // only letters
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
      guess(chosenLetter);
    }
  })

  function guess(chosenLetter) {
    keySound().play();
    if (mysteryWord.includes(chosenLetter)) {
      if (!correctLetters.includes(chosenLetter)) {
        correctLetters.push(chosenLetter);
        $(`#${chosenLetter}`).addClass('btn-success disabled').removeClass('btn-outline-secondary');
        }
    } else {
      if (!wrongLetters.includes(chosenLetter)) {
        wrongLetters.push(chosenLetter);
        $(`#${chosenLetter}`).addClass('btn-danger disabled').removeClass('btn-outline-secondary');
        if (wrongTryCounter == 6) {
          gameOver('LOST');
        } else {
          wrongTryCounter += 1;
        }
      }
      $('img').attr('src', `img/g${wrongTryCounter}.jpg`);
    }
    buildMisteryWord();
  }

  const winningSound = () => new Audio(`sound/success.wav`);
  const losingSound = () => new Audio(`sound/fail.wav`);
  const keySound = () => new Audio(`sound/keyboard-1.wav`);

  function gameOver(value) {
    if (value == 'WON') {
      winningSound().play();
      setTimeout(() => {
        alert('You WON!!! Let`s try again?');
        location.reload();
  		}, 500);
    } else {
      losingSound().play();
      setTimeout(() => {
        alert('You LOST!! Let`s try again!');
        location.reload();
  		}, 500);
    }
  }

})
