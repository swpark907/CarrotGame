'use strict';

import Message from './message.js';
import Yard from './yard.js';
const header = document.querySelector('header');
const yard = document.querySelector('.yard');

const score = document.querySelector('.header__score');
const play = document.querySelector('.header__play-stop');
const playIcon = play.querySelector('.fa-play');
let remainTime = document.querySelector('.header__time');
let imgCount = 5;
let startTime;
let started = true;
let timeCount;

const gameFinishBanner = new Message();
const gameYard = new Yard(imgCount, started);
gameYard.setClickListner(initGame);


function timeGo(){
    timeCount = setInterval(function(){    
        startTime--;
        const minutes = Math.floor(startTime/60);
        const seconds = startTime % 60;
        remainTime.innerHTML = `${minutes<10 ? `0${minutes}` : `${minutes}`}:${seconds<10 ? `0${seconds}` : `${seconds}`}`        
        if(startTime == 0){
            endGame();
            clearInterval(timeCount);
        }
    }, 1000);
}

function winGame(){    
    score.innerHTML--;  
    if(score.innerHTML == 0){        
        gameFinishBanner.showWithText('You Win! <i class="fas fa-redo-alt"></i>')        
        clearInterval(timeCount);
        started = !started;
        playIcon.classList.remove('fa-stop');
        playIcon.classList.add('fa-play');
    }
}

function initTimeCount(){
    startTime = imgCount;    
    const minutes = Math.floor(startTime/60);
    const seconds = startTime % 60;    
    remainTime.innerHTML = `${minutes<10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`
}

function endGame(){    
    gameFinishBanner.showWithText('Retry? <i class="fas fa-redo-alt"></i>');    
    clearInterval(timeCount);
    started = !started;
}

function startGame(){
    initTimeCount();
    score.innerHTML = imgCount;
    gameFinishBanner.hide();
    startTime = imgCount;
    started = !started;
    timeGo();
}

function initGame(){
    gameFinishBanner.setClickListner(() => {
        gameYard.startGame();
        startGame();
        
    })    
    
    play.addEventListener('click', (event) => {        
        if(started){
            // gameYard.startGame();
            gameYard.yardOnclick(event);
            startGame();
                        
        } else{
            gameYard.endGame();
            endGame();
            
        }
    })
    yard.addEventListener('click', (event) => {
        if(started){
            return;
        }               
        if(event.target.className === 'bug'){
            gameYard.endGame();
            endGame(); 
        } else if(event.target.className === 'carrot'){            
            event.target.classList.add('hide');            
            winGame();
        }
    })
    
}

function init(){
    initGame();
};

init();