'use strict';

export default class Message{
    constructor(){
        this.message = document.querySelector('.message');
        this.wrap = document.querySelectorAll('.wrap');
        this.message.addEventListener('click', () => {
            this.onclick && this.onclick();
            this.hide();
        });
    }

    setClickListner(onClick){
        this.onclick = onClick;        
    }

    showWithText(text) {
        this.message.innerHTML = text;
        this.message.classList.remove('hide');        
    }

    hide(){
        this.message.classList.add('hide');
    }
}