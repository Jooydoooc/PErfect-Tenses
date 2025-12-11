// User data and state management
let currentUser = {
    firstName: '',
    lastName: '',
    group: '',
    avatar: ''
};

let testState = {
    currentTest: 1,
    currentQuestion: 0,
    answers: [],
    startTime: null,
    timeLeft: 30 * 60, // 30 minutes in seconds
    timerInterval: null,
    cheatWarnings: 0,
    testStarted: false,
    submitted: false
};

// Test questions with shuffled answer order
const questions = [
    {
        question: "She ______ her homework already.",
        options: ["have finish", "has finished", "finished", "had finish"],
        correct: 1
    },
    {
        question: "By 8 o'clock yesterday, they ______ dinner.",
        options: ["have cooked", "had cooked", "will have cooked", "are cooked"],
        correct: 1
    },
    {
        question: "By this time tomorrow, I ______ the report.",
        options: ["will have finished", "will finished", "have finished", "had finished"],
        correct: 0
    },
    {
        question: "We ______ in this city since 2015.",
        options: ["lived", "have lived", "had lived", "will live"],
        correct: 1
    },
    {
        question: "When I arrived at the station, the train ______.",
        options: ["has already left", "already left", "had already left", "will already leave"],
        correct: 2
    },
    {
        question: "By 2040, many people ______ electric cars.",
        options: ["have used", "had used", "will have used", "will used"],
        correct: 2
    },
    {
        question: "He ______ his keys. He can't open the door.",
        options: ["has lost", "have lost", "lost", "had lose"],
        correct: 0
    },
    {
        question: "She was tired because she ______ all day.",
        options: ["has worked", "had worked", "will have worked", "was work"],
        correct: 1
    },
    {
        question: "By next Monday, they ______ the project.",
        options: ["will have completed", "have completed", "had completed", "will completed"],
        correct: 0
    },
    {
        question: "______ you ever ______ to London?",
        options: ["Did / go", "Have / gone", "Have / been", "Had / gone"],
        correct: 2
    },
    {
        question: "I didn't want to watch the film because I ______ it before.",
        options: ["have seen", "had seen", "will have seen", "was seeing"],
        correct: 1
    },
    {
        question: "By the time you get home, I ______ dinner.",
        options: ["will cook", "have cooked", "had cooked", "will have cooked"],
        correct: 3
    },
    {
        question: "They ______ just ______ the test.",
        options: ["have / finish", "has / finished", "have / finished", "had / finished"],
        correct: 2
    },
    {
        question: "After he ______ the book, he went to bed.",
        options: ["has finished", "finished", "had finished", "will have finished"],
        correct: 2
    },
    {
        question: "By 10 p.m., the students ______ their homework.",
        options: ["will have done", "have done", "had done", "will done"],
        correct: 0
    },
    {
        question: "She ______ in three different countries so far.",
        options: ["lived", "has lived", "had lived", "will live"],
        correct: 1
    },
    {
        question: "When we got to the cinema, the film ______.",
        options: ["already started", "has already started", "had already started", "will already start"],
        correct: 2
    },
    {
        question: "By 2026, they ______ a new bridge here.",
        options: ["build", "will have built", "have built", "had built"],
        correct: 1
    },
    {
        question: "I ______ my keys again! This is the third time this week.",
        options: ["lost", "had lost", "have lost", "will have lost"],
        correct: 2
    },
    {
        question: "Before she went to bed, she ______ all the emails.",
        options: ["has answered", "had answered", "will have answered", "answers"],
        correct: 1
    },
    {
        question: "By the end of this course, you ______ a lot of new vocabulary.",
        options: ["will have learned", "have learned", "had learned", "will learned"],
        correct: 0
    },
    {
        question: "They ______ never ______ such a big city before.",
        options: ["did / visit", "have / visited", "had / visited", "will have / visited"],
        correct: 2
    },
    {
        question: "He said he ______ the letter before I called him.",
        options: ["has received", "will have received", "had received", "received"],
        correct: 2
    },
    {
        question: "By next summer, we ______ here for ten years.",
        options: ["have lived", "had lived", "will have lived", "live"],
        correct: 2
    },
    {
        question: "She was nervous because she ______ an exam like this before.",
        options: ["never has taken", "never had taken", "never will have taken", "never took"],
        correct: 1
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load saved user data if exists
    const savedUser = localStorage.getItem('testPlatformUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainMenu();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup visibility change detection for cheating prevention
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Setup beforeunload warning
    window.addEventListener('beforeunload', handleBeforeUnload);
});

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Group selection change
    const groupSelect = document.getElementById('group');
    if (groupSelect) {
        groupSelect.addEventListener('change', function() {
            const otherGroupContainer = document.getElementById('otherGroupContainer');
            otherGroupContainer.style.display = this.value === 'other' ? 'block' : 'none';
        });
    }
    
    // View results button
    const viewResultsBtn = document.getElementById('viewResultsBtn');
    if (viewResultsBtn) {
        viewResultsBtn.addEventListener('click', showResults);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const group = document.getElementById('group').value;
    let finalGroup = group;
    
    if (group === 'other') {
        finalGroup = document.getElementById('otherGroup').value.trim();
        if (!finalGroup) {
            alert('Please specify your group name');
            return;
        }
    }
    
    if (!firstName || !lastName || !finalGroup) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Save user data
    currentUser = {
        firstName,
        lastName,
        group: finalGroup,
        avatar: (firstName[0] + lastName[0]).toUpperCase()
    };
    
    // Save to localStorage
    localStorage.setItem('testPlatformUser', JSON.stringify(currentUser));
    
    // Show main menu
    showMainMenu();
}

function showMainMenu() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
    document.getElementById('testPage').style.display = 'none';
    
    // Update welcome message
    document.getElementById('welcomeMessage').textContent = 
        `Welcome, ${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('userAvatar').textContent = currentUser.avatar;
}

function startTest(testNumber) {
    if (testNumber !== 1) {
        alert('This test is coming soon!');
        return;
    }
    
    // Reset test state
    testState = {
        currentTest: testNumber,
        currentQuestion: 0,
        answers: new Array(questions.length).fill(null),
        startTime: new Date(),
        timeLeft: 30 * 60,
        cheatWarnings: 0,
        testStarted: true,
        submitted: false
    };
    
    // Show test page
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('testPage').style.display = 'block';
    
    // Update student info
    document.getElementById('studentInfo').textContent = 
        `Student: ${currentUser.firstName} ${currentUser.lastName} | Group: ${currentUser.group}`;
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion();
    
    // Save test start time
    localStorage.setItem('testStartTime', testState.startTime.getTime());
}

function startTimer() {
    // Clear any existing timer
    if (testState.timerInterval) {
        clearInterval(testState.timerInterval);
    }
    
    // Update timer immediately
    updateTimerDisplay();
    
    // Start timer interval
    testState.timerInterval = setInterval(() => {
        if (testState.timeLeft > 0) {
            testState.timeLeft--;
            updateTimerDisplay();
            
            // Warning at 5 minutes
            if (testState.timeLeft === 5 * 60) {
                showCheatWarning('5 minutes remaining!', 'warning');
            }
            
            // Warning at 1 minute
            if (testState.timeLeft === 60) {
                showCheatWarning('1 minute remaining! Hurry up!', 'danger');
            }
        } else {
            // Time's up - auto submit
            clearInterval(testState.timerInterval);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(testState.timeLeft / 60);
    const seconds = testState.timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function loadQuestion() {
    const container = document.getElementById('questionsContainer');
    const question = questions[testState.currentQuestion];
    
    // Update progress bar
    const progress = ((testState.currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // Create question HTML
    container.innerHTML = `
        <div class="question-container">
            <div class="question-number">Question ${testState.currentQuestion + 1} of ${questions.length}</div>
            <div class="question-text">${question.question}</div>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <div class="option ${testState.answers[testState.currentQuestion] === index ? 'selected' : ''}" 
                         onclick="selectAnswer(${index})">
                        <div class="option-letter">${String.fromCharCode(97 + index)}</div>
                        <div class="option-text">${option}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Update navigation buttons
    updateNavigationButtons();
}

