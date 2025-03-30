let APP_BODY_ID = "app-body";
let INPUT_TEXT_ID = "text-to-decipher";
let OUTPUT_TEXT_ID = "output-text";
let UNUSED_LETTERS_ID = "unused-letters";

let SCRAMBLE_BUTTON = "scramble-button";
let RESET_MAP_BUTTON = "reset-map-button";
let RESET_INPUT_BUTTON = "reset-input-button";
let COPY_OUTPUT_BUTTON = "copy-output-button";

let LETTERS = "abcdefghijklmnopqrstuvwxyz";
let LETTERS_ALLOWED = LETTERS + "_?";


map_letter = (character) => {

    var out = character
    let map_id = `map-${character}`
    var ele = document.getElementById(map_id)

    if (ele) {
        let element_value = ele.value.toLowerCase()
        if (LETTERS_ALLOWED.includes(element_value)) {
            out = element_value
        }
    }

    return out
}


function fill_blanks() {
    for (letter of LETTERS.split("")) {
        let map_id = `map-${letter}`
        var ele = document.getElementById(map_id)

        if (ele) {
            let element_value = ele.value
            if (element_value == '' || element_value == ' ') {
                console.log("In here!")
                ele.value = '_'
            }
        }
    }
}


function update_unused_letters() {
    var all_used_letters = []
    for (letter of LETTERS.split("")) {
        let map_id = `map-${letter}`
        var ele = document.getElementById(map_id)

        if (ele) {
            let element_value = ele.value.toLowerCase()
            if (LETTERS.includes(element_value)) {
                all_used_letters.push(element_value)
            }
        }
    }
    let used_letters = all_used_letters.join('')

    var unused = []
    for (letter of LETTERS.split("")) {


        var to_push = letter == 'm' ? "<br>" : ""
        to_push += used_letters.includes(letter)
            ? "_"
            : letter.toUpperCase()
        unused.push(to_push)
    }

    document.getElementById(UNUSED_LETTERS_ID).innerHTML = unused.join(',')
}

function decipher() {
    console.log("Starting de-cipher")
    var raw_input_text = document.getElementById(INPUT_TEXT_ID).value
    console.log(raw_input_text)

    fill_blanks()

    let decipher = raw_input_text
        .toLowerCase()
        .split('')
        .map(map_letter)
        .join('')

    var output_element = document.getElementById(OUTPUT_TEXT_ID)
    output_element.innerText = decipher

    update_unused_letters()
}


function printMapping() {
    for (letter of LETTERS.split("")) {
        let map_id = `map-${letter}`
        var ele = document.getElementById(map_id)
        console.log(`${letter} => ${ele.value}`)
    }
}


function resetMapping() {
    console.log("Restting letters")
    for (letter of LETTERS.split("")) {
        let map_id = `map-${letter}`
        var ele = document.getElementById(map_id)

        if (ele) {
            ele.value = '_'
        }
    }
}

function shuffleArray(unshuffled) {
    console.log("Shuffling Array")
    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return shuffled
}

function scramble() {
    console.log("Scrambling Letters")

    let letters = LETTERS.split("")
    let shuffled_letters = shuffleArray(LETTERS.split(""))

    for (let idx = 0; idx < letters.length; idx++) {
        let map_id = `map-${letters[idx]}`
        var ele = document.getElementById(map_id)

        if (ele) {
            ele.value = shuffled_letters[idx]
        }
    }
}

function resetInputText() {
    console.log("Resetting Input")
    document.getElementById(INPUT_TEXT_ID).value = "Copy and paste text to decipher..."
}

function copyOutputText() {
    console.log("Copying Text")
    var copyText = document.getElementById(OUTPUT_TEXT_ID);
    navigator.clipboard.writeText(copyText.value);
    alert("Output text copied: " + copyText.value);
}

document.getElementById(APP_BODY_ID).addEventListener(
    "click", decipher
)

document.getElementById(INPUT_TEXT_ID).addEventListener(
    "change", decipher
)

document.getElementById(SCRAMBLE_BUTTON).addEventListener(
    "click", scramble
)

document.getElementById(RESET_MAP_BUTTON).addEventListener(
    "click", resetMapping
)

document.getElementById(RESET_INPUT_BUTTON).addEventListener(
    "click", resetInputText
)

document.getElementById(COPY_OUTPUT_BUTTON).addEventListener(
    "click", copyOutputText
)


resetInputText()
resetMapping()
decipher()