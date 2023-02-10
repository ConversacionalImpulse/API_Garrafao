const data = new Date()

function zeroAEsquerda(num) {
    return num>= 10? num: `0${num}`;
}

function formataData (data){
    const dia = zeroAEsquerda(data.getDate());
    const mes = zeroAEsquerda(data.getMonth()+1);
    const ano = zeroAEsquerda(data.getFullYear());
    return `${dia}/${mes}/${ano}`
}

console.log(formataData(data))