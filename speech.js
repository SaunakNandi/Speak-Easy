// Init SpeechSynth API

const synth = window.speechSynthesis

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')
console.log("**** ",textForm)
let voices = []

const getVoices = () => {
    voices = synth.getVoices();
    //console.log(voices)

    // loop through the voices and create an option for each one
    voices.forEach(voice => {
        const option = document.createElement('option')
        //console.log(voice)
        // fill the option with voice name and language
        option.textContent = voice.name + '( ' + voice.lang + ' )'
        
        //set needed option attribute
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        console.log(option)
        voiceSelect.appendChild(option)
        
    })
}

getVoices();
if (synth.onvoiceschanged !== undefined)
{
    synth.onvoiceschanged=getVoices
}

// SPEAK FUNCTION

const speak = () => {

    // Add Annimation
    body.style.background = '#141414 url(image/wave.gif)'
    body.style.backgroundRepeat = 'repeat-x'
    body.style.backgroundSize ='100% 100%'
/*
    // check if speaking
    if (synth.speaking) {
        console.error("Already Speaking....")
        return
    }*/
    if (textInput.value !== '') {
        // Get speech Text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
    
    
        // Speak end
    
        speakText.onend = e => {
            console.log('Done speaking....')
            body.style.background="#141414" /// after speaking ends the background is set back to its normal color
        }

        // SPeak error
    /*    speakText.onerror = e => {
            console.error("Something went wrong")
        }*/

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name")

        // loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice)
                speakText.voice = voice
        })

        // Set pitch and rate
        speakText.rate = rate.value            //SpeechSynthesisUtterance.rate: number
        speakText.pitch = pitch.value       //SpeechSynthesisUtterance.pitch: number
    
        synth.speak(speakText)  // synth.speak to read out the text
    }
}


// Event Listning
// Text form submit
textInput.addEventListener('submit', e => {
    e.preventDefault()
    speak()
    textInput.blur();
})

// Rate value change

rate.addEventListener('change', e => (rateValue.textContent = rate.value))

// Pitch value change

pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value))

//  select speaker option
voiceSelect.addEventListener('change', e => speak())


