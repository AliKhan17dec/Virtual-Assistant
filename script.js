let btn = document.querySelector("#btn")
let content = document.querySelector("#content")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning")
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon")
    } else {
        speak("Good Evening")
    }
}

window.addEventListener('load', () => {
    wishMe()
})

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"

    if (message.includes("hello")|| message.includes("hey") || message.includes("hi") || message.includes("leo")) {
        speak("Hello sir, How can I assist you today?")
    } 
    else if (message.includes("who are you") || message.includes("tell me about yourself") || message.includes("introduce yourself")) {
        speak("I am your virtual assistant, created by Ali")
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak("The time is " + time)
    } 
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" })
        speak("Today's date is " + date)
    } 
    else if (message.includes("open")) {
        let websiteName = message.split("open ")[1].trim()
        if (websiteName) {
            let url = `https://www.${websiteName}.com`
            speak(`Opening ${websiteName}...`)
            window.open(url, "_blank")
        } else {
            speak("Sorry, I didn't catch the website name.")
        }
    } 
    else if (message.includes("weather")) {
        // Placeholder for weather API integration
        let city = message.split("in ")[1] || "your location";
        speak(`Fetching weather information for ${city}...`)
        window.open(`https://www.google.com/search?q=weather+in+${city}`, "_blank")
    }
    else if (message.includes("calculate") || message.includes("math")) {
        let expression = message.replace("calculate", "").replace("math", "").trim()
        try {
            let result = eval(expression)
            speak(`The result of ${expression} is ${result}`)
        } catch (error) {
            speak("I couldn't calculate that. Could you please try again?")
        }
    }
    else {
        // Apply replacements and perform Google search
        let cleanedMessage = message
            .replace("search", "")
            .replace("Leo", "")
            .trim()
        
        if (cleanedMessage) {
            let finalText = "This is what I found on the internet regarding " + cleanedMessage
            speak(finalText)
            window.open(`https://www.google.com/search?q=${cleanedMessage}`, "_blank")
        } else {
            speak("I didn't catch that. Could you please repeat your search?")
        }
    }
}
