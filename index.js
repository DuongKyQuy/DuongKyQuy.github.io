document.addEventListener("DOMContentLoaded", function () {
    // Lấy thẻ div chứa Count Down Time
    var countdowntimeContainer = document.getElementById(
        "countdowntimeContainer"
    );

    // Tạo thẻ img để thêm background cho web
    var img = document.createElement("img");

    // Đặt các thuộc tính cho phần tử <img>
    img.src = "./image/backgr.png";

    // Thêm img vào div
    countdowntimeContainer.appendChild(img);

    // Tạo thẻ div có class là Content bọc nội dung
    var contentDiv = document.createElement("div");
    contentDiv.className = "content";
    countdowntimeContainer.appendChild(contentDiv);

    // Tạo thẻ h3 để thêm title
    var h3 = document.createElement("h3");
    h3.textContent = "Exercise Challenge";

    // Thêm h3 vào div
    contentDiv.appendChild(h3);

    // Tạo thẻ p
    var p = document.createElement("p");
    p.className = "timer";
    p.id = "timer";
    p.textContent = "25:00";

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
    timeInput.placeholder = "Enter time (MM:SS)";

    contentDiv.appendChild(timeInput);

    // Thêm sự kiện keydown để cập nhật dữ liệu khi nhấn Enter
    timeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var input = timeInput.value;

            // Kiểm tra định dạng MM:SS
            var regex = /^[0-5][0-9]:[0-5][0-9]$/;
            if (regex.test(input)) {
                p.textContent = input; 
            }

            timeInput.value = ""; 
            timeInput.blur(); 
            event.preventDefault();
        }
    });

    var timerInterval;
    var isPaused = true;
    var totalSeconds;

    function startTimer() {
        var timeParts = p.textContent.split(':');
        var minutes = parseInt(timeParts[0]);
        var seconds = parseInt(timeParts[1]);
        totalSeconds = minutes * 60 + seconds;

        timerInterval = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                p.textContent = "00:00";
                btnStart.textContent = "START";
                btnStop.disabled = true;
                btnStart.disabled = true;
                return;
            }
            totalSeconds--;
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            p.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
        }
        isPaused = false;
    });

    btnStop.addEventListener('click', function () {
        clearInterval(timerInterval);
        isPaused = true;
        btnStart.disabled = false;
        btnStop.disabled = true;
        enableInput();
    });

    btnReset.addEventListener('click', function () {
        clearInterval(timerInterval);
        p.textContent = "25:00";
        isPaused = true;
        btnStart.textContent = "START";
        btnStart.disabled = false;
        btnStop.disabled = true;
        enableInput();
    });
});
