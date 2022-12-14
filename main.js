
//DECLARAMOS LETRAS (ARREGLO TRIDIMENCIONAL)
const keys = [
    [
        ["1", "!"],//primera fila
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
    ],
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"],
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["Ç", "}"],
    ],
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
    ],
    [["SPACE", "SPACE"]],//última fila
];

let mayus = false;//queda activado
let shift = false;//solo funciona una vez
let current = null;//referencia al input
renderKeyboard();

//Función que imprime teclado
function renderKeyboard(){
    //Hacemos referencia al elemento HTML #keyboard (contenedor)
    const keyboardContainer = document.querySelector('#keyboard-container');
    let empty =  `<div class="key-empty"></div>`;//espacios del teclado, no alineado
    
    //map anidados
    //recorrido por cada fila
    const layers = keys.map((layer) => {
        return layer.map(key => {
            if(key[0] === 'SHIFT'){
                return `<button class="key key-shift ${shift ? 'activated' : ''}">${key[0]}</button>`;
            }
            if(key[0] === "MAYUS"){
                return `<button class="key key-mayus ${mayus ? 'activated' : ''}">${key[0]}</button> `;
            }
            if(key[0] === "SPACE"){
                return `<button class="key key-space"></button> `;
            }

            return `
                <button class="key key-normal">
                ${shift
                    ? key[1] 
                    : mayus && 
                      key[0].toLowerCase().charCodeAt(0) >= 97 && 
                      key[0].toLowerCase().charCodeAt(0) <= 122  
                    ? key[1] 
                    : key[0]
                
                }
                </button>
            
            
            `;

        });
    });

    //Ordena teclas
    //mega arreglo
    layers[0].push(empty);//agrega un elemento al último
    layers[1].unshift(empty);//Agrega espacio vacio al inicio

    //htmlLayers es un arreglo de un solo nivel
    const htmlLayers = layers.map((layer) => {
        return layer.join("");//recorre cada layers con los strings
    });

    keyboardContainer.innerHTML = "";

    //una capa de string
    //cada letra tienen su botón
    htmlLayers.forEach((layer) => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;//nueva capa
    });

    //vamos a elegir todos lo botones que sean key
    //cada tecla es variable key
    document.querySelectorAll(".key").forEach((key) => {
        key.addEventListener("click", (e) => {
            if(current){ //si hay un input
                if(key.textContent === 'SHIFT'){
                    shift = !shift;
                   
                }else if(key.textContent === 'MAYUS'){
                    mayus = !mayus;
                   
                }else if(key.textContent === ''){
                    current.value += " ";
                }else{
                    current.value += key.textContent.trim();
                    if(shift){
                        shift = false;
                       
                }
            }

            renderKeyboard();
            current.focus();
        }
        });
    });
}

//REFRENCIA AL ELEMENTO INPUT
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focusin", (e) => { //se activa cuando el input esta seleccionado
        current = e.target;
    });
});

