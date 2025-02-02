function convert(){
    let input=document.getElementById("inputtext").value;
    if(input.trim()===""){
        alert("Type something ");
        return;
    }
    let voice = new SpeechSynthesisUtterance(input);
    window.speechSynthesis.speak(voice);
}