function selectAnswer(answerIndex) {
    testState.answers[testState.currentQuestion] = answerIndex;
    loadQuestion();
}

function changeQuestion(direction) {
    const newIndex = testState.currentQuestion + direction;
    
    if (newIndex >= 0 && newIndex < questions.length) {
        testState.currentQuestion = newIndex;
        loadQuestion();
    }
    
    // If we're going to the last question, change button to submit
    if (newIndex === questions.length - 1) {
        document.getElementById('nextBtn').textContent = 'Submit Test';
        document.getElementById('nextBtn').className = 'nav-btn submit-btn';
        document.getElementById('nextBtn').onclick = submitTest;
    } else {
        document.getElementById('nextBtn').textContent = 'Next';
        document.getElementById('nextBtn').className = 'nav-btn next-btn';
        document.getElementById('nextBtn').onclick = () => changeQuestion(1);
    }
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').style.display = 
        testState.currentQuestion === 0 ? 'none' : 'block';
    
    if (testState.currentQuestion === questions.length - 1) {
        document.getElementById('nextBtn').textContent = 'Submit Test';
        document.getElementById('nextBtn').className = 'nav-btn submit-btn';
        document.getElementById('nextBtn').onclick = submitTest;
    } else {
        document.getElementById('nextBtn').textContent = 'Next';
        document.getElementById('nextBtn').className = 'nav-btn next-btn';
        document.getElementById('nextBtn').onclick = () => changeQuestion(1);
    }
}

