function range(max) {
    let arr = [];
    let a = Math.ceil(Math.random() * max);
    let b = Math.ceil(Math.random() * max);
    let c = Math.ceil(Math.random() * 3); // 1 = +, 2 = -, 3 = *

    arr.push(a);
    arr.push(b);

    if (c === 1) {
        arr.push("+");
        arr.push(a + b);
    } else if (c === 2) {
        arr.push("-");
        arr.push(a - b);
    } else if (c === 3) {
        arr.push("*");
        arr.push(a * b);
    } else {
        arr.push("error");
    }

    return arr;
}

document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const startButton = document.getElementById('start');
    const feedbackElement = document.getElementById('feedback');
    let rightAnswerCount = 0;
    let wrongAnswerCount = 0;
    let kerroin = 1;
    let currentAnswer = null;

    // Language data
    const languageData = {
        'en': {
            'question': 'How much is ',
            'correctAnswer': 'Correct!',
            'wrongAnswer': 'Wrong answer, the correct answer was: ',
            'greatJob': 'Awesome! You got five correct answers in a row!',
            'twoWrongAnswers': 'You got 2 wrong answers in a row.'
        },
        'fi': {
            'question': 'Paljonko on ',
            'correctAnswer': 'Oikea vastaus!',
            'wrongAnswer': 'Väärä vastaus, oikea vastaus on: ',
            'greatJob': 'Hienoa! Sait viisi oikeaa vastausta peräkkäin!',
            'twoWrongAnswers': 'Sait kaksi väärää vastausta peräkkäin.'
        }
    };

    // Set initial language
    let currentLanguage = 'en';

    function askQuestion() {
        let data = range(10 * kerroin);
        questionElement.textContent = `${languageData[currentLanguage]['question']}${data[0]} ${data[2]} ${data[1]} = `;
        currentAnswer = data[3];
        answerInput.value = '';
    }

    submitButton.addEventListener('click', () => {
        const userAnswer = Number(answerInput.value);
        if (userAnswer === currentAnswer) {
            feedbackElement.textContent = languageData[currentLanguage]['correctAnswer'];
            feedbackElement.style.color = 'green';
            rightAnswerCount++;
            wrongAnswerCount = 0;

            if (rightAnswerCount >= 5) {
                feedbackElement.textContent += "\n" + languageData[currentLanguage]['greatJob'];
                rightAnswerCount = 0;
                kerroin++;
            }
        } else {
            feedbackElement.textContent = `${languageData[currentLanguage]['wrongAnswer']}${currentAnswer}.`;
            feedbackElement.style.color = 'red';
            rightAnswerCount = 0;
            wrongAnswerCount++;

            if (wrongAnswerCount >= 2 && kerroin > 1) {
                feedbackElement.textContent += "\n" + languageData[currentLanguage]['twoWrongAnswers'];
                wrongAnswerCount = 0;
                kerroin--;
            }
        }

        askQuestion(); // Ask a new question
    });

    startButton.addEventListener('click', () => {
        rightAnswerCount = 0;
        wrongAnswerCount = 0;
        kerroin = 1;
        feedbackElement.textContent = ''; // Clear any existing feedback
        askQuestion();
    });

    // Language switching
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', () => {
        currentLanguage = languageSelector.value;
        askQuestion(); // Refresh the question with the new language
    });

    // Initial question
    askQuestion();
});