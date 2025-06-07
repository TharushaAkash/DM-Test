document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Correct answers for each question (only for the first 25 auto-graded)
    const answers = {
        q1: '2049016320',
        q2: '358800000',
        q3: '847288609',
        q4: '1572120576',
        q5: '11040',
        q6: '450',
        q7: '1382958400',
        q8: '468000',
        q9: '1260',
        q10: '6',
        q11: '252',
        q12: '96',
        q13: '60396',
        q14: '720',
        q15: '360',
        q16: '72',
        q17: '120',
        q18: '55/512',
        q19: '101',
        q20: '84',
        q21: '1560',
        q22: '30',
        q23: '120',
        q24: '1154984000',
        q25: '102009600'
    };

    let score = 0;
    let total = Object.keys(answers).length;

    // Remove previous highlights and feedback
    for (let i = 1; i <= 25; i++) {
        const block = document.getElementById('block-q' + i);
        if (block) {
            block.classList.remove('correct');
            block.classList.remove('wrong');
            const oldFeedback = block.querySelector('.answer-feedback');
            if (oldFeedback) oldFeedback.remove();
        }
    }

    // Check answers and highlight for first 25 questions only
    for (let i = 1; i <= 25; i++) {
        const qid = 'q' + i;
        const select = document.getElementById(qid);
        const userAnswer = select ? select.value : '';
        const correctAnswer = answers[qid];
        const block = document.getElementById('block-' + qid);

        if (userAnswer === correctAnswer) {
            score++;
            if (block) {
                block.classList.add('correct');
                const span = document.createElement('span');
                span.className = 'answer-feedback';
                span.style.color = 'green';
                span.style.marginLeft = '10px';
                span.textContent = `✔ Correct`;
                block.appendChild(span);
            }
        } else {
            if (block) {
                block.classList.add('wrong');
                const span = document.createElement('span');
                span.className = 'answer-feedback';
                span.innerHTML = `<span style="color:red;">✘ Your answer: ${userAnswer || 'No answer'}</span> <span style="color:green;">Correct: ${correctAnswer}</span>`;
                span.style.marginLeft = '10px';
                block.appendChild(span);
            }
        }
    }

    let resultText = `You scored ${score} out of ${total}.`;
    if (score === total) {
        resultText += " Excellent!";
    } else if (score >= total / 2) {
        resultText += " Good job!";
    } else {
        resultText += " Try again!";
    }

    document.getElementById('result').textContent = resultText;

    // Show the result and feedback section, and scroll to it
    document.getElementById('result').style.display = '';
    document.getElementById('feedback').style.display = '';
    setTimeout(() => {
        document.getElementById('result').scrollIntoView({behavior: "smooth"});
    }, 100);

    // Do NOT hide pages here; let navigation remain as is
    // Remove or comment out this line if present:
    // document.querySelectorAll('.quiz-page').forEach(pg => pg.style.display = 'none');
});
