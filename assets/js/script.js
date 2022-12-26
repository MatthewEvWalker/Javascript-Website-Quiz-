// Variables linked to the HTML

const startBtn = document.getElementById('start')
const nextBtn = document.getElementById('next')
const questionContainer = document.getElementById('?-cont');
const questionEle = document.getElementById('question')
const answerBtnEle = document.getElementById('question-btns')
const scoreStr = document.getElementById('score')
let score = '100'
let randomAnswers, answerIndex


// Starts the game and parses through the object array when clicking the next button

startBtn.addEventListener('click', gameStart)
nextBtn.addEventListener('click', () => {
    answerIndex++
    newQuestion()
})


// An object array

const questions = [
    {
        questionStr: 'When was the Louisana Purchase?',
        answers: [
            { answer: '1803', correct: true },
            { answer: '1802', correct: false },
            { answer: '1821', correct: false },
            { answer: '1783', correct: false }
        ]
    },
    {
        questionStr: 'What president bought the Louisiana Purchase?',
        answers: [
            { answer: 'James Madison', correct: false },
            { answer: 'John Adams', correct: false },
            { answer: 'Alexander Hamilton', correct: false },
            { answer: 'Thomas Jefferson', correct: true }
        ]
    },
    {
        questionStr: 'The United States bought Alaska from which country?',
        answers: [
            { answer: 'France', correct: false },
            { answer: 'China', correct: false },
            { answer: 'Russia', correct: true },
            { answer: 'None of the above', correct: false }
        ]
    },
    {       
        questionStr: 'Who was the fourth president of the United States?',
        answers: [
            { answer: 'James Monroe', correct: false },
            { answer: 'James Madison', correct: true },
            { answer: 'Benjamin Franklin', correct: false },
            { answer: 'John Adams', correct: false }
        ]
    },
    {
        questionStr: 'Fill in the blank: The 19th Amendment guarantees ____ the right to vote',
        answers: [
            { answer: 'Men', correct: false },
            { answer: 'African Americans', correct: false },
            { answer: 'Women', correct: true },
            { answer: 'Uh uh someone', correct: false }
        ]
    },
]

// starts the game if start button is pressed and hides the start button
// Scrambles the questions and then removes the hidden CSS trait on the container

function gameStart() {
    startBtn.classList.add('hidden')
    randomAnswers = questions.sort(()=> Math.random() - .5)
    answerIndex = 0
    questionContainer.classList.remove('hidden')
    newQuestion()
}

// Sets the question and random answers

function newQuestion() {
    resetQuestion()
    openQuestion(randomAnswers[answerIndex])
}

// Adds the specific questions that I created and gives them CSS
// Also checks to see if the answer is correct within the object array

function openQuestion(q) {
    questionEle.innerText = q.questionStr
    q.answers.forEach(answerIdx => {
        const answerButton = document.createElement('button')
        answerButton.innerText = answerIdx.answer
        answerButton.classList.add('btn')
        if (answerIdx.correct) {
            answerButton.dataset.correct = answerIdx.correct
        }
        answerButton.addEventListener('click', chooseAnswer)
        answerBtnEle.appendChild(answerButton)
    })
}

// Removes the premade quesitons 

function resetQuestion() {
    nextBtn.classList.add("hidden")
    while (answerBtnEle.firstChild) {
        answerBtnEle.removeChild(answerBtnEle.firstChild)
    }
}

// Checks to see if the chosen target is correct and then sets the color for the correct or wrong answers

function chooseAnswer(event) {
    const chosenBtn = event.target
    const correct = chosenBtn.dataset.correct
    setStatus(document.body, correct)
    Array.from(answerBtnEle.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (randomAnswers.length > answerIndex + 1) {
        nextBtn.classList.remove('hidden')
    } else {
        startBtn.innerText = 'Back to Beginning'
        startBtn.classList.remove('hidden')
    }
}

// Gives the correct or wrong CSS color based on the answers 

function setStatus(ele, correct) {
    clearStatus(ele)
    if (correct) {
        ele.classList.add('correct')
    } else {
        ele.classList.add('wrong')
    }
}

function clearStatus(ele) {
    ele.classList.remove('correct')
    ele.classList.remove('wrong')
}



// function keepScore(s) {
//     scoreStr.innerText = score
// }

// function callScore() {
//     keepScore(score)
// }