'use strict';
const question = document.querySelector('.question');
const choiceList = document.querySelector('.choiceList');
const quizMessage = document.querySelector('.quizMessage');
const nextBtn = document.querySelector('.nextButton');

function displayCurrQuestion() {
    // remove any <li> elements if present
    choiceList.innerHTML = "";
    // remove result tab
    quizMessage.innerText = "";
    quizMessage.style.display = "none";

    // Get Arbitrary Word from words object array.
    let quest = getArbitraryWord();

    // append the identified word to the question
    question.innerText = `Choose the correct synonym for "${quest.qWord}"`;

    // Add the choices for the question
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        li.innerHTML = `<input type="radio" value="${quest.choices[i].choiceWord}" name="dynradio"/>${quest.choices[i].choiceWord}`;
        choiceList.appendChild(li);
    }
    console.log(choiceList);
    return quest;
}

//* Get Arbitrary Word
function getArbitraryWord() {
    let quest = {
        qWord: undefined,
        choices: [],
        answer: undefined
    }
    // generate random number between 1 to 10 for now
    let wordIdx = getRandomArbitrary(0, rng);
    let choiceIdx = getRandomArbitrary(0, words[wordIdx].synonym.length)
    // From the generated random numbers pick the word to question the user
    quest.qWord = words[wordIdx].synonym[choiceIdx];

    // pick one correct option apart from the choosen word.
    let optnIdx;
    do {
        optnIdx = getRandomArbitrary(0, words[wordIdx].synonym.length);
        quest.answer = words[wordIdx].synonym[optnIdx];
    } while (choiceIdx === optnIdx);

    // generate random numbers and store into choices
    optnIdx = getRandomArbitrary(0, 4);
    quest.choices[optnIdx] = {
        wIdx: wordIdx,
        choiceWord: quest.answer
    };

    // pick random words to add to the option List
    for (let i = 0; i < 4; i++) {
        if (quest.choices[i] === undefined) {
            let optIdx;
            do {
                optIdx = getRandomArbitrary(0, words.length);
            } while (wordIdx === optIdx);
            quest.choices[i] = {
                wIdx: optIdx,
                choiceWord: words[optIdx].synonym[getRandomArbitrary(0, words[optIdx].synonym.length)]
            };
        }
    }
    return quest;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// main program execution starts from here...
var rng;
do {
    rng = prompt("Enter the Number of Words (max of " + (words.length - 1) + ")");
} while (rng > (words.length - 1))

window.onload = (() => {
    let quest = displayCurrQuestion();
    let radios = document.getElementsByName('dynradio');
    for (let i = 0; i < 4; i++) {
        radios[i].onclick = () => {
            quizMessage.style.display = "block";
            if (radios[i].value === quest.answer) {
                quizMessage.innerText = "Right Answer, keep going.";
                quizMessage.style.color = "green";
            } else {
                quizMessage.innerText = "Better luck, next time";
                quizMessage.style.color = "red";
            }
        }
    }
});

nextBtn.addEventListener('click', () => {
    let quest = displayCurrQuestion();
    let radios = document.getElementsByName('dynradio');
    for (let i = 0; i < 4; i++) {
        radios[i].onclick = () => {
            quizMessage.style.display = "block";
            if (radios[i].value === quest.answer) {
                quizMessage.innerText = "Right Answer, keep going.";
                quizMessage.style.color = "green";
            } else {
                quizMessage.innerText = "Better luck, next time";
                quizMessage.style.color = "red";
            }
        }
    }
})

