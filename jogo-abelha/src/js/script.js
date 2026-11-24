let colmeia = document.getElementById("palco").getContext("2d")

// Fundo (dois backgrounds empilhados para criar o efeito infinito)
let bg  = new BG(0,0,500,620,"src/img/bg.png")
let bg2 = new BG(0,-620,500,620,"src/img/bg.png")

let flor   = new FLOR(0,0,50,50,"src/img/flower1.png")
let abelha = new ABELHA(200,500,100,100,"src/img/bee1.png")
let aranha = new ARANHA(100,100,100,100,"src/img/spider1.png")

let TextoTela  = new TEXTO() // pontos
let TextoVidas = new TEXTO() // vidas
let gameover   = new TEXTO() // Aula 25/11: texto de fim de jogo
                             // (minúsculo = variável; gameOver() = função)

let jogar = true // true enquanto o jogador ainda tem vidas

// Aula 25/11: botão HTML que fica por cima do canvas
let botao = document.getElementById("reiniciar")
botao.addEventListener("click",function(){
    location.reload() // recarrega a página e reinicia o jogo
})

document.addEventListener("keydown",function(e){
    if(e.key == "a"){ abelha.dir = -4 } // esquerda
    if(e.key == "d"){ abelha.dir = 4 }  // direita
})

document.addEventListener("keyup",function(e){
    // Melhoria: só para se soltou a tecla da direção atual.
    // Evita a abelha travar ao soltar "a" enquanto "d" ainda está pressionada.
    if((e.key == "a" && abelha.dir < 0) || (e.key == "d" && abelha.dir > 0)){
        abelha.dir = 0
    }
})

function colisoes(){
    if(abelha.colisao(aranha)){ // bateu na aranha: perde vida
        aranha.recarregar()
        abelha.vidas -= 1
    }
    if(abelha.colisao(flor)){   // pegou a flor: ganha 2 pontos
        flor.recarregar()
        abelha.pontos += 2
    }
}

function gameOver(){
    if(abelha.vidas <= 0){
        jogar = false
        botao.style.display = "block" // Aula 25/11: mostra o botão de reiniciar
    }
}

function draw(){ // desenha tudo na tela
    // o fundo fica fora do if para continuar aparecendo no game over
    bg.desenharObj()
    bg2.desenharObj()
    if(jogar){
        abelha.desenharObj()
        aranha.desenharObj()
        flor.desenharObj()
        TextoTela.desenharTexto(abelha.pontos,10,40,"#3b3b3b")
        TextoVidas.desenharTexto(abelha.vidas,460,40,"#3b3b3b")
    }
    else{
        // Aula 25/11: tela de game over
        gameover.desenharTexto("GAME OVER",250,320,"#3b3b3b",60,"center")
        gameover.desenharTexto("Pontos: " + abelha.pontos,250,370,"#3b3b3b",35,"center")
    }
}

function update(){ // atualiza a lógica a cada quadro
    bg.move(3,620,0)
    bg2.move(3,0,-620)
    if(jogar){
        abelha.move()
        abelha.animacao("bee",4)
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

setInterval(main,10) // roda a cada 10 ms