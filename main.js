var btnPlayer = document.getElementsByClassName('btn-player');
var btnBot = document.getElementsByClassName('btn-bot');

var imgPlayer = document.querySelector('.img-player');
var imgBot = document.querySelector('.img-bot');

var playerScore = document.querySelector('.player-score');
var botScore = document.querySelector('.bot-score');

var resultText = document.querySelector('.result-container');

var restartText = document.querySelector('.restart');

function chooseItem(element, item){

    let items = ['rock', 'paper', 'scissors'];

    let randomItem = items[Math.floor(Math.random() * 3)];

    let historyContent = document.querySelector('.history-content');

    let message;

    let intPlayerScore = parseInt(playerScore.innerHTML);
    let intBotScore = parseInt(botScore.innerHTML);

    unselectAll();

    document.querySelector('.' + randomItem + '-2').classList.toggle('selected');

    imgPlayer.src = 'img/' + item + '.png';
    imgBot.src = 'img/' + randomItem + '.png';

    setTimeout(() => {
        imgPlayer.style.transform = 'scale(1.1)';
        imgBot.style.transform = 'scale(1.1)';
    }, 100);

    setTimeout(() => {
        imgPlayer.style.transform = 'scale(1)';
        imgBot.style.transform = 'scale(1)';
    }, 200)

    let [scorePlayer, scoreBot] = play(item, randomItem);

    intPlayerScore += scorePlayer;
    intBotScore += scoreBot;

    playerScore.innerHTML = intPlayerScore.toString();
    botScore.innerHTML = intBotScore.toString();

    if(scorePlayer === 1){
        resultText.innerHTML = 'Vous gagnez la manche !';
    }else if(scoreBot === 1){
        resultText.innerHTML = 'L\'ordinateur gagne la manche !';
    }else{
        resultText.innerHTML = 'Egalité !';
    }

    if(intPlayerScore === 5 || intBotScore === 5){
        if(intPlayerScore > intBotScore){
            message = 'Vous avez gagné ! Souhaitez vous recommencer ?'
            historyContent.innerHTML += '<span>Victoire ('+ playerScore.innerHTML + '-' + botScore.innerHTML +')</span>';
        }else{
            message = 'Vous avez perdu... Souhaitez vous recommencer ?'
            historyContent.innerHTML += '<span>Défaite ('+ playerScore.innerHTML + '-' + botScore.innerHTML +')</span>'
        }
        unselectAll();
        setTimeout(() => {
            if(confirm(message)){
                restart();
            }else{
                for (let i = 0; i < btnPlayer.length; i++) {
                    btnPlayer.item(i).disabled = true;
                }
                restartText.style.display = 'block';
            }
        }, 100);
    }
}

function play(itemPlayer, itemBot){
    if((itemPlayer === 'rock' && itemBot === 'scissors') ||
        (itemPlayer === 'paper' && itemBot === 'rock') ||
        (itemPlayer === 'scissors' && itemBot === 'paper')){

        return [1, 0];

    }else if(itemPlayer === itemBot){
        return [0, 0];
    }else{
        return [0, 1];
    }
}

function restart(){
    resultText.innerHTML = 'Séléctionnez une image pour commencer la partie';
    playerScore.innerHTML = '0';
    botScore.innerHTML = '0';
    imgPlayer.src = 'img/start.png';
    imgBot.src = 'img/start.png';
    restartText.style.display = 'none';
    for (let i = 0; i < btnPlayer.length; i++) {
        btnPlayer.item(i).disabled = false;
    }
}

function unselectAll(){
    for (let i = 0; i < btnBot.length; i++) {
        btnBot.item(i).classList.remove('selected');
    }
}