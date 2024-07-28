document.addEventListener("DOMContentLoaded", function () {
    // Lấy thẻ div chứa Count Down Time
    var countdowntimeContainer = document.getElementById("countdowntimeContainer");

    // Tạo thẻ img để thêm background cho web
    var img = document.createElement("img");

    // Đặt các thuộc tính cho phần tử <img>
    img.src = "./image/bgg (1).jpg";

    // Thêm img vào div
    countdowntimeContainer.appendChild(img);

    // Tạo thẻ div có class là Content bọc nội dung
    var contentDiv = document.createElement("div");
    contentDiv.className = "content";
    countdowntimeContainer.appendChild(contentDiv);

    // Tạo thẻ p
    var p = document.createElement("p");
    p.className = "timer";
    p.id = "timer";
    p.textContent = "01:00:00";

    contentDiv.appendChild(p);

    // Tạo div có class button-wrapper bọc các btn thành 1 hàng
    var btnDiv = document.createElement("div");
    btnDiv.className = "button-wrapper";

    contentDiv.appendChild(btnDiv);

    // Tạo button
    var btnStart = document.createElement("button");
    var btnStop = document.createElement("button");
    var btnReset = document.createElement("button");

    btnStart.textContent = "START";
    btnStart.id = "start";
    btnStop.textContent = "STOP";
    btnStop.id = "stop";
    btnStop.disabled = true;
    btnReset.textContent = "RESET";
    btnReset.id = "reset";

    btnDiv.appendChild(btnStart);
    btnDiv.appendChild(btnStop);
    btnDiv.appendChild(btnReset);

    // Tạo thẻ input để người dùng nhập thời gian
    var timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.id = "timeInput";
    timeInput.placeholder = "Enter time (HH:MM:SS)";

    contentDiv.appendChild(timeInput);

    // Thêm thẻ audio vào contentDiv
    var audio = document.createElement("audio");
    audio.src = "./sound/sound.mp3"; 
    audio.id = "audio";
    contentDiv.appendChild(audio);

    var timerInterval;
    var isPaused = true;
    var totalSeconds;

    function startTimer() {
        var timeParts = p.textContent.split(':');
        var hours = parseInt(timeParts[0]);
        var minutes = parseInt(timeParts[1]);
        var seconds = parseInt(timeParts[2]);
        totalSeconds = hours * 3600 + minutes * 60 + seconds;

        timerInterval = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                p.textContent = "00:00:00";
                btnStart.textContent = "START";
                btnStop.disabled = true;
                btnStart.disabled = true;
                audio.pause();
                audio.currentTime = 0;
                enableInput();
                return;
            }
            totalSeconds--;
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;
            p.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    }

    function enableInput() {
        timeInput.disabled = false;
    }

    function disableInput() {
        timeInput.disabled = true;
    }

    btnStart.addEventListener('click', function () {
        if (isPaused) {
            startTimer();
            btnStart.textContent = "RESUME";
            btnStart.disabled = true;
            btnStop.disabled = false;
            disableInput();
            audio.play();
        }
        isPaused = false;
    });

    btnStop.addEventListener('click', function () {
        clearInterval(timerInterval);
        isPaused = true;
        btnStart.disabled = false;
        btnStop.disabled = true;
        enableInput();
        audio.pause();
    });

    btnReset.addEventListener('click', function () {
        clearInterval(timerInterval);
        p.textContent = "01:00:00";
        isPaused = true;
        btnStart.textContent = "START";
        btnStart.disabled = false;
        btnStop.disabled = true;
        enableInput();
        audio.pause();
        audio.currentTime = 0;
    });

    // Thêm sự kiện keydown để cập nhật dữ liệu khi nhấn Enter
    timeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var input = timeInput.value;

            // Kiểm tra định dạng MM:SS
            var regex = /^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/;
            if (regex.test(input)) {
                p.textContent = input;

                btnStart.textContent = "START";
                btnStart.disabled = false;
                audio.currentTime = 0;
                audio.pause();
                isPaused = true; 
            }
            timeInput.value = "";
            timeInput.blur();
            event.preventDefault();
        
        }
    });
});
