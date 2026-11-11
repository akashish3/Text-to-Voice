const synth = window.speechSynthesis;
const selectLan = document.getElementById("selectlan");
const inputTextArea = document.getElementById("inputtext");

function populateVoiceList() {
    const voices = synth.getVoices();
    const previousSelection = selectLan.value;
    selectLan.innerHTML = '';

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.voiceURI;
        
        if (voice.default) {
            option.textContent += ' — DEFAULT';
        }
        selectLan.appendChild(option);
    });

    if (previousSelection) {
        selectLan.value = previousSelection;
    }
}

populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

function convert() {
    const inputText = inputTextArea.value.trim();
    if (!inputText) {
        alert("Please type something first!");
        return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(inputText);
    const selectedURI = selectLan.value;
    const selectedVoice = synth.getVoices().find(v => v.voiceURI === selectedURI);

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.onend = () => console.log("Finished speaking.");
    utterance.onerror = (err) => console.error("Speech error:", err);

    synth.speak(utterance);
}
