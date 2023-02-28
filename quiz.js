const question = document.querySelector('#question');
// shift + alt + down arrow copys and pastes the line down
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timer = document.querySelector('#timer');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let counter = 120
let questionCounter = 0;
let availableQuestions = [];



let questions = [
    {
        question: 'Inside what HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<js>',
        choice3: '<scripting>',
        choice4: '<javascript>',
        answer: 2,
    },
    {
        question: 'What is the correct syntax to link the JavaScript file?',
        choice1: '<script name="xxx.js"',
        choice2: '<script src="xxx.js"',
        choice3: '<script href="xx.js"',
        choice4: '<scirpt src=xxx.js',
        answer: 2,
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'function:myFunction()',
        choice2: 'function myFunction()',
        choice3: 'function = myFUnction()',
        choice4: 'function = my(function)',
        answer: 2,
    },
    {
        question: 'Inside what HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<js>',
        choice3: '<scripting>',
        choice4: '<javascript>',
        answer: 1,
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choice1: 'myFunction()',
        choice2: 'call function myFunction()',
        choice3: 'call myFunction()',
        choice4: 'dail 528-272-7478',
        answer: 1,
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        choice1: 'onclick',
        choice2: 'onchange',
        choice3: 'onmouseclick',
        choice4: 'onmouseover',
        answer: 1,
    },
    {
        question: 'How do you declare a Javascript variable?',
        choice1: 'var carName;',
        choice2: 'variable carName;',
        choice3: 'v carName;',
        choice4: 'Var CarName;',
        answer: 1,
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        choice1: 'x',
        choice2: '-',
        choice3: '*',
        choice4: '=',
        answer: 1,
    },
    {
        question: 'Which of the followings are primitive data types in JavaScript?',
        choice1: 'String',
        choice2: 'Number',
        choice3: 'Boolean',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'What is null in JavaScript?',
        choice1: 'Null means empty string value',
        choice2: 'Null means absence of a value',
        choice3: 'Null means unknown value',
        choice4: 'Null means unknown value',
        answer: 2,
    },
];

const scorePoints = 100;
const maxQuestions = 10;

startGame = () => {
    questionCounter = 0
    score = 0
    counter = 120
    availableQuestions = [...questions]
    getNewQuestions()
    timerStart()
};    

timerStart = () => {
    var interval = setInterval(() => {
        timer.innerHTML = counter + 'seconds left'

        if (counter < 1) {
            timer.innerHTML = '0 seconds left'
            clearInterval(interval)

            return window.location.assign('/end.html')
        } else {
            counter--
        }
    },1000)
}

getNewQuestions = () => { 
    //keeps track of score
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    //keeps track of number of question
    questionCounter++
    progressText.innerText = `Questions ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
//splice allows us to take the array of questions and filter then 1 by 1
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}



startGame()