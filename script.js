let flexDiv  = document.querySelector(".flex")
let arrayPar = []
let arrayNum = []
let able     = true

let head     = document.querySelector(".head")
let score    = document.querySelector(".score")
let time     =document.querySelector(".time")
let formDiv  = document.querySelector(".form")
let num1     = document.querySelector("#num1")
let num2     = document.querySelector("#num2")
let inTime   = document.querySelector("#select-time")
let btnPlay  = document.querySelector("#btn-play")
let btnrelo  = document.querySelector("#re")
let name     = document.querySelector("#name")
let Helloname= document.querySelector(".name")

let savedData = localStorage.getItem("resultGames")

if (savedData) {
    let gameResultOBJ = JSON.parse(savedData)
    let high_score = document.querySelector(".high-score")
    for (let i = 0 ; i < gameResultOBJ.length; i++ ) {
        high_score.innerHTML += `
            <div>name : ${gameResultOBJ[i].name}</div>
            <div>${gameResultOBJ[i].num1} * ${gameResultOBJ[i].num2}</div>
            <div>The time : ${gameResultOBJ[i].time}</div>
            <div>The score : ${gameResultOBJ[i].score}</div>
            <div>finished in : ${+gameResultOBJ[i].time - +gameResultOBJ[i].current}s</div>
        `
    }
}


document.querySelector("#btn-play").onclick = () => {
    if(
        num1.value      !== null 
        && num2.value   !== null 
        && inTime.value !== null 
        && inTime.value > 0 
        && name.value   !== null 
        && (num1.value * num2.value)%2 == 0
        ) {
        for (let i = 0; i < (num1.value * num2.value); i++) {
            arrayNum.push(i)
            creater()
        }
        formDiv.remove()
        btnPlay.remove()
        head.style.display     = "flex"
        btnrelo.style.display  = "block"
        time.textContent       = inTime.value
        Helloname.textContent  = `Hello :: ${name.value}`
        intTimer()
        appendNum(num1.value * num2.value)
    }
}
function creater() {
    let parent = document.createElement("div")
    let back   = document.createElement("div")
    let front  = document.createElement("div")
    parent.classList.add("p")
    back.classList.add("back")
    front.classList.add("front")
    front.append("?")
    parent.append(back,front)
    flexDiv.append(parent)
    arrayPar.push(parent)
}
function appendNum(num) {
    let back = [...document.querySelectorAll(".back")]
    for (let i = 0; i < num; i += 2) { 
        back[i].textContent = (i / 2) +1
        back[i + 1].textContent = (i / 2) +1
    }
    rand()
}
function rand() {
    for (let i=0; i < arrayPar.length ; i++) {
        let rand = Math.floor(Math.random() * arrayNum.length)
        let valueOrder = arrayNum[rand]
        arrayPar[i].style.order = valueOrder
        arrayNum.splice(rand,1)
    }
}
function intTimer() {
    let counter = setInterval(() => {
    time.textContent -= 1
        if (time.textContent == 0) {
            loser(counter)
        } else {
            winner(counter)
        }
    }, 1000);
}
document.body.addEventListener("click", (e) => {
    if (
            e.target.parentElement.classList.contains("p") 
            && able == true 
            && !e.target.parentElement.classList.contains("true")
        ) {
        e.target.parentElement.classList.add("clicked")
        closeTheClasses()
    }
})
function closeTheClasses() {
    let classes = document.querySelectorAll(".clicked")
    if (classes.length == 2) {
        let z = classes[0].textContent
        let o = classes[1].textContent
        trueOrfalse(classes,z,o)
    }
}
function trueOrfalse(classes,z,o) {
    if (z == o) {
        time.textContent = +time.textContent + 3 
        classes.forEach( (ele) => {
            ele.classList.add("true")
            ele.classList.remove("clicked")
    })
    } else {
        able = false
        setTimeout(() => {
            score.textContent = +score.textContent + 1
            classes.forEach( (ele) => ele.classList.remove("clicked"))
            able = true
        }, 1000);
    }
}
function winner(counter) {
    let finish = arrayPar.every(ele => ele.classList.contains("true"))
    if (finish) {
        let obj = {
            name:name.value,
            num1:num1.value,
            num2:num2.value,
            time:inTime.value,
            score:score.textContent,
            current:time.textContent
        }
        let currentGame = localStorage.getItem("resultGames")
        if (currentGame == null) {
            currentGame = []
        } else {
            currentGame = JSON.parse(currentGame)
        }
        currentGame.push(obj)
        localStorage.setItem("resultGames",JSON.stringify(currentGame))
        alert("winner")
        document.body.style.backgroundColor = "green"
        clearInterval(counter)
    }
}
function loser(counter) {
    alert("GAME OVER!!")
    document.body.style.backgroundColor = "red"
    clearInterval(counter)
    arrayPar.forEach((ele) => {
        if(!ele.classList.contains("true")) {
            ele.firstElementChild.style.backgroundColor = "green"
            ele.classList.add("true")
        }
    })
}
document.querySelector("#re").onclick = () => location.reload()
