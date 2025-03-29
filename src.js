let INPUT_TEXT_ID = "text-to-decipher";
let OUTPUT_TEXT_ID = "output-text";
let UNUSED_LETTERS_ID = "unused-letters";
let LETTERS = "abcdefghijklmnopqrstuvwxyz";
let LETTERS_ALLOWED = LETTERS + "_?";

map_letter = (character) => {
    
    var out = character
    let map_id = `map-${character}`  
    var ele = document.getElementById(map_id)
    
    if (ele)
    {
        let element_value = ele.value.toLowerCase()
        if (LETTERS_ALLOWED.includes(element_value))
        {
            out = element_value       
        }
    }

    return out
}


function update_unused_letters()
{
    var all_used_letters = []
    for (letter of LETTERS.split(""))
    {
        let map_id = `map-${letter}`         
        var ele = document.getElementById(map_id)
        
        if (ele)
            {
                let element_value = ele.value.toLowerCase()
                if (LETTERS.includes(element_value))
                    {
                all_used_letters.push(element_value)       
            }
        }
    }   
    let used_letters = all_used_letters.join('')

    var unused = []
    for (letter of LETTERS.split(""))
    {
        if (!used_letters.includes(letter))
        {
            unused.push(letter)
        }
    }
    
    document.getElementById(UNUSED_LETTERS_ID).innerText = unused.join(',')
}

function decipher()
{
    console.log("Starting de-cipher")
    var raw_input_text = document.getElementById(INPUT_TEXT_ID).value
    console.log(raw_input_text)

    let decipher = raw_input_text
        .toLowerCase()
        .split('')
        .map(map_letter)
        .join('')

    // debug
    for (letter of LETTERS.split(""))
    {
        let map_id = `map-${letter}`         
        var ele = document.getElementById(map_id)
        console.log(`${letter} => ${ele.value}`)
    }

    var output_element = document.getElementById(OUTPUT_TEXT_ID)
    output_element.innerText = decipher

    update_unused_letters()
}


document.getElementById("the-app").addEventListener(
    "click", decipher
)
document.getElementById("text-to-decipher").addEventListener(
    "change", decipher
)
decipher()