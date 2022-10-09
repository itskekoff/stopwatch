let hr = min = sec = ms = "0" + 0,
    startTimer;

let lapsNumber = 1;
let allLaps = [];

const startBtn = document.querySelector(".startBtn")
const stopBtn = document.querySelector(".stopBtn")
const resetBtn = document.querySelector(".resetBtn")
const lapBtn = document.querySelector(".lapBtn")

const laps = document.querySelector(".laps")

document.addEventListener("DOMContentLoaded", ready);

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function ready() {
    lapBtn.classList.add("stopActive");
}

function start() {
    startBtn.classList.add("active")
    stopBtn.classList.remove("stopActive")
    lapBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    startTimer = setInterval(() => {
        ms++;

        ms = ms < 10 ? "0" + ms : ms;
        if (ms == 100) {
            sec++;
            sec = sec < 10 ? "0" + sec : sec;
            ms = "0" + 0;
        }
        if (sec == 60) {
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        if (min == 60) {
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            min = "0" + 0;
        }
        putValue();
    }, 10);
}

function stop() {
    startBtn.classList.remove("active")
    stopBtn.classList.add("stopActive")
    lapBtn.classList.add("stopActive");
    clearInterval(startTimer)
}

function reset() {
    resetBtn.classList.remove("active")
    stopBtn.classList.remove("stopActive")
    clearInterval(startTimer)
    hr = min = sec = ms = "0" + 0;
    allLaps = [];
    laps.innerHTML = "";
    lapsNumber = 1;
    putValue()
}

function lap() {
    if (hasClass(lapBtn, "stopActive")) {
        return;
    }
    allLaps.push(
        {
            time: hr + ":" + min + ":" + sec + ":" + ms,
            number: lapsNumber++
        }
    )
    displayLaps();
}

function putValue() {
    document.querySelector(".millisecond").innerText = ms;
    document.querySelector(".second").innerText = sec;
    document.querySelector(".minute").innerText = min;
    document.querySelector(".hour").innerText = hr;
}

function displayLaps() {
    laps.innerHTML = "";
    if (allLaps.length > 0) {
        allLaps.map(item => {
            laps.innerHTML += `
                <div class="lap">
                    <span>Lap ${item.number}</span>
                    <span>${item.time}</span>
                </div>
             `
        })
    }
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}