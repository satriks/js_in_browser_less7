
document.querySelector('#form').addEventListener('submit', upload)

function upload(event) {
    event.preventDefault()
    
    const formData = new FormData(document.querySelector('#form'))
    let xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`);
        document.querySelector('#progress').value = event.loaded/event.total
        console.log(Math.round(document.querySelector('#progress').value * 10000)/100, '%');
    };
    
    xhr.onloadend = function() {
    if (xhr.status == 201) {
        console.log("Успех");
    } else {
        console.log("Ошибка " + this.status);
    }
    };
    
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formData);
}



