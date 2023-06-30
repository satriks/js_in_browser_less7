
document.addEventListener('DOMContentLoaded', printFromLocalStorage)
fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(ans => {
        const data = ans.response.Valute;
        localStorage.setItem('data', JSON.stringify(data))
        const clearList = document.querySelectorAll('.item')
        if (clearList.length > 0 ){
            clearList.forEach(el => el.remove())
        }
        console.log('load new');
        createValute(data)
    })


function createValute(data) {
    for (const key in data) {
        document.querySelector('#items').insertAdjacentHTML('beforeend',
        `<div class="item">
        <div class="item__code">
        ${data[key].CharCode}
        </div>
        <div class="item__value">
        ${data[key].Value}
        </div>
        <div class="item__currency">
        руб.
        </div>
        </.div>`
        )}
        document.querySelector('#loader').classList.remove('loader_active')
    }
    
    function printFromLocalStorage() {
        const data =JSON.parse(localStorage.getItem('data')) || {}
        if (Object.keys(data).length) {
            console.log('Storage data');
            createValute(data); 
        }          
}
