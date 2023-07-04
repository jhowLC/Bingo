let bingoStatus = {
    qtdNum: 0,
    bingoStarted: false,
    bingoStack: [],
    bingoStackFixed: [],
    bingoCalledNumbers: []
}
startBingo = function () {
    bingoStatus = {
        qtdNum: 0,
        bingoStarted: false,
        bingoStack: [],
        bingoStackFixed: [],
        bingoCalledNumbers: []
    }
    document.getElementById('ballsContainer').innerHTML = '';
    localStorage.clear();

    bingoStatus.qtdNum = document.getElementById("qtdNum").value;

    for (let i = 0; i < bingoStatus.qtdNum; i++) {
        bingoStatus.bingoStack.push(i + 1);
    }
    bingoStatus.bingoStackFixed = Object.assign([], bingoStatus.bingoStack);
    printBingoBalls();

    document.getElementById('lastCallNumber').innerText = "";

}
showConfig = function () {
    let c = document.getElementById('configContainer').className;
    if (c)
        document.getElementById('configContainer').className = '';
    else
        document.getElementById('configContainer').className = 'hide'
}
printBingoBalls = function () {
    let html = '<div class="ball_block">';
    bingoStatus.bingoStackFixed.map((e, i) => {
        let element = `<div class="bingo_ball" id="ball_${e}"><span>${e}</span></div><br/>`;

        html += element;
        if (e % 10 === 0) {
            html += '</div>';
            document.getElementById('ballsContainer').innerHTML += html;
            html = '<div class="ball_block">';
        }
        // let el = document.createElement('div');
        // el.id = `ball_${e}`;
        // el.innerHTML
    });
    if (html !== '<div class="ball_block">') {
        html += '</div>';
        document.getElementById('ballsContainer').innerHTML += html;
    }
}
callBall = function () {
    bingoStatus.bingoStarted = true;
    console.log(bingoStatus);
    let qtdBalls = bingoStatus.bingoStack.length;
    if (qtdBalls < 1)
        return;
    let calledIndex = Math.round(Math.random() * qtdBalls);
    if (calledIndex === qtdBalls)
        calledIndex--;
    let calledBall = bingoStatus.bingoStack[calledIndex];
    console.log(qtdBalls + ' ' + calledIndex + ' ' + calledBall);
    let bstack = Object.assign([], bingoStatus.bingoStack)
    let bc = Object.assign([], bingoStatus.bingoCalledNumbers);
    bc.push(calledBall);
    bstack.splice(calledIndex, 1);

    try {
        document.getElementById('ball_' + calledBall).className += ' bingo_ball_selected';

    } catch (error) {
        alert('erro');
    } finally {
        bingoStatus.bingoStack = bstack;
        bingoStatus.bingoCalledNumbers = bc;
        document.getElementById('lastCallNumber').innerText = calledBall;
        saveBingo();
    }
}
updateCalledBalls = function () {
    bingoStatus.bingoCalledNumbers.map(e => {
        document.getElementById('ball_' + e).className;
    })
}

saveBingo = function () {
    localStorage.setItem('bingo', JSON.stringify(bingoStatus));
}
checkSavedSession = function () {
    let b = localStorage.getItem('bingo');
    if (!b)
        return;
    bingoStatus = JSON.parse(b);

    printBingoBalls();

    bingoStatus.bingoCalledNumbers.map(e => {
        document.getElementById('ball_' + e).className += ' bingo_ball_selected';
    })

    document.getElementById('lastCallNumber').innerText = bingoStatus.bingoCalledNumbers[bingoStatus.bingoCalledNumbers.length - 1];

}