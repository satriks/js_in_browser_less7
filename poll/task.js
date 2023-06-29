(function () {
    
    fetch('https://students.netoservices.ru/nestjs-backend/poll')
    .then(response => response.json())
    .then( resp => {
        document.querySelector('.poll__title').insertAdjacentHTML('afterbegin', resp.data.title )
        
        for (let answer of resp.data.answers) {
            
            document.querySelector('.poll__answers').insertAdjacentHTML('afterbegin', 
            `<button class="poll__answer">
            ${answer}
            </button>` 
            )}
            document.querySelectorAll('.poll__answer').forEach(el => el.addEventListener('click',(event) => getAnswer(resp, event) ))
            return resp
        })
        
    function  getAnswer(resp, event) {
            alert('Спасибо, ваш голос засчитан!')
            
            fetch(`https://students.netoservices.ru/nestjs-backend/poll`, {
                method: 'POST',
                headers:{'Content-type': 'application/x-www-form-urlencoded'},
                body: `vote=${resp.id}&answer=${resp.data.answers.indexOf(event.target.innerText)}`
            })
            .then(resp => resp.json())
            .then(resp => {
                document.querySelectorAll('.poll__answer').forEach(el => el.remove())
                const sumVote = resp.stat.reduce((acc, cur) => acc + Number(cur.votes), 0)
                for (let j of resp.stat) {
                    document.querySelector('.poll__answers').insertAdjacentHTML('afterbegin', `<div>${j.answer}: <b>${Math.round(Number(j.votes) *100 / sumVote * 100) /100} % <b>` 
                    )}
            })
        }
})()