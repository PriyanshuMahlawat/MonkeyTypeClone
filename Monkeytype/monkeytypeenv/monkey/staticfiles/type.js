document.addEventListener('DOMContentLoaded', function () {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
<<<<<<< HEAD
    //hello
=======
>>>>>>> aad561c52388aa1d44ceb683ff24fad37e41d1f7

    const csrftoken = getCookie('csrftoken');
    var wordarray = [];
    var time = 15;

    fetch("https://priyanshudjango.pythonanywhere.com/static/dictionary.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error('Something wrong with receiving the file' + response.status)
            }
            return response.text();
        })
        .then(data => {
            wordarray = data.split('\n').map(line => line.trim()).filter(line => line);
            paragraphGenerator(time, wordarray);
        })

    function number(min, max) {
        let n = Math.ceil(Math.random() * 483)
        if (min <= n && n <= max) {
            return n
        }
    }

    var realTest = document.getElementById("real-test");
    var inputText = document.getElementById("para");
    let displayTimer = document.getElementById("timer");
    displayTimer.innerText = time;

    document.getElementById("select-lang").addEventListener("click", function () {
        alert("It's not working bcz its paid!");
    })

    let count1 = 0;
    let para = "";

    function paragraphGenerator(newTime, wordarray) {
        time = newTime;
        console.log('paragen', time)
        para = "";
        var words = time * 20;

        for (var i = 0; i < words; i++) {
            var random = number(1, 470);
            para += wordarray[random];
            para += " ";
        }

        realTest.innerText = para;
        inputText.value = "";
        displayTimer.innerText = time;

        let startTime, endTime, timerInterval;

<<<<<<< HEAD
        function keyupTxtarea(event) {
            if (event.key == "Enter") {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        
            if (count1 == 0) {
                // Start timer logic (unchanged)
                let startTime = Date.now();
                let endTime = startTime + time * 1000;

                // Define the timer mechanism function
                function timerMechanism() {
                    let currentTime = Date.now();
                    let remainingTime = Math.max(0, Math.round((endTime - currentTime) / 1000));
                    displayTimer.innerText = remainingTime;
                    // Stop the interval when the timer reaches 0
                    if (remainingTime <= 0) {
                        clearInterval(timerstopId);

                        var logged_in = document.getElementById("user-alias");


                        var typed = inputText.value.split(" ");
                        let wordsTyped = typed.length;
                        let paraArr = para.split(" ");
                        let count = 0;
                        for (let i = 0; i < wordsTyped; i++) {
                            if (typed[i] == paraArr[i]) {
                                count++;
                            }
                        }
                        var wpm = count * 60 / time;
                        var rawSpeed = wordsTyped * 60 / time;
                        var accuracy = count / wordsTyped * 100;
                        var roundoffAccuracy = accuracy.toPrecision(2);
                        var testType = `Time:${time}seconds   Language:English`;
                        var userId = document.getElementById("user_id").textContent;

                        var postrecord = {
                            wpm: wpm,
                            accuracy: roundoffAccuracy,
                            time_typing: time,
                            user: userId,
                        }
                        function render() {

                            var typeHtml = document.getElementById("typeHtml")
                            var resultHtml = document.getElementById("resultHtml")
                            typeHtml.style.display = "none";
                            resultHtml.style.display = "block";
                            document.getElementById("wpm").innerText = `WPM  ${wpm}`;
                            document.getElementById("accuracy").innerText = `Accuracy  ${roundoffAccuracy}%`;
                            document.getElementById("rawspeed").innerText = `Raw Speed  ${rawSpeed}`;
                            document.getElementById("testtype").innerText = `Test Type:  ${testType}`;
                        }
                        //ummm

                        if (logged_in) {
                            fetch("https://priyanshudjango.pythonanywhere.com/api/records/", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRFToken': csrftoken,
                                },
                                body: JSON.stringify(postrecord)
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('not ok');
                                        
                                    }
                                    return response.json();
                                })
                                .then(data => {

                                })
                                .catch(error => {
                                    console.log('Error:', error);

                                })
                            render();
                            setTimeout(() => {
                                fetch("https://priyanshudjango.pythonanywhere.com/api/records/")
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data)
                                        let n = data.length;
                                        var wpmArr = [];

                                        for (let i = 0; i < n; i++) {
                                            var record = data[i];

                                            if (record.user == userId) {
                                                wpmArr.push(record.wpm);
                                            }


                                        }
                                        wpmArr.sort((a, b) => b - a);
                                        console.log(wpmArr)
                                        document.getElementById("#1").innerText = `1. WPM: ${wpmArr[0]}`;
                                        document.getElementById("#2").innerText = `2. WPM: ${wpmArr[1]}`;
                                        document.getElementById("#3").innerText = `3. WPM: ${wpmArr[2]}`;
                                        document.getElementById("#4").innerText = `4. WPM: ${wpmArr[3]}`;
                                        document.getElementById("#5").innerText = `5. WPM: ${wpmArr[4]}`;
                                        render();
                                    })
                                    .catch(error => console.error('Error:', error));
                            }, 500);

                        }
                        else {
                            render();
                        }





                    }
                }
                // Start the interval timer
                let timerstopId = setInterval(timerMechanism, 1000);
                count1++;
            }
        
            var test = inputText.value;
            let n = test.length;
        
            // Prevent rapid key repeat
            if (event.repeat) {
                event.preventDefault();
                return;
            }
        
            if (event.code === 'Space') {
                handleSpace(n);
            } else {
                handleOtherKeys(event, n);
            }
        
            // Update real-time comparison
            updateComparison();
