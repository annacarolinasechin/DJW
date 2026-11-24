class obj{ // molde genérico: tudo que aparece na tela nasce daqui
    quadro = 1 // quadro atual da animação
    timer = 0  // contador para decidir a hora de trocar de quadro
    constructor(posx,posy,largura,altura,cor){
        this.posx = posx
        this.posy = posy
        this.largura = largura
        this.altura = altura
        this.cor = cor // caminho da imagem
    }
    desenharObj(){
        // Melhoria: só cria uma nova Image quando o caminho muda.
        // Antes, uma Image nova era criada a cada 10ms para cada objeto.
        if(this.imgSrc !== this.cor){
            this.img = new Image()
            this.img.src = this.cor
            this.imgSrc = this.cor
        }
        colmeia.drawImage(this.img,this.posx,this.posy,this.largura,this.altura)
    }
    animacao(nomeImagem,limiteQuadro){
        this.timer += 1
        if(this.timer > 10){ // a cada ~10 ciclos troca de quadro
            this.timer = 0
            this.quadro += 1
        }
        if(this.quadro > limiteQuadro){
            this.quadro = 1
        }
        this.cor = "src/img/" + nomeImagem + this.quadro + ".png"
    }
}

class ABELHA extends obj{
    dir = 0    // direção horizontal (negativo = esquerda, positivo = direita)
    vidas = 3
    pontos = 0
    move(){
        this.posx += this.dir
    }
    // Colisão AABB (retângulos): só há colisão se houver sobreposição
    // nos DOIS eixos ao mesmo tempo.
    colisao(objeto){
        if(this.posx < objeto.posx + objeto.largura && this.posx + this.largura > objeto.posx &&
           this.posy < objeto.posy + objeto.altura && this.posy + this.altura > objeto.posy){
            return true
        }
        return false
    }
}

class ARANHA extends obj{
    move(){
        this.posy += 3 // a aranha desce
        if(this.posy > 620){ // saiu da tela: volta ao topo em x aleatório
            this.posy = -100
            this.posx = Math.random() * (500-this.largura)
        }
    }
    recarregar(){ // reposiciona acima da tela depois de uma colisão
        this.posy = -300
        this.posx = Math.random() * (500-this.largura)
    }
}

class BG extends obj{
    move(velocidade,limite,posInicial){
        this.posy += velocidade
        if(this.posy > limite){
            this.posy = posInicial
        }
    }
}

class FLOR extends ARANHA{ // herda o move() da aranha (descer)
    recarregar(){
        this.posy = -350
        this.posx = Math.random() * (500-this.largura)
    }
}

class TEXTO{
    // tamanho é opcional (padrão 35) para reaproveitar a classe no "GAME OVER"
    // alinhamento: "left" (padrão), "center" ou "right" em relação ao x
    desenharTexto(valor,x,y,cor,tamanho = 35,alinhamento = "left"){
        colmeia.font = tamanho + "px Arial black"
        colmeia.fillStyle = cor
        colmeia.textAlign = alinhamento
        colmeia.fillText(valor,x,y)
    }
}