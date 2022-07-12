var quiz = {
  // Q = fråga O = alternativ, A = korrekt svar
  data: [{
        q: "Hur många arter av papegojor finns det?",
        o: [
           "100 arter",
           "250 arter",
           "Över 305 arter",
           "Över 400 arter"
        ],
        a: 3
     },
     {
        q: "Hur många tår har en papegoja?",
        o: [
           "4",
           "6",
           "8",
           "12"
        ],
        a: 1
     },
     {
        q: "Hur ofta ska du mata din papegoja?",
        o: [
           "Varannan dag",
           "2 gånger i veckan",
           "Var tredje dag",
           "Minst en gång om dagen"
        ],
        a: 3
     },
     {
        q: "Vilken plats är mest optimal för en papegojbur att stå på?",
        o: [
           " I ett kök",
           "I ett vardasgrum",
           "Vid ett fönster med fin utsikt",
           "Utomhus"
        ],
        a: 1
     },
     {
        q: "Vilket av följande livsmedel är dödlig för papegojor?",
        o: [
           "Mjölk",
           "Havregryn",
           "Gurka",
           "Avokado"
        ],
        a: 3
     }
  ],

  hWrap: null, // html quiz container
  hQn: null, // html question wrapper
  hAns: null, // htmlHTML answers wrapper

  now: 0, // nuvarande fråga
  score: 0, // nuvarande poäng

  init: function () {
     //  wrapper
     quiz.hWrap = document.getElementById("quiz_wrap");

     // frågor-sektion
     quiz.hQn = document.createElement("div");
     quiz.hQn.id = "quiz_question";
     quiz.hWrap.appendChild(quiz.hQn);

     // svar-sektion
     quiz.hAns = document.createElement("div");
     quiz.hAns.id = "quiz_answer";
     quiz.hWrap.appendChild(quiz.hAns);

     // kör!
     quiz.draw();
  },

  // rita fråga
  draw: function () {
     // (C1) QUESTION
     quiz.hQn.innerHTML = quiz.data[quiz.now].q;

     // alternativ
     quiz.hAns.innerHTML = "";
     for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", quiz.select);
        quiz.hAns.appendChild(label);
     }
  },

  // alternativ valt
  select: function () {
     // (D1) DETACH ALL ONCLICK
     let all = quiz.hAns.getElementsByTagName("label");
     for (let label of all) {
        label.removeEventListener("click", quiz.select);
     }

     // kolla om korrekt
     let correct = this.dataset.idx == quiz.data[quiz.now].a;
     if (correct) {
        quiz.score++;
        this.classList.add("correct");
     } else {
        this.classList.add("wrong");
     }

     // nästa fråga eller quiz slut
     quiz.now++;
     setTimeout(function () {
        if (quiz.now < quiz.data.length) {
           quiz.draw();
        } else {
           quiz.hQn.innerHTML = `Du har svarat ${quiz.score} av ${quiz.data.length} korrekt.`;
           quiz.hAns.innerHTML = "";
        }
     }, 1000);
  }
};


window.addEventListener("load", quiz.init);

// formulär

$(document).ready(function () {
  hyperform(window);
});

