let lvlForm = document.querySelector("#lvl-form");
let lvl = document.querySelector("#lvl");
let start = document.querySelector("#start");
let replay = document.querySelector("#replay");
let word = document.querySelector("#word");
let inp = document.querySelector("#word-inp");
let words = document.querySelector("#words");
let data = document.querySelector("#data");
let timeLeft = document.querySelector("#time-left");
let score = document.querySelector("#score");
let inst = document.querySelector("#instructions");
let gOver = document.querySelector("#game-over");

let wordsArr = ["trickier", "lingo","categorization","terrific","curtain","sequential","runny","moist","fluffy","dense"];
// let wordsArr = ["lingo","curtain","runny"];

let difficultyOpt = {
    Easy: 6,
    Mid: 4,
    Hard: 3
}
let difficultyTime = difficultyOpt[lvl.value];
let basket = [];
/* ##########################33 */
/* Events */
/* Load Page */
window.addEventListener("load", ()=>{
    upComingWords();
    instructions();
})
/* Click Start */
start.addEventListener("click", ()=>{
    start.style.display = "none";
    lvlForm.style.display = "none";
    upComingWords();
    lvlDiff();
})
/* Replay */
replay.addEventListener("click", ()=>{
    restart();
    upComingWords();
    lvlDiff();
})
/* Change lvl */
lvl.addEventListener("change", ()=>{
    if ((start.style.display !== "none") || (replay.style.display !== "none")) {
        wordsArr = wordsArr.concat(...basket);
        basket = [];
        instructions();
    }
})
/* ############################# */
/* Functions */
/* emerge Word */
let upComingWords = ()=>{
    words.innerHTML = "";
    wordsArr.forEach((w)=>{
        let p = document.createElement("p");
        p.classList = "upcoming";
        let pText = document.createTextNode(w);
        p.appendChild(pText);
        words.appendChild(p);
    })
}
let emergeWord = ()=>{
    let randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    word.innerText = randomWord;
    basket.push(wordsArr.splice(wordsArr.indexOf(randomWord), 1)[0]);
    inp.focus();
}
/* Instructions */
let instructions = ()=>{
    for (const opt of Object.keys(difficultyOpt)) {
        if (opt === lvl.value) {
            difficultyTime = difficultyOpt[opt];
            if ((start.style.display !== "none") || (inp.hasAttribute("disabled"))) {
                inst.innerText = `You have ${wordsArr.length} words your mission is to write each word within ${difficultyTime} seconds, if you write all words within the specific time you gonna succeed otherwise you fail, Good luck!`
            }
        }
    }
}
/* lvl difference */
let lvlDiff = ()=>{
    let decrease = setInterval(() => {
        difficultyTime--;
        timeLeft.innerText = `Time left: ${difficultyTime} Seconds`
        if ((!difficultyTime == 0) && (inp.value === word.innerText)) {
            inp.value = "";
            score.innerText = `Score ${basket.length} of ${wordsArr.length + basket.length}`;
            if (basket.length == (wordsArr.length + basket.length)) {
                clearInterval(decrease);
                end();
                word.innerText = "Congratulations! you have succeeded :)";
            }else{
                emergeWord();
                upComingWords();    
                instructions();
            }
        } else if (difficultyTime == 0) {
            clearInterval(decrease)
            end();
        }
    }, 1000);
}
/* restart */
let end = ()=>{
    if ((basket.length == (wordsArr.length + basket.length))) {
        inp.setAttribute("disabled", "");
        replay.style.display = "block";
    }else if(difficultyTime == 0){
        inp.setAttribute("disabled", "");
        replay.style.display = "block";
        gOver.style.display = "block";
    }
    lvlForm.style.display = "flex";
}
let restart = ()=>{
    inp.value = "";
    wordsArr = wordsArr.concat(...basket);
    basket = [];
    inp.removeAttribute("disabled");
    score.innerText = `Score ${basket.length} of ${wordsArr.length + basket.length}`;
    instructions();
    emergeWord();
    replay.style.display = "none";
    if(wordsArr.length != 0){
        gOver.style.display = "none";
    }
    lvlForm.style.display = "none";
    
}
/* Would be some enhancements to do later... To be continued Insha Allah*/