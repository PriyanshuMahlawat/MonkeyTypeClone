document.addEventListener("DOMContentLoaded",function(){

    fetch("https://priyanshudjango.pythonanywhere.com/api/recordsalias")
    .then(response => response.json())
    .then(data=> {
        leaderboard(data);
        
        
    })
    .catch(error => console.error('Error:',error))

    function leaderboard(data){
        let n = data.length;
        let fifteensec = [];
        let sixtysec = [];
        for(let k=0;k<n;k++){
            if(data[k].time_typing==15){
                fifteensec.push(data[k]);
            }
            if(data[k].time_typing ==60){
                sixtysec.push(data[k]);
            }
        }
        if(fifteensec.length!=0){
            fifsec(fifteensec,fifteensec.length);
        }
       
        if(sixtysec.length !=0){
            sixsec(sixtysec,sixtysec.length);
        }
        
        
    }
    var user_id  = document.getElementById("user_id").textContent;
    function fifsec(arr15,n){
        arr15.sort((a,b)=>a.user-b.user)
        console.log(arr15)
        
        let userList = []
        for(let i=0;i<n;i++){
            
            if(!userList.includes(arr15[i].user)){
                userList.push(arr15[i].user);
            }
        }
        console.log(userList)

        let max = [];
        let count = 0;
        let fakewpm = 0;
        for(let j=0;j<n;j++){
            if(arr15[j].user==userList[count]){
                
                if(arr15[j].wpm>=fakewpm){
                    console.log("yes")
                    max[count]  =arr15[j];
                    fakewpm = arr15[j].wpm;
                }
            }
            else{fakewpm = 0;
                count++;
                if(arr15[j].wpm>=fakewpm){
                    console.log("yes")
                    max[count]  =arr15[j];
                    fakewpm = arr15[j].wpm;
                }
                console.log("no")
                
                
            }
            
        }
        
        
        max.sort((a,b)=>b.wpm-a.wpm)
        console.log(max)
        let rank = undefined;
        for(let i=0;i<max.length;i++){
            if(max[i].user==user_id){
                rank = i+1;
                
                
            }
        }
        var whole15  =document.getElementById("whole15");
        
        var yourRank = document.getElementById("your15");

        if(max.length>9)
        {
            for(let i=0;i<9;i++){
                var alias = max[i].alias;
                var wpmprint = max[i].wpm;
                whole15.innerHTML +=`<tr><td>${alias}</td><td>${wpmprint}</td></tr>`
                

            }
            yourRank.textContent += rank;
        }
        else{
            for(let i=0;i<max.length;i++){
                var alias = max[i].alias;
                var wpmprint = max[i].wpm;
                whole15.innerHTML +=`<tr><td>${alias}</td><td>${wpmprint}</td></tr>`
            }
            yourRank.textContent += rank;
        }
        
        

    }



    function sixsec(arr60,n){
        arr60.sort((a,b)=>a.user-b.user)
        console.log(arr60)
        let userList = []
        
        for(let l=0;l<n;l++){
            
            if(!userList.includes(arr60[l].user)){
                userList.push(arr60[l].user);
            }
        }
        
        
        let max1 = []
        let count = 0;
        let fakewpm = 0;
        for(let o=0;o<n;o++){
            if(arr60[o].user==userList[count]){
                if(arr60[o].wpm>=fakewpm){
                    max1[count]  =arr60[o];
                    fakewpm = arr60[o].wpm;
                }
            }
            else{fakewpm = 0;
                count++;
                if(arr60[o].wpm>=fakewpm){
                    max1[count]  =arr60[o];
                    fakewpm = arr60[o].wpm;
                }
                count++;
            }

        }
        let rank = undefined;
        for(let i=0;i<max1.length;i++){
            if(max1[i].user==user_id){
                rank = i+1;
                
                
            }
        }
        var table60 = document.getElementById("whole60");
        
        if(max1.length>9)
            {
                for(let i=0;i<9;i++){
                    var alias = max1[i].alias;
                    var wpmprint = max1[i].wpm;
                    table60.innerHTML +=`<tr><td>${alias}</td><td>${wpmprint}</td></tr>`
                }
                yourRank60.textContent += rank;
            }
            else{
                for(let i=0;i<max1.length;i++){
                    var alias = max1[i].alias;
                    var wpmprint = max1[i].wpm;
                    table60.innerHTML +=`<tr><td>${alias}</td><td>${wpmprint}</td></tr>`;
                }
                yourRank60.textContent += `${rank}`;
            
            }
    }


})