'use strict'
window.addEventListener('DOMContentLoaded', () =>{
    const start = document.querySelector('.start'),
          time = document.querySelector('#time-list'),
          board = document.querySelector('.board'),
          screen = document.querySelectorAll('.screen'),
          timer = document.querySelector('#time');
    const color = ['#b41313','#0ce277','#e3167c','e8e7ec','#ffc506'];
    let timerId;
    let timeValue = 10
    let Score = 0;


    function startGame(){
        start.addEventListener('click',(e) =>{
            e.preventDefault()
            screen[0].classList.add('up')
            timeSelect()
        })

    }    


   function timeSelect(){
        time.addEventListener('click',(e) =>{
            if(e.target){
                timeValue = parseInt(e.target.getAttribute('data-time'))
                screen[1].classList.add('up')
                timer.innerHTML = `00:${timeValue}`
                timerId = setInterval(startTimer,1000);
                createCircle()
            }
         
        })
    }


    function startTimer(){
        if(timeValue === 0){
            finish()
        }
        else{
            let current = --timeValue;
            if(current < 10){
                current = `0${current}`               
            }
            timer.innerHTML = `00:${current}`
        }
    }


    function createCircle (){
        const circle = document.createElement('div')
        const size = circleRandomSize(15,28)
        const {width,height} = board.getBoundingClientRect()

        const x = circleRandomSize(0, width - size)
        const y = circleRandomSize(0, height - size)
        const colorRandom = randomColor() 

              circle.classList.add('circle')
              circle.style.background = `${colorRandom}`
              circle.style.top = `${y}px`
              circle.style.left = `${x}px`
              circle.style.height = `${size}px` 
              circle.style.width = `${size}px` 
              board.append(circle)

    }



    board.addEventListener('click', event =>{
        if(event.target.classList.contains('circle')){
            Score++;
            event.target.remove()
            console.log(Score)
            createCircle()
        }
    })






    function circleRandomSize(max,min){
       return  Math.floor(Math.random() * (max - min) + min)
    }


    function randomColor (){
      const index = Math.floor(Math.random() * color.length)
      return color[index];          
    }

    function finish(){
        timer.parentNode.classList.add('hide')
        board.innerHTML = `<h1>Счет: ${Score} </h1>`
        repeatGame()
        console.log('finish')
        clearInterval(timerId)
    }
    startGame()


    function repeatGame(){
        const start = document.createElement('h3');
        start.innerHTML = `Повторить Игру`
        start.classList.add('cursor')
        board.appendChild(start);
        board.lastChild.addEventListener('click', (e)=> {
            if(e){
                screen[1].classList.remove('up')
                start.remove()
                board.lastChild.remove()
                timer.parentNode.classList.remove('hide')
                Score = 0;
            }
        })
    }

})