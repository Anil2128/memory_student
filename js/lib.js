const group = (css)=> document.querySelectorAll(css);
const el = (css) => document.querySelector(css);
const create = (html) => document.createElement(html);


const arr = [
    1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8
];


function mixArr(array){
    const copy = [...array];
    const mixedArr = [];
    // for Schleife durchläuft das ganze Array
    // per Zufall wird ein Wert gewählt
    // dieser Wert wird in das Array mixedArr eingefügt
    // dieser Wert wird in der "copy" gelöscht

    const le = copy.length;
    for (let i = 0;i < le;i++){
        // zufälliger Index
        const index = Math.floor(Math.random() * copy.length);
        // Wert einfügen + Wert in copy löschen
        const val = copy.splice(index,1)[0];
        // Wert in das Array mixedArr speichern
        mixedArr.push(val); 
    }
    return mixedArr;
}
