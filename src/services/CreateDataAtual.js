export function getFormattedDate() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    console.log(`${day}/${month}/${year}`)
    return `${day}/${month}/${year}`;
}

getFormattedDate()