class obj{ // aqui estamos criando um molde
    quadro = 1
    timer = 0
    constructor(posx,posy,largura,altura,cor){ // função que fabrica o objeto
        this.posx = posx
        this.posy = posy
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenharObj(){
        let img = new Image()
        img.src = this.cor
        colmeia.drawImage(img,this.posx,this.posy,this.largura,this.altura)
    }
        animacao(nomeImagem,limiteQuadro){
        this.timer += 1
        if(this.timer > 10){
            this.timer = 0
            this.quadro += 1
        }
        if(this.quadro > limiteQuadro){
            this.quadro = 1
        }
         this.cor = "img/" + nomeImagem + this.quadro+ ".png"
    }    
}

class ABELHA extends obj{
    dir = 0 // definindo a direção como zero 
    vidas = 3
    pontos = 0
    quadro = 1 // definindo o quadro da animação como 1
    timer = 0 // definindo o timer da animação como 0
    move(){
        this.posx += this.dir
        // incrementando um novo valor na posx da abelha
    }  
      colisao(objeto){
        // 1 se a posição x da abelha for menor que a posição x
        // da aranha no eixo x + largura da aranha
        // 2 se a posição da abelha no eixo x + sua largura for maior que o objeto na posição
        // 3 se a posição do eixo y for menor que a posição da aranha no eixo y + altura da aranha
        // 4 se a posição da abelha no eixo y + sua altura for maior que o objeto na posição y 
        if(this.posx < objeto.posx + objeto.largura && this.posx + this.largura > objeto.posx &&
           this.posy < objeto.posy + objeto.altura && this.posy + this.altura > objeto.posy
        ){
            return true
        }
        else{
            return false
        }
    }
}

class ARANHA extends obj{
    quadro = 1
    timer = 0 
    move(){
        this.posy += 3 // Aranha deverá descer
        if(this.posy > 620){
            this.posy = -100
            this.posx = Math.random() * (500-this.largura)
        }
    }
recarregar(){
    this.posy = -300
    this.posx = Math.random()* (500-this.largura) 
}
}

class BG extends obj{
    move(velocidade,limite,posInicial){
        this.posy +=velocidade
        if(this.posy > limite){
            this.posy = posInicial
        }
    }
}
class FLOR extends ARANHA{
recarregar(){
    this.posy = -350
    this.posx = Math.random()* (500-this.largura) 
}

}

class TEXTO{
    desenharTexto(valor,x,y,cor){
        colmeia.font = "35px Arial black"
        colmeia.fillStyle = cor
        colmeia.fillText(valor, x, y)
    } 
}
