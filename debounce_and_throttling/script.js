const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updatedDebounceText = debounce((text)=>{
    debounceText.textContent = text
}, 1000)

const updatedThrottleText = throttle((text)=>{
    throttleText.textContent = text
})

input.addEventListener("input", e =>{
    defaultText.textContent = e.target.value
    updatedDebounceText(e.target.value)
    updatedThrottleText(e.target.value)
})

// 🔁 1. Debounce
// ✅ Definition:
// Debounce ensures that a function is called only after a specified delay has passed since the last time it was invoked.

// 📦 Use Case:
// Search input

// Resize window

// Auto-save

// 🧠 How it works:
// You wait for the user to stop triggering the event, then run the function.

function debounce(fn, delay = 1000){
    let timeout
    return (...args)=>{
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            fn(...args)
        }, delay)
    }
}

// 🚦 2. Throttle
// ✅ Definition:
// Throttle ensures a function is called at most once in a specified time interval — even if the event is triggered many times.

// 📦 Use Case:
// Scroll handler

// Mouse move

// Button spamming

// 🧠 How it works:
// You allow the function to run once every n milliseconds, ignoring extra calls in between.

function throttle(fn, delay = 1000){
    let shouldWait = false
    let waitingArgs 
    let timeoutFunc = () => {
        if(waitingArgs == null){
            shouldWait = false
        }
        else{
            fn(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args)=>{
        if(shouldWait){
            waitingArgs = args
            return
        }
        fn(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}