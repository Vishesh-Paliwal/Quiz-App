let questions = [  
    {
        question: 'How many sizes of headers are available in HTML by default?',
        choice1: '5',
        choice2: '1',
        choice3: '3',
        choice4: '6',
        answer: 4,
    }, 
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let qbox = document.getElementById("Qbox");
let sc = document.getElementById("sc");
let att = document.getElementById("att");
// let tot = document.getElementById("tot");
let progressBar = document.getElementById("progressBar");
let pg = document.getElementById("page"); 
let ov = document.getElementById("over");
let correct = document.getElementById("correct");
let wrong = document.getElementById("wrong");

let set1 = new Set([...Array(questions.length).keys()]);

let score = 0;
let attempted = 0;
Game();

function Game() {
    if (set1.size === 0) {
        pg.classList.add("hide");
        ov.classList.remove("hide");
        let finSc = document.getElementById("finScore");
        finSc.innerText = "Final Score : " + score;

        let restartButton = document.getElementById("restartButton");
        restartButton.addEventListener("click", function() {
            location.reload(); 
        });

        return;
    }

    let idxArray = Array.from(set1);
    let idx = idxArray[Math.floor(Math.random() * idxArray.length)];
    
    set1.delete(idx);

    let q = document.getElementById("que");
    let qtext = questions[idx].question;
    let choice1 = questions[idx].choice1;
    let choice2 = questions[idx].choice2;
    let choice3 = questions[idx].choice3;
    let choice4 = questions[idx].choice4;

    q.innerHTML = qtext;
    document.getElementById("Atext").innerText = choice1;
    document.getElementById("Btext").innerText = choice2;
    document.getElementById("Ctext").innerText = choice3;
    document.getElementById("Dtext").innerText = choice4;

    let options = document.querySelectorAll(".option > div");
    // tot.innerText = options.length;

    options.forEach(option => {
        option.style.backgroundColor = "black"; 
        option.removeEventListener('click', handleClick); 
        option.addEventListener('click', handleClick); 
    });

    function handleClick() {
        let option = this;
        if (parseInt(option.id) === questions[idx].answer) {
            correct.play();
            option.style.backgroundColor = "green";
            score += 10;
            attempted++;
            sc.innerText = score;
            att.innerText = attempted;
        } else {
            option.style.backgroundColor = "red";
            wrong.play();
            attempted++;
            att.innerText = attempted;
        }

        updateProgressBar(attempted, questions.length);
        options.forEach(opt => opt.removeEventListener('click', handleClick));

        setTimeout(function () {
            Game();
        }, 1000);
    }

    function updateProgressBar(attempted, total) {
        let progress = (attempted / total) * 100;
        progressBar.style.width = progress + "%";
    }
}
