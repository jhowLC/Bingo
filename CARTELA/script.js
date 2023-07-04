let cartelaStatus = {cartela: [[],[],[],[],[]], selectedNumbers:[]};
function init(){
    let b = localStorage.getItem('bingo-cartela');

    if (b)
    {
        cartelaStatus = JSON.parse(b);
    }else{
        gerarCartela();
    }


    printCartela(cartelaStatus.cartela);
    printIcon();
    
    if(cartelaStatus.selectedNumbers.length > 0){
        let numbers = Object.assign([], cartelaStatus.selectedNumbers);
        cartelaStatus.selectedNumbers = [];
        numbers.map(e=> markUnmarkNumber(e, true));
    }
    saveBingo()
}

function newCart(){
    if (!confirm('Tem certeza que deseja gerar nova cartela?')) 
        return;
        
    cartelaStatus = {cartela: [[],[],[],[],[]], selectedNumbers:[]};
    localStorage.removeItem('bingo-cartela');
    init();
}

saveBingo = function () {
    localStorage.setItem('bingo-cartela', JSON.stringify(cartelaStatus));
}

function gerarCartela(){
    let qtdNum = 75
    let stack = [];
    cartelaStatus.cartela = [[],[],[],[],[]];
    //primeira coluna só pode ir até numero 15, segunda do 16 ao 29 e assim por diante
    let regraDaColuna = [
        15, 29, 45, 59, 75  
    ]

    for (let i = 0; i < qtdNum; i++) {
        stack.push(i + 1);
    }
    let qtdInserted = 0;
    for (let i = 0; i < qtdNum; i++) {
        if(qtdInserted >= 25)
            break;

        let qtdBalls = stack.length;
        if (qtdBalls < 1)
            return;
        let calledIndex = Math.round(Math.random() * qtdBalls);
        if (calledIndex === qtdBalls)
            calledIndex--;
        let calledBall = stack[calledIndex];

        stack.splice(calledIndex, 1);

        for(j=0;j<regraDaColuna.length; j++){
            if(calledBall > regraDaColuna[j])
                continue;
            
            if(cartelaStatus.cartela[j].length > 4)
                break;
            
            cartelaStatus.cartela[j].push(calledBall);
            qtdInserted++
            break;
        }
    }
    // console.log(cartelaStatus.cartela);
    return cartelaStatus.cartela;
}

function printCartela(cartela){
    if(!cartela)
        return;
    let cartelaTxt = '';
    for(let i=0; i<5; i++){
        cartelaTxt += '<tr>';
        for(let j=0; j<5; j++){
            cartelaTxt += `<td onclick="markUnmarkNumber('pos_${i}${j}')" id="pos_${i}${j}" class="numero_${cartela[j][i]}"><spam>${cartela[j][i]}</spam></td>`
        }
        cartelaTxt += '</tr>';
    }
    document.getElementById("corpo-cartela").innerHTML = cartelaTxt;
}

function printIcon(){
    // document.getElementById("pos_22").innerHTML = (`<img src="logov1-300x300.png">`);
    document.getElementById("pos_22").innerHTML = (`<spam></spam>`);
    // document.getElementById("pos_22").innerHTML = (``)
}

function markUnmarkNumber(number, noSave){
    let idx = cartelaStatus.selectedNumbers.indexOf(number);
    if(idx === -1){
        document.getElementById(number).className += ' bingo_number_selected';
        cartelaStatus.selectedNumbers.push(number);
    }
    else{
        cartelaStatus.selectedNumbers.splice(idx, 1);
        document.getElementById(number).className = document.getElementById(number).className.replace(' bingo_number_selected');
    }
    if(!noSave)
        saveBingo();
}
