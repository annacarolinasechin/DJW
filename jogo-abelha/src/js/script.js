let colmeia = document.getElementById("palco").getContext("2d")

/*
let abelha = new obj(50, 100, 30, 30, "abelha.png")
let aranha = new obj(200, 150, 40, 40, "aranha.png")
*/

let bg = new BG(0,0,500,620,"img/bg.png")
let bg2 = new BG(0,-620,500,620,"img/bg.png")
let flor = new FLOR(0,0,50,50, "img/flower1.png")
let abelha = new ABELHA(200,500,100,100,"img/bee1.png")
let aranha = new ARANHA(100,100,100,100,"img/spider1.png")
let TextoTela = new TEXTO()
let TextoVidas = new TEXTO()
let jogar = true

document.addEventListener("keydown",function(e){
    if(e.key == "a"){
        abelha.dir = -4
        // atribuindo um novo valor para direção da abelha
    }

    if(e.key == "d"){
        abelha.dir = 4
        // atribuindo um novo valor para direção da abelha
    }
})

document.addEventListener("keyup",function(e){
    if(e.key == "a"){
        abelha.dir = 0
    }

    if(e.key == "d"){
        abelha.dir = 0
    }
}
)

function colisoes(){
    //se for verdade que ocorreu uma colisão com objeto aranha
    if(abelha.colisao(aranha)){
        aranha.recarregar()
        abelha.vidas -= 1
    }
    if(abelha.colisao(flor)){
        flor.recarregar()
        abelha.pontos += 2
    }
}
function gameOver(){
if(abelha.vidas <= 0){
    jogar = false
}

}

function draw(){ // responsável por desenhar elementos na tela
    bg.desenharObj()
    bg2.desenharObj()
    if (jogar){
    abelha.desenharObj()
    aranha.desenharObj()  
    flor.desenharObj()
    TextoTela.desenharTexto(abelha.pontos,0,280,50,"white")
    TextoVidas.desenharTexto(abelha.vidas,3,140,50,"white")
}
}

function update(){ //responsável por atualizar os quadros do jogo
    bg.move(3,620,0)
    bg2.move(3,0,-620)  
    if (jogar){
    abelha.move()
    abelha.animacao("bee",4)
    abelha.colisao(aranha)
    aranha.move()
    aranha.animacao("spider",4)
    flor.move()
    flor.animacao("flower",2) 
    colisoes()
    gameOver()
    }   
}

function main(){
    colmeia.clearRect(0,0,500,620)
    update()
    draw()
}   

setInterval(main,10)