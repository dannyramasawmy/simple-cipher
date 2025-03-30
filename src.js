let APP_BODY_ID = "app-body";
let INPUT_TEXT_ID = "text-to-decipher";
let OUTPUT_TEXT_ID = "output-text";
let UNUSED_LETTERS_ID = "unused-letters";
let SCRAMBLE_BUTTON = "scramble-button";
let RESET_MAP_BUTTON = "reset-map-button";



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
        if (!used_letters.includes(letter)) {
            unused.push(letter)
        }
    }

    document.getElementById(UNUSED_LETTERS_ID).innerText = unused.join(',')
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


function printMapping()
{
    for (letter of LETTERS.split("")) {
        let map_id = `map-${letter}`
        var ele = document.getElementById(map_id)
        console.log(`${letter} => ${ele.value}`)
    }
}


function reset_mapping() {
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
    "click", reset_mapping
)

reset_mapping()
decipher()