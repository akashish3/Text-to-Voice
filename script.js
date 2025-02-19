function convert() {
    const inputText = document.getElementById("inputtext").value;
    const selectedLang = document.getElementById("selectlan").value;
    const utterance = new (window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance)(inputText);
    const synth = window.speechSynthesis || window.webkitSpeechSynthesis;

    // Check if the input text is empty
    if(inputText.trim()===""){
        alert("Type something ");
        return;
    }
    // Check if the selected language is available
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === selectedLang);

    if (voice) {
        utterance.voice = voice;
        utterance.lang = selectedLang;
    } else {
        // Fallback to default voice if the selected language is not available
        utterance.lang = 'en-US';
        alert("The selected language is not supported. Using default language: English.");
    }

   // Check if the browser supports speech synthesis
   if (synth) {
    synth.speak(utterance);
} else {
    alert("Your browser does not support text-to-voice conversion.");
}
}

// Populate voices once they are loaded
(window.speechSynthesis || window.webkitSpeechSynthesis).onvoiceschanged = function() {
    const selectLan = document.getElementById("selectlan");
    const voices = (window.speechSynthesis || window.webkitSpeechSynthesis).getVoices();

    //this will remove all the options from the select
    for (let i = 0; i < selectLan.options.length; i++) {
        const optionValue = selectLan.options[i].value;
        if (!voices.some(voice => voice.lang === optionValue)) {
            selectLan.options[i].disabled = true;
        }
    }
};
