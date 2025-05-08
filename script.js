const typing = document.querySelector(".typing-text p")
const input = document.querySelector(".wrapper .input-field")
const time = document.querySelector(".time span b")
const mistakes = document.querySelector(".mistake span")
const wpm = document.querySelector(".wpm span")
const cpm = document.querySelector(".cpm span")
const btn = document.querySelector("button")

//set value

let timer;
let maxtime=60;
let timeleft = maxtime;
let charIndex= 0;
let mistake = 0;
let istyping = false;


function loadparagraph() {
    const pargraph = ["Success isn't about how much money you make; it's about the difference you make in people's lives.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Believe you can and you're halfway there.",
        "Every day is a new opportunity to reach for the stars. Make it count.",
        "Your only limit is your mind. Free it, and you'll achieve greatness.",
        "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
        "Success doesn't come from what you do occasionally; it comes from what you do consistently.",
        "Dream big, work hard, stay focused, and surround yourself with good people.",
        "Don't watch the clock; do what it does. Keep going.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Your journey is shaped by the decisions you make; choose to be unstoppable.",
        "Great things never come from comfort zones. Step out and create your own path.",
        "You don't have to be great to start, but you have to start to be great.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Turn your obstacles into opportunities and your problems into possibilities.",
        "Push yourself, because no one else is going to do it for you.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Embrace the struggle and let it make you stronger. The pain you feel today is the strength you feel tomorrow.",
        "The best way to predict your future is to create it."
    ];
    const randomindex = Math.floor(Math.random()*pargraph.length)
    typing.innerHTML ='';
    for(const char of pargraph[randomindex]){
        console.log(char)
        typing.innerHTML +=`<span>${char}</span>`;
    }
    typing.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typing.addEventListener("click",()=>{
        input.focus()
    })

}

// handel user input

function inittypiing() {
    const char = typing.querySelectorAll('span');
    const typechar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeleft > 0) {

        if (!istyping) {
            timer = setInterval(inintimer, 1000);
            istyping = true;
        }

        if (char[charIndex].innerText === typechar) {
            char[charIndex].classList.add("correct");
        } else {
            mistake++;
            char[charIndex].classList.add("incorrect");
        }

        char[charIndex].classList.remove("active");
        charIndex++;
        if (charIndex < char.length) {
            char[charIndex].classList.add("active");
        }

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

        // ✅ Stop timer when task is complete
        if (charIndex === char.length) {
            clearInterval(timer);
            istyping = false;
            input.value = '';
        }
    }
}
function inintimer(){
    if(timeleft>0){
        timeleft--;
        time.innerText=timeleft;
        if (charIndex === char.length) {
            clearInterval(timer);
            istyping = false;
            input.value = '';
        
            // ✅ Calculate WPM once
            const timeTaken = maxtime - timeleft;
            const finalWPM = Math.round(((charIndex - mistake) / 5) / (timeTaken / 60));
            wpm.innerText = finalWPM > 0 && isFinite(finalWPM) ? finalWPM : 0;
        }
    }
    else{
        clearInterval(timer)
    }
    
    }

    function reset(){
        loadparagraph();
        clearInterval(timer);
        timeleft = maxtime;
        time.innerText=timeleft;
        input.value=''
        charIndex=0;
        mistake=0;
        istyping=false;
        wpm.innerHTML=0
        cpm.innerHTML=0
        mistakes.innerHTML=0
    }
   
input.addEventListener("input",inittypiing);
btn.addEventListener("click",reset)

loadparagraph();