=======
        function startTest() {
            startTime = Date.now();
            endTime = startTime + time * 1000;
            timerInterval = setInterval(updateTimer, 1000);
>>>>>>> aad561c52388aa1d44ceb683ff24fad37e41d1f7
        }

        function updateTimer() {
            let remainingTime = Math.max(0, Math.round((endTime - Date.now()) / 1000));
            displayTimer.innerText = remainingTime;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                endTest();
            }
        }

        function updateDisplay() {
            let typed = inputText.value;
            let compared = '';
            for (let i = 0; i < para.length; i++) {
                if (i < typed.length) {
                    if (typed[i] === para[i]) {
                        compared += '<span class="correct">' + para[i] + '</span>';
                    } else {
                        compared += '<span class="incorrect">' + para[i] + '</span>';
                    }
                } else {
                    compared += para[i];
                }
            }
            realTest.innerHTML = compared;
        }

        function endTest() {
            var typed = inputText.value.trim().split(/\s+/);
            var original = para.trim().split(/\s+/);
            var correctWords = typed.filter((word, index) => word === original[index]).length;
            var wpm = Math.round((correctWords / time) * 60);
            var accuracy = (correctWords / typed.length) * 100;
            var roundoffAccuracy = accuracy.toFixed(2);
            var testType = `Time:${time}seconds   Language:English`;
            var userId = document.getElementById("user_id").textContent;

            var postrecord = {
                wpm: wpm,
                accuracy: roundoffAccuracy,
                time_typing: time,
                user: userId,
            }

            function render() {
                var typeHtml = document.getElementById("typeHtml")
                var resultHtml = document.getElementById("resultHtml")
                typeHtml.style.display = "none";
                resultHtml.style.display = "block";
                document.getElementById("wpm").innerText = `WPM  ${wpm}`;
                document.getElementById("accuracy").innerText = `Accuracy  ${roundoffAccuracy}%`;
                document.getElementById("rawspeed").innerText = `Raw Speed  ${(typed.length / time) * 60}`;
                document.getElementById("testtype").innerText = `Test Type:  ${testType}`;
            }

            var logged_in = document.getElementById("user-alias");
            if (logged_in) {
                fetch("https://priyanshudjango.pythonanywhere.com/api/records/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(postrecord)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    render();
                    setTimeout(() => {
                        fetch("https://priyanshudjango.pythonanywhere.com/api/records/")
                            .then(response => response.json())
                            .then(data => {
                                let wpmArr = data.filter(record => record.user == userId)
                                                 .map(record => record.wpm)
                                                 .sort((a, b) => b - a);
                                for (let i = 1; i <= 5; i++) {
                                    document.getElementById(`#${i}`).innerText = `${i}. WPM: ${wpmArr[i-1] || '-'}`;
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    }, 500);
                })
                .catch(error => {
                    console.log('Error:', error);
                });
            } else {
                render();
            }
        }

        inputText.addEventListener('input', function(event) {
            if (!startTime) startTest();
            updateDisplay();
        });
    }

    // Time selection event listeners
    var timeEl = document.getElementById("time-link");
    var ex1 = document.getElementById("ex1");
    var ex2 = document.getElementById("ex2");
    var ex3 = document.getElementById("ex3");
    var ex4 = document.getElementById("ex4");
    var ex5 = document.getElementById("ex5");

    timeEl.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("hidden").style.display = "block";
        [ex1, ex2, ex3, ex4, ex5].forEach(el => el.style.display = "table-cell");
    });

    [ex1, ex2, ex3, ex4].forEach((el, index) => {
        el.addEventListener("click", (event) => {
            event.preventDefault();
            count1 = 0;
            inputText.value = "";
            let times = [15, 30, 60, 120];
            displayTimer.innerText = times[index];
            paragraphGenerator(times[index], wordarray);
        });
    });

    // Custom timer logic
    var timerTxt = document.getElementById("timer-txtarea");
    var timerdisp = document.getElementById("timer-input");
    var okBtn = document.getElementById("ok");

    ex5.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("custom-timer-modal").style.display = "block";
    });

    timerTxt.addEventListener("input", function () {
        let timestr = timerTxt.value;
        if (/^\d+$/.test(timestr) || timestr.includes('h') || timestr.includes('m') || timestr.includes('s')) {
            let [hour, minute, second] = [0, 0, 0];
            let time = 0;

            let parts = timestr.match(/(\d+h)?(\d+m)?(\d+s)?/);
            if (parts[1]) hour = parseInt(parts[1]);
            if (parts[2]) minute = parseInt(parts[2]);
            if (parts[3]) second = parseInt(parts[3]);

            time = hour * 3600 + minute * 60 + second;

            timerdisp.innerText = `${hour}hour, ${minute}minute and ${second}seconds`;
            displayTimer.innerText = time;

            okBtn.onclick = function(event) {
                event.preventDefault();
                document.getElementById("custom-timer-modal").style.display = "none";
                document.getElementById("hidden").style.display = "none";
                [ex1, ex2, ex3, ex4, ex5].forEach(el => el.style.display = "none");
                paragraphGenerator(time, wordarray);
            };
        } else {
            timerTxt.value = "";
        }
    });
});
