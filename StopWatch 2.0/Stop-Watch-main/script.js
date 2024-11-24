let startBtn = document.querySelector('.start');
let resetBtn = document.querySelector('.reset');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');
let one_hunderth_second = document.querySelector('.one_hunderth_second');
let laps = document.querySelector('.laps');
let lapbox = document.querySelector('.lapbox');

let minute_now = 0;
let second_now = 0;
let miliSecond_now = 0;
let intervalID;
let isRunning = false; // Track if the stopwatch is running

// Function to update the timer display
function updateTime() {
    miliSecond_now++;
    if (miliSecond_now === 100) {
        second_now++;
        miliSecond_now = 0;
    }
    if (second_now === 60) {
        minute_now++;
        second_now = 0;
    }

    minute.innerHTML = minute_now.toString().padStart(2, '0');
    second.innerHTML = second_now.toString().padStart(2, '0');
    one_hunderth_second.innerHTML = miliSecond_now.toString().padStart(2, '0');
}

// Function to start the stopwatch
function start_watch() {
    intervalID = setInterval(updateTime, 10);
    isRunning = true;
}

// Function to handle the start/stop button behavior
function change_value() {
    if (!isRunning) {
        startBtn.innerHTML = "Stop";
        resetBtn.innerHTML = "Lap";
        startBtn.style.backgroundColor = "red";
        resetBtn.style.backgroundColor = "blue";
        start_watch();
    } else {
        clearInterval(intervalID);
        isRunning = false;
        startBtn.style.backgroundColor = "#1ffb1f";
        resetBtn.style.backgroundColor = "red";
        startBtn.innerHTML = "Start";
        resetBtn.innerHTML = "Reset";
    }
}

// Function to handle laps
function laped() {
    lapbox.classList.add('lapbox_open');
    const lapTime = `${minute_now.toString().padStart(2, '0')}:${second_now.toString().padStart(2, '0')}:${miliSecond_now.toString().padStart(2, '0')}`;
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.innerHTML = `<h3>${laps.childElementCount + 1}.</h3><h4>${lapTime}</h4><h4>${lapTime}</h4>`;
    laps.prepend(lapElement);
}

// Function to handle reset button behavior
function reset_value() {
    if (!isRunning) {
        // Reset all time variables to zero
        minute_now = 0;
        second_now = 0;
        miliSecond_now = 0;

        // Clear the display
        minute.innerHTML = '00';
        second.innerHTML = '00';
        one_hunderth_second.innerHTML = '00';

        // Clear lap display
        laps.innerHTML = "";
        lapbox.classList.remove('lapbox_open');
    } else {
        // Record a lap if stopwatch is running
        laped();
    }
}
