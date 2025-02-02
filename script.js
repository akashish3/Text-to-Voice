function convert(){
    let input=document.getElementById("inputtext").value;
    if(input.trim()===""){
        alert("Type something ");
    }
    let voice = new SpeechSynthesisUtterance(input);
    window.speechSynthesis.speak(voice);
}
