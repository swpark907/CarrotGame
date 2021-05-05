'use strict';

export default class Yard{
    constructor(imgCount, started){
        this.started = started;
        this.imgCount = imgCount;        
        this.header = document.querySelector('header');
        this.yard = document.querySelector('.yard');
        this.playIcon = document.querySelector('.fa-play');
        this.play = document.querySelector('.header__play-stop');
        this.message = document.querySelector('.message');
        this.message.addEventListener('click', (e) =>{
            this.onclick && this.onclick();
            // this.startGame();
        })
        this.yard.addEventListener('click', (event) =>{
            // this.aonclick(event);
        })
    }

    setClickListner(onClick){
        this.onclick = onClick;        
    }

    iconClick(){        
    }

    createImage(text){
        for(let i = 0; i < this.imgCount; i++){
            let img = document.createElement('img');
            img.classList.add(text);
            img.src = `img/${text}.png`;                
            this.yard.appendChild(img);
            let topMax = this.yard.clientHeight - img.clientHeight;
            let leftMax = this.yard.clientWidth - img.clientWidth;
            let top = Math.random() * topMax;
            let left = Math.random() * leftMax;
            img.style.top = top + 'px';
            img.style.left = left + 'px';
        }
    }

    setImageRandom(){
        this.createImage('bug');    
        this.createImage('carrot');
    }

    startGame(){
        this.header.classList.remove('hide');
        this.yard.innerHTML = '';
        this.setImageRandom();
        this.playIcon.classList.add('fa-stop');
        this.playIcon.classList.remove('fa-play');
    }

    endGame(){
        this.playIcon.classList.remove('fa-stop');
        this.playIcon.classList.add('fa-play');        
    }

    yardOnclick(event){        
        this.play.addEventListener('click', (event) => {
            if(started){
                this.startGame();
            } else{
                this.endGame();            
            }
        })

        this.message.addEventListener('click', (event) => {
            if(started){
                this.startGame();
            } else{
                this.endGame();            
            }
        })

        this.yard.addEventListener('click', (event) => {
            if(started){
                return;
            }               
            if(event.target.className === 'bug'){
                this.endGame();                
            } else if(event.target.className === 'carrot'){            
                event.target.classList.add('hide');
            }
        })
        
    }
}