function submitTest() {
    if (testState.submitted) return;
    testState.submitted = true;
    
    // Clear timer
    clearInterval(testState.timerInterval);
    
    // Calculate score
    let correctAnswers = 0;
    const results = [];
    
    questions.forEach((question, index) => {
        const userAnswer = testState.answers[index];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) correctAnswers++;
        
        results.push({
            question: question.question,
            userAnswer: userAnswer !== null ? String.fromCharCode(97 + userAnswer) : 'Not answered',
            correctAnswer: String.fromCharCode(97 + question.correct),
            isCorrect: isCorrect
        });
    });
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    // Save results
    const testResult = {
        student: `${currentUser.firstName} ${currentUser.lastName}`,
        group: currentUser.group,
        testNumber: testState.currentTest,
        score: correctAnswers,
        total: questions.length,
        percentage: percentage,
        date: new Date().toISOString(),
        answers: testState.answers,
        results: results
    };
    
    // Save to localStorage
    saveTestResult(testResult);
    
    // Show results
    showTestResults(testResult);
    
    // Send to teacher via Telegram (simulated)
    sendToTelegram(testResult);
}

function saveTestResult(result) {
    let allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    allResults.push(result);
    localStorage.setItem('testResults', JSON.stringify(allResults));
}

function showTestResults(result) {
    document.getElementById('testPage').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'none';
    
    // Update result display
    document.getElementById('scorePercentage').textContent = `${result.percentage}%`;
    document.getElementById('finalScore').textContent = 
        `${result.score}/${result.total} Correct Answers`;
    document.getElementById('studentResultInfo').textContent = 
        `${result.student} | ${result.group}`;
    
    // Fill results table
    const tableBody = document.getElementById('resultsTableBody');
    tableBody.innerHTML = '';
    
    result.results.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}. ${item.question.substring(0, 50)}...</td>
            <td class="${item.isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                ${item.userAnswer}
            </td>
            <td class="correct-answer">${item.correctAnswer}</td>
            <td>
                ${item.isCorrect ? 
                    '<span style="color: #4cc9f0;"><i class="fas fa-check-circle"></i> Correct</span>' : 
                    '<span style="color: #f72585;"><i class="fas fa-times-circle"></i> Incorrect</span>'}
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Show group results if available
    const groupResults = getGroupResults(result.group);
    if (groupResults.length > 0) {
        document.getElementById('groupResults').style.display = 'block';
        const groupBody = document.getElementById('groupResultsBody');
        groupBody.innerHTML = '';
        
        groupResults.forEach(studentResult => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${studentResult.student}</td>
                <td>${studentResult.score}/${studentResult.total}</td>
                <td>${studentResult.percentage}%</td>
            `;
            groupBody.appendChild(row);
        });
    }
    
    // Show results modal
    document.getElementById('resultsModal').style.display = 'flex';
}

function getGroupResults(groupName) {
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    return allResults.filter(r => r.group === groupName && r.testNumber === 1);
}

function showResults() {
    const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const userResults = allResults.filter(r => 
        r.student === `${currentUser.firstName} ${currentUser.lastName}`
    );
    
    if (userResults.length === 0) {
        alert('No test results found. Please complete a test first.');
        return;
    }
    
    // Show latest result
    const latestResult = userResults[userResults.length - 1];
    showTestResults(latestResult);
}

function closeResults() {
    document.getElementById('resultsModal').style.display = 'none';
    showMainMenu();
}

function showCheatWarning(message, type) {
    const warning = document.getElementById('cheatWarning');
    warning.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    warning.style.display = 'block';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        warning.style.display = 'none';
    }, 3000);
}

function handleVisibilityChange() {
    if (document.hidden && testState.testStarted && !testState.submitted) {
        testState.cheatWarnings++;
        
        if (testState.cheatWarnings >= 2) {
            // Restart test
            alert('Test restarted due to cheating attempts!');
            showMainMenu();
            testState.testStarted = false;
        } else {
            showCheatWarning(`Warning ${testState.cheatWarnings}/2: Do not switch tabs!`, 'danger');
        }
    }
}

function handleBeforeUnload(e) {
    if (testState.testStarted && !testState.submitted) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your test progress will be lost!';
        return e.returnValue;
    }
}

// Simulated Telegram sending function
function sendToTelegram(result) {
    // In a real implementation, you would use the Telegram Bot API
    // This is a simulation that would be replaced with actual API call
    
    console.log('Results sent to teacher:', {
        student: result.student,
        group: result.group,
        score: result.score,
        percentage: result.percentage,
        timestamp: new Date().toISOString()
    });
    
    // Simulated API call (replace with actual implementation)
    /*
    fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student: result.student,
            group: result.group,
            score: result.score,
            total: result.total,
            percentage: result.percentage,
            test: 'Perfect Tenses',
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => console.log('Telegram response:', data))
    .catch(error => console.error('Error sending to Telegram:', error));
    */
}

// Make functions available globally
window.startTest = startTest;
window.selectAnswer = selectAnswer;
window.changeQuestion = changeQuestion;
window.showResults = showResults;
window.closeResults = closeResults;
