// Questions array
const questions = [
    {
      question: "What is SpongeBob's pet snail's name?",
      options: ["Gary", "Larry", "Patrick", "Squidward"],
      correctAnswer: "Gary"
    },
    {
      question: "Who is SpongeBob's best friend?",
      options: ["Gary", "Patrick", "Mr. Krabs", "Squidward"],
      correctAnswer: "Patrick"
    },
    {
      question: "What is the name of the fast-food restaurant where SpongeBob works?",
      options: ["Krusty Krab", "Chum Bucket", "Barnacle Bay", "SpongeBob's Diner"],
      correctAnswer: "Krusty Krab"
    },
    {
      question: "What is Squidward's favorite instrument?",
      options: ["Guitar", "Clarinet", "Piano", "Drums"],
      correctAnswer: "Clarinet"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let highScore = localStorage.getItem('highScore') || 0;
  
  // Load the high score on page load
  document.getElementById('high-score').textContent = highScore;
  
  // Display current question
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const options = document.getElementById('options');
    options.innerHTML = '';
  
    currentQuestion.options.forEach(option => {
      const optionElement = document.createElement('li');
      optionElement.textContent = option;
      optionElement.classList.add('option');
      options.appendChild(optionElement);
  
      optionElement.addEventListener('click', () => {
        // Check if the selected option is correct
        if (option === currentQuestion.correctAnswer) {
          score++;
          document.getElementById('score').textContent = score;
        }
  
        // After answer is selected, disable options and proceed to the next question
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(opt => {
          opt.style.pointerEvents = 'none'; // Disable further clicks
        });
  
        // If it's the last question, display score
        if (currentQuestionIndex === questions.length - 1) {
          setTimeout(() => {
            if (score > highScore) {
              highScore = score;
              localStorage.setItem('highScore', highScore);
              document.getElementById('high-score').textContent = highScore;
            }
            alert("Quiz Completed! Your score: " + score);
            resetQuiz();
          }, 1000);
        } else {
          // Otherwise, move to the next question
          setTimeout(nextQuestion, 1000);
        }
      });
    });
  }
  
  // Move to the next question
  function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
  }
  
  // Reset the quiz
  function resetQuiz() {
    score = 0;
    document.getElementById('score').textContent = score;
    currentQuestionIndex = 0;
    loadQuestion();
  }
  
  // Load first question
  loadQuestion();
  