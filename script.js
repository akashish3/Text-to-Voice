const synth = window.speechSynthesis;
const selectLan = document.getElementById("selectlan");
const inputTextArea = document.getElementById("inputtext");

// 1. Function to populate the dropdown dynamically
function populateVoiceList() {
    const voices = synth.getVoices();
    
    // Clear existing options
    selectLan.innerHTML = '';

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        
        // Use the voice URI or name as the value for better matching
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        selectLan.appendChild(option);
    });
}

// Execute population
populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

// 2. The Conversion Function
function convert() {
    const inputText = inputTextArea.value.trim();
    
    if (!inputText) {
        alert("Please type something first!");
        return;
    }

    // Cancel any current speech to start fresh
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(inputText);
    const selectedOption = selectLan.selectedOptions[0];
    
    // Find the actual voice object based on the selected name
    const voices = synth.getVoices();
    const selectedVoice = voices.find(v => v.name === selectedOption.getAttribute('data-name'));

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Optional: Add event listeners for UX
    utterance.onend = () => console.log("Finished speaking.");
    utterance.onerror = (err) => console.error("Speech error:", err);

    synth.speak(utterance);
}
