document.addEventListener('DOMContentLoaded',function(){
    fetch("http://127.0.0.1:8000/static/dictionary.txt")
    .then(response => {
        if(!response.ok){
            throw new Error('Something wrong with receiving the file'+response.status)

        }
        return response.text();}
              
    )
    .then(data =>{
        const wordarray = data.split('\n').map(line => line.trim()).filter(line => line);
        paragraphGenerator(15,wordarray);

    })

    function number(min,max){
        let n = Math.ceil(Math.random()*3000)
        if(min<=n<=max){
            return n
        }

    }

    var realTest = document.getElementById("real-test");
    var inputText = document.getElementById("para");

    
    let para = "";
    function paragraphGenerator(time,wordarray){
        var words = time*32;
        
        
        for(var i=0;i<words;i++){
            var random = number(1,2998);
            
            para += wordarray[random];
            para += " ";

        }
            
            realTest.innerText = para;
            let spaceindex=0;
            var para1 = para;
            
            inputText.addEventListener('keyup',function(event){
                
                var test = inputText.value;
                console.log(test)
                let n = test.length;
                console.log(n);
                if(event.code==='Space'){
                    
                    if(para1[n-1]==" "){
                        console.log('legal space')
                        var newrealTest = test + para1.slice(n);
                        realTest.innerText = newrealTest;
                    }
                    else{
                            spaceindex = 0;
                            for(let i=n;i<para1.length;i++){
                                if(para1[i]==" "){
                                spaceindex = i;
                                console.log(`spaceindex= ${spaceindex}`)
                                break;
                                }
                            } 
                            
                            
                        
                        
                        inputText.value= test + " ".repeat(spaceindex-n+1);
                        inputText.selectionStart = spaceindex+1;
                        inputText.selectonEnd = spaceindex+1; 
                        var new1realTest = inputText.value.trim() + para1.slice(n-1);
                        realTest.innerText = new1realTest;
                         
                    }

                    

                }
                else{
                    if(para1[n-1] ===" "){
                        console.log('check')
                        var new3realTest = test + " " + para1.slice(n);
                        var strtExtra = para1.slice(0,n-2);
                        var endExtra = para1.slice(n-2);
                        para1 = strtExtra+" "+endExtra;      
                        realTest.innerText = new3realTest;
                    }
                    else{
                        var new2realTest = test +para1.slice(n);
                        realTest.innerText = new2realTest;
                    }
                    

                }
            
             })

    }
    var typed = inputText.value.split(" ");
    let wordsTyped = typed.length;
    let paraArr = para.split(" ");
    let count =0;
    for(let i =0;i<wordsTyped;i++){
        if(typed[i]==paraArr[i]){
            count++;
        }
    }
    let time = 15;
    var wpm = count*60/time;
    


    inputText.value="";


})



