(function () {
      
    const file = document.querySelector('#form')
    let formData = new FormData(file)
    file.addEventListener('submit', (eve) => upload(formData, eve))
    

    function upload(file, eve) {
        eve.preventDefault()
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
        xhr.send(file);
}

})()
