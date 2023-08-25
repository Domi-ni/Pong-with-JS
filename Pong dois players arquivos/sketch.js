//variaveis de ambiente
let larguraTela = 600;
let alturaTela = 400;

//sons
let raquetada;
let ponto;

//variaveis de placar
let pontosPlayer = 0;
let pontosOponente = 0;

//definiçoes da bolinha
let xBolinha = larguraTela/2;
let yBolinha = alturaTela/2;
let diametroBolinha = 23;
let raioBolinha = diametroBolinha/2;
let esquerdaBolinha = xBolinha - raioBolinha;
let direitaBolinha = xBolinha + raioBolinha;
let superiorBolinha = yBolinha - raioBolinha;
let inferiorBolinha = yBolinha + raioBolinha;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//definiçoes raquete player
let xRaquete = 5;
let yRaquete = 150;

//definiçoes raquete oponente
let xRaqueteOponente = larguraTela - 15;
let yRaqueteOponente = 150;

//definiçoes geral raquetes
let comprimentoRaquete = 9;
let alturaRaquete = 90;
let direitaRaquete = xRaquete + comprimentoRaquete;
let superiorRaquete = yRaquete;
let inferiorRaquete = yRaquete + alturaRaquete;

//movimento raquete oponente
let velocidadeYRaqueteOponente;

//movimento raquete player
let movimentoYRaquete = 10;

let colidiu = false;

function preload()
  {
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
  }


function setup(){
  createCanvas(larguraTela, alturaTela);
  }

function draw() {
  background(0);
  desenharBolinha();
  desenharRaquete(xRaquete, yRaquete);
  desenharRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoBolinha();
  colisaoBordas();  
  movimentoRaquetePlayer();
  movimentoRaqueteOponente();
  //colisaoRaquetePlayer();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraPlacar();
  pontos();
  bolinhaNaoFicaPresa();
  }



function desenharBolinha()
  {
   circle (xBolinha, yBolinha, diametroBolinha);
  }


function movimentoBolinha() 
  {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  }


function colisaoBordas() {
  if(xBolinha > width - raioBolinha || xBolinha <= raioBolinha) 
      velocidadeXBolinha *= -1;
  
  if(yBolinha > height - raioBolinha || yBolinha <= raioBolinha) 
      velocidadeYBolinha *= -1;
  }  
  

function desenharRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
  }  
  

function movimentoRaquetePlayer() 
  {
    if (keyIsDown(87))
      {
        yRaquete -= movimentoYRaquete;
      }
    
    if (keyIsDown(83))
      {
        yRaquete += movimentoYRaquete;
      }
    yRaquete = constrain(yRaquete, 10, 310);
  }


function colisaoRaquetePlayer() 
  {
    if(xBolinha - raioBolinha < direitaRaquete && yBolinha - raioBolinha > superiorRaquete && yBolinha + raioBolinha < yRaquete + alturaRaquete);
        velocidadeXBolinha *= -1;
        raquetada.play();

  }


function colisaoRaqueteBiblioteca(x, y)
  {
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha,  raioBolinha)
    
    if(colidiu){
      velocidadeXBolinha *= -1;
      raquetada.play();
    }
  }


function movimentoRaqueteOponente()
  {
    if (keyIsDown(UP_ARROW))
      {
        yRaqueteOponente -= movimentoYRaquete;
      }
    
    if (keyIsDown(DOWN_ARROW))
      {
        yRaqueteOponente += movimentoYRaquete;
      }
   
   yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
  }


function mostraPlacar()
  {
    stroke (255);
    textSize(15)
    textAlign(CENTER)
    fill(color(250,140,0))
    rect(220,5,40,20)
    fill(255)
    text(pontosPlayer,240,20);
    fill(color(250,140,0))
    rect(340,5,40,20)
    fill(255)
    text(pontosOponente,360,20);
  }

function pontos()
  {
    if(xBolinha < 11)
      {
        pontosOponente = pontosOponente + 1;
        ponto.play();
      }
    
    if(xBolinha > 589)
      {
        pontosPlayer = pontosPlayer + 1;
        ponto.play(); 
      }  
  }

function bolinhaNaoFicaPresa()
  {
    if (xBolinha - raioBolinha < 0)
      {
        xBolinha = 23;
      }
    if (xBolinha + raioBolinha > 598)
      {
        xBolinha = 570
      }
  }