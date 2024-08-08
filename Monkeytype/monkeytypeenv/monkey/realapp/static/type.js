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
   

    const csrftoken = getCookie('csrftoken');
    var wordarray = [];
    var time = 15;
    
    fetch("http://127.0.0.1:8000/static/dictionary.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error('Something wrong with receiving the file' + response.status)

            }
            return response.text();
        }

        )
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
        alert("It's not wokring bcz its paid!");
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
        var downtime = 0;
        var uptime = 0;

        realTest.innerText = para;
        let spaceindex = 0;
        var para1 = para;
        let previous_input = "";
        

        
        
        inputText.addEventListener("keyup",function(event){           
            
            
            keyupTxtarea(event);
            
        });
        
        

        
        
        function keyupTxtarea(event) {
            
            
            
            if (event.key == "Enter") {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (count1 == 0) {

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

                        if (logged_in) {
                            fetch("http://127.0.0.1:8000/api/records/", {
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
                            setTimeout(()=>{
                                fetch("http://127.0.0.1:8000/api/records/")
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                    let n = data.length;
                                    var wpmArr = [];

                                    for (let i = 0; i < n; i++) {
                                        var record = data[i];
                                        
                                        if(record.user ==userId){
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
                            },500);
                            
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
            

            if (event.code === 'Space') {

                if (para1[n - 1] == " ") {
                    
                    realTest.innerText = realTest.innerText + para1.slice(n);
                }
                else {
                    spaceindex = 0;
                    let p = n;
                    console.log(p)
                    var testReal = realTest.innerText;
                    console.log(testReal)
                    for (let i = p; i < testReal.length; i++) {
                        if (testReal[i] == " ") {
                            spaceindex = i;
                            console.log(`spaceindex= ${spaceindex}`)
                            break;
                        }
                    }

                    
                        inputText.value = test + " ".repeat(spaceindex - p + 1);
                        var sentence = inputText.value.trim();
                        realTest.innerText = sentence + testReal.slice(sentence.length);
                        inputText.selectionStart = spaceindex + 1;
                        inputText.selectionEnd = spaceindex + 1;
                    
                    p+=spaceindex - p+1;
                    console.log(p)

                }



            }
            
            else {
                if (para1[n - 1] === " "){
                    if (event.key != "Backspace") {
                        console.log('check')
                        realTest.innerText = test + " " + para1.slice(n);
                        var strtExtra = para1.slice(0, n - 2);
                        var endExtra = para1.slice(n - 2);
                        para1 = strtExtra + " " + endExtra;
                        
                    }
                    else{
                        if(para1[n-1]===" " && n>0 && test[n-1]!=" " ){
                            var previous = realTest.innerText;                    
                            realTest.innerText = previous.slice(0, n) + " "+ previous.slice(n+2);
                        }
                        else{
                            realTest.innerText = previous.slice(0, n) + previous.slice(n);
                        }                   
                    }
                }
                else {
                    var previous = realTest.innerText;
                    if (event.key != "Backspace"){


                        if (previous.slice(0, n - 1) == "") {
                            realTest.innerText = event.key + para1.slice(n);
                        }
                        else {
                            realTest.innerText = previous.slice(0, n - 1) + event.key + para1.slice(n); 
                        }
                        
                        
                    }
                    else {
                        
                        realTest.innerText = previous.slice(0, n) + previous.slice(n);
                    }

                }
            }
            
        }


    }
    var timeEl = document.getElementById("time-link");
    var ex1 = document.getElementById("ex1");
    var ex2 = document.getElementById("ex2")
    var ex3 = document.getElementById("ex3")
    var ex4 = document.getElementById("ex4")
    var ex5 = document.getElementById("ex5")
    timeEl.addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("hidden").style.display = "block";
        ex1.style.display = "table-cell";
        ex2.style.display = "table-cell";
        ex3.style.display = "table-cell";
        ex4.style.display = "table-cell";
        ex5.style.display = "table-cell";



    })



    ex1.addEventListener("click", (event) => ex1Click(event, wordarray));
    function ex1Click(event, wordarray) {
        event.preventDefault();
        
        count1 = 0;
        inputText.value = "";
        displayTimer.innerText = 15;
        paragraphGenerator(15, wordarray);

    }
    ex2.addEventListener("click", (event) => ex2Click(event, wordarray));
    function ex2Click(event, wordarray) {
        event.preventDefault();
        
        count1 = 0;
        inputText.value = "";
        displayTimer.innerText = 30;
        paragraphGenerator(30, wordarray);
        
    }
    ex3.addEventListener("click", (event) => ex3Click(event, wordarray));
    function ex3Click(event, wordarray) {
        event.preventDefault();
        
        count1 = 0;
        inputText.value = "";
        displayTimer.innerText = 60;
        paragraphGenerator(60, wordarray);
    }
    ex4.addEventListener("click", (event) => ex4Click(event, wordarray));
    function ex4Click(event, wordarray) {
        event.preventDefault();
        
        count1 = 0;
        inputText.value = "";
        displayTimer.innerText = 120;
        paragraphGenerator(120, wordarray);
    }


    var timerTxt = document.getElementById("timer-txtarea");
    var timerdisp = document.getElementById("timer-input");
    var okBtn = document.getElementById("ok");
    var hour = 0;
    var minute = 0;
    var second = 0;
    ex5.addEventListener("click", (event) => ex5Click(event, wordarray));
    function ex5Click(event, wordarray) {
        event.preventDefault();
        document.getElementById("custom-timer-modal").style.display = "block";
        let timestr = "";
        timerTxt.addEventListener("keyup", function (event) {
            timestr = timerTxt.value;
            if (/^\d+$/.test(timestr) || timestr.includes('h') || timestr.includes('s') || timestr.includes('m')) {
                event.preventDefault();


                let timestr1 = timestr.replace('h', " ");
                let timestr2 = timestr1.replace('m', " ");
                let timestrFinal = timestr2.replace('s', " ");

                let timeArr = timestrFinal.trim().split(" ");
                if (timeArr.length == 0) {
                    hour = 999;
                    minute = 999;
                    second = 999;
                    time = 9999;
                }
                else if (timeArr.length == 3) {
                    hour = timeArr[0];
                    minute = timeArr[1];
                    second = timeArr[2];
                    time = Number(hour) * 3600 + Number(minute)*60 + Number(second);
                }
                else if (timeArr.length == 2) {
                    hour = 0;
                    minute = timeArr[0];
                    second = timeArr[1];
                    time = Number(minute)*60 + Number(second);
                }
                else if (timeArr.length == 1) {
                    hour = 0;
                    minute = 0;
                    second = timeArr[0];
                    time = second;
                }
                

                timerdisp.innerText = `${hour}hour, ${minute}minute and ${second}seconds`;
                okBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    document.getElementById("custom-timer-modal").style.display = "none";
                    document.getElementById("hidden").style.display = "none";
                    ex1.style.display = "none";
                    ex2.style.display = "none";
                    ex3.style.display = "none";
                    ex4.style.display = "none";
                    ex5.style.display = "none";
                })
                displayTimer.innerText = time;
                paragraphGenerator(time, wordarray);
            }
            else {
                timerTxt.value = "";
            }

        })
    }


    inputText.value = "";

}
)



