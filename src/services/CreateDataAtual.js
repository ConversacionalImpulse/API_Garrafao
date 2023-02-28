export function getFormattedDate() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let hora = date.getHours().toString().padStart(2, '0')
    let min = date.getMinutes().toString().padStart(2, '0')
    let seg = date.getSeconds().toString().padStart(2, '0')
    
    return `${day}/${month}/${year}-${hora}:${min}:${seg}`;
}
