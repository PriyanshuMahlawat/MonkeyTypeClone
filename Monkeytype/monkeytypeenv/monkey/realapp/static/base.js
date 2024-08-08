document.addEventListener("DOMContentLoaded",function(){
    var login_linkEl = document.getElementById("login")
    var login_formEl = document.getElementById("login-trans")
    
    var register_formEl = document.getElementById("register-trans")
    
    var closelog_btnEl = document.getElementById("close-log")
    var closeanoun_btnEl = document.getElementById("close-anoun")
    var closereg_btnEl = document.getElementById("close-reg")
    var registerbuttonEl  =document.getElementById("register-button")
    var anouncementEl = document.getElementById("anoun")
    var anouncementModalEl = document.getElementById("anouncements-outer")
    
    anouncementEl.addEventListener("click",function(event){
        event.preventDefault();
        anouncementModalEl.style.display = "block";
    })
    
    
    
    login_linkEl.addEventListener("click",function(event){
        event.preventDefault();
        
        login_formEl.style.display = "block";
        
    })
    closeanoun_btnEl.addEventListener("click",function(event){
        event.preventDefault();
        anouncementModalEl.style.display="none";
    })
    
    closelog_btnEl.addEventListener("click",function(){
        login_formEl.style.display= "none";
        
    })
    
    registerbuttonEl.addEventListener("click",function(){
        login_formEl.style.display = "none";
        register_formEl.style.display = "block";
    
    })
    
    
    ////////////////////////////////////////////////////
    
    
    closereg_btnEl.addEventListener("click",function(){
        register_formEl.style.display= "none";
        login_formEl.style.display = "block";
    })
})








