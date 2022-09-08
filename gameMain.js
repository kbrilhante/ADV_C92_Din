const p1Name = localStorage.getItem("p1Name");
const p2Name = localStorage.getItem("p2Name");
let p1Score = 0;
let p2Score = 0;
let questionCount = 0;
let word;

document.getElementById("p1Name").innerHTML = p1Name + ": ";
document.getElementById("p2Name").innerHTML = p2Name + ": ";

writeScore();

writeQA();

function writeScore() {
    console.log(p1Name + ": " + p1Score + " | " + p2Name + ": " + p2Score);
    document.getElementById("p1Score").innerHTML = p1Score;
    document.getElementById("p2Score").innerHTML = p2Score;
}

function writeQA() {
    let question, answer;
    if (questionCount % 2 == 0) {
        question = p1Name;
        answer = p2Name;
    } else {
        question = p2Name;
        answer = p1Name;
    }
    document.getElementById("playerQuestion").innerHTML = "Question turn: " + question;
    document.getElementById("playerAnswer").innerHTML = "Answer turn: " + answer;
}

function send() {
    word = document.getElementById("word").value;
    word = word.toUpperCase();
    console.log("Palavra: " + word);
    let wordReplace = word;

    const wordLength = word.length;
    console.log("Length: " + wordLength);

    if (wordLength >= 5) {
        const charIndex = new Set();
        // escolhe 3 index aleatorios:
        while (charIndex.size < 3) {
            const randomIndex = Math.floor(Math.random() * wordLength)
            // console.log(randomIndex);
            charIndex.add(randomIndex);
        }
        console.log(charIndex);

        // substitui as letras nos 3 index sorteados por "_"
        for (const index of charIndex.values()){
            // console.log("Index: " + index);
            const char = word[index];
            // console.log("Char: " + char);
            wordReplace = replaceAt(wordReplace, index, "_");
            console.log(wordReplace);
        }

        const wordDisplay = "<h4 id='wordDisplay' class='display-4'>" + wordReplace + "</h4>";
        const inputAnswer = "<label class='col-form-label'>Answer: </label>" + 
            "<input id='answer' type='text' class='form-control' placeholder='your answer'>"
        const button = "<button onclick='check()' class='btn btn-warning col-6 mx-auto'>Check</button>"
        const outputHTML = wordDisplay + inputAnswer + button;

        document.getElementById("output").innerHTML = outputHTML;

        document.getElementById("word").value = "";
        document.getElementById("input").style.display = "none";
        document.getElementById("enviar").style.display = "none";
    }
}

function replaceAt(str, index, replacement) {
    let replaced = 
        str.substring(0, index) + 
        replacement + 
        str.substring(index + 1);
    return replaced;
}

function check() {
    const answer = document.getElementById("answer").value.toUpperCase();
    // console.log(answer);
    if (word === answer) {
        // console.log("yay! =]");
        if (questionCount % 2 == 0) {
            // Player 2 scores
            p2Score++;
        } else {
            // Player 1 scores
            p1Score++;
        }
        writeScore();
    } else {
        console.log("nay! =[");
    }
    questionCount++;
    writeQA();
    document.getElementById("output").innerHTML = "";

    document.getElementById("input").style.display = "flex";
    document.getElementById("enviar").style.display = "inline-block";
}