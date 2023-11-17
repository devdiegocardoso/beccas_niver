class Question {

    constructor(question, answer, hint) {
        this.question = question;
        this.answer = answer;
        this.hint = hint
    }

    getAnswerSize(params) {
        return this.answer.length;
    }
}
current_question = 0;
number_of_tries = 0;
is_endgame = false;
max_tries = 5;

const questions = []
const images = ["sprite1.png", "sprite2.png", "sprite3.png", "sprite4.png", "sprite5.png", "sprite6.png"];
gameover_image = "sprite6.png";
winner_image = "sprite1.png";

questions.push(new Question("If you have 30 white socks, 20 black socks, and 10 blue socks in a dark room scattered on the floor, How many will you pick to get at least one matching pair?", "4", "It's a number lesser than 10."));
questions.push(new Question("This guys office is on the 30th floor of the building. Everyday,he gets off at the 25th floor and walks the extra 5 floors up stairs. Why does he walk the extra 5 floors rather then taking the elevator?", ["midget", "dwarf"], "Think about the person and the arrangement of the buttons on the elevator panel."));
questions.push(new Question("I am deep but not a basin. I hold, but do not have hands. I am made of plastic, metal or ceramic. What am I?", ["food bowl", "bowl"], "Soup fits perfect here!"));
questions.push(new Question("I'm often running yet I have no legs. Sometimes I fall from Sky, but never get hurt. You need me but I don't need you. What am I?", "water", "It's something you should drink more haha."));
questions.push(new Question("Name three keys that cannot open any doors?", ["donkey", "turkey", "monkey"], "Hmmm... certainly they aren't objects. Maybe something alive?"));

console.log(questions);

function hangman() {
    document.getElementById("question-text").innerHTML = questions[current_question].question;
    document.querySelector("img").src = "images/" + images[number_of_tries];
    document.querySelector("input").value = "";
    tries_left = max_tries + 1 - number_of_tries;
    tries_text = String(tries_left)
    if (tries_left == 1)
        tries_text = tries_text.concat(" try ");
    else
        tries_text = tries_text.concat(" tries ");
    document.querySelector("#span-ntries").innerText = tries_text;
}

function isCorrectAnswer(answer) {
    console.log(answer);
    switch (current_question) {
        case 0:
            return answer == questions[0].answer ? true : false;
        case 1:
            return questions[1].answer.some(r => answer.includes(r));
        case 2:
            return questions[2].answer.some(r => answer.includes(r));
        case 3:
            return answer == questions[3].answer ? true : false;
        case 4:
            number_of_correct_answers = 0;
            questions[4].answer.forEach(element => {
                if (answer.includes(element)) number_of_correct_answers += 1;
            });
            return number_of_correct_answers == 3;

    }
}

function questionChoice() {
    given_answer = document.getElementById("answer-text").value.trim().toLowerCase();

    if (given_answer.length > 0 && isCorrectAnswer(given_answer)) {
        document.getElementById("hint-button").innerText = "show hint";
        current_question < questions.length - 1 ? current_question++ : endGame();
    } else {
        number_of_tries < max_tries ? number_of_tries++ : endGame();
    }
    if (!is_endgame)
        hangman();
}

function endGame() {
    is_endgame = true;
    document.querySelector("h3").innerHTML = "Game Over."
    if (number_of_tries == 5) {
        document.getElementById("div-text-area").innerHTML = '<h1>Try Again, menina!</h1><br><button class="play-button" id="restart-button">Restart</button>';
        document.querySelector("img").src = "images/" + gameover_image;
        document.getElementById("restart-button").addEventListener("click", function () {
            location.reload();
        });
    }
    else {

        document.getElementById("div-text-area").innerHTML = '<h1>Congrats! You saved the nice guy and now he is so grateful that he is going to give you some gifts in return!</h1><br><button class="play-button" id="restart-button">Restart</button>';
        document.querySelector("img").src = "images/" + winner_image;
        document.getElementById("restart-button").addEventListener("click", function () {
            location.reload();
        });
    }
}

document.getElementById("answer-button").addEventListener("click", function () {
    questionChoice();
});

document.getElementById("hint-button").addEventListener("click", function () {
        document.getElementById("hint-button").innerText = questions[current_question].hint;
});

if (!is_endgame)
    hangman();