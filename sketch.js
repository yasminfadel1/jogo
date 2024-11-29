// Snake
let canvaW = 400
let canvaH = 400;

// variáveis da snake
let xCobra = 50;
let yCobra = 40;
let wCobra = 10;
let hCobra = 10;

//velocidade da movimentação
let velocidadeMovimentacao = 3;

let direcao = "right";

let partes = 1;
let rabo = [];

posicaoXcomida = randomIntFromInterval(11, canvaW - 37);
posicaoYcomida = randomIntFromInterval(11, canvaH - 37);

 //pontos

let meusPontos = 0;

let colidiu = false;
let comeu = false;

//paredes
let wParED = 10;
let hParED = 400;
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;

//cima / baixo
let wParCB = 400;
let hParCB = 10;
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;

function setup() {
  createCanvas(canvaW, canvaH);
}

function draw() {
  background(200);
  desenhaCobra();
  controleMovimentacao();
  desenhaParedes();
  desenhaComida();
  comer();
  pegarPosicaoAtual();
  colisaoNasParedes();
  incluirPontos();
}


function desenhaCobra(){
  let c = color (0,0,205);
  fill(c);
  rect(xCobra, yCobra, wCobra, hCobra);


  if(rabo.length> 0 ){
  for(var i = 0; i < rabo.length; i++){
  rect(rabo[i][0], rabo[i][1],wCobra, hCobra);
   
  }
   
   
 }




}

function controleMovimentacao(){
 
  if (controleCobra()){
      direcao = controleCobra();
      }
 
   if (direcao == "left"){
    xCobra -= velocidadeMovimentacao;
  }
  if (direcao == "right"){
      xCobra += velocidadeMovimentacao;
      }
  if (direcao == "down"){
      yCobra += velocidadeMovimentacao;
      }
    if (direcao == "up"){
      yCobra -= velocidadeMovimentacao;
      }
}

function controleCobra(){
 
  if(keyIsDown(LEFT_ARROW)){
  return "left";
}
   if(keyIsDown(RIGHT_ARROW)){
  return "right";
}
 
   if(keyIsDown(UP_ARROW)){
  return "up";
}
   if(keyIsDown(DOWN_ARROW)){
  return "down";
}
 
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function desenhaParedes(){
  let Par = color (0,128,0);
  fill (Par);
  rect(posXParE, posYParE, wParED, hParED);
  rect(posXParD, posYParD, wParED, hParED);
  rect(posXParC, posYParC, wParCB, hParCB);
  rect(posXParB, posYParB, wParCB, hParCB);
 
 
}

function desenhaComida(){
  let Par = color (139,0,139);
  fill (Par);
  rect(posicaoXcomida, posicaoYcomida, 10, 10);
 
}

function colisaoComida() {
  var colisaoComida = collideRectRect( posicaoXcomida, posicaoYcomida, 10, 10, xCobra, yCobra, wCobra, hCobra );
  return colisaoComida;
}

function comer() {
  if (colisaoComida()) {
    posicaoXcomida = randomIntFromInterval(11, canvaW - 37);
    posicaoYcomida = randomIntFromInterval(11, canvaH - 37);
    partes += 1
    velocidadeMovimentacao += 0.5
    meusPontos += 1

  }
}

function pegarPosicaoAtual() {
 
  rabo.push([xCobra, yCobra]);
  if (rabo.length > partes) {
    rabo.shift();
  }
}

function colisaoNasParedes() {
  var colisaoDireita = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParD, posYParD, wParED, hParED );
   var colisaoEquerda = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParE, posYParE, wParED, hParED   );    
   var colisaoCima = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParC, posYParC, wParCB, hParCB   );    
   var colisaoBaixo = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParB, posYParB, wParCB, hParCB   );

  if ( colisaoCima == true || colisaoBaixo == true || colisaoDireita == true || colisaoEquerda == true) {
    xCobra = 200;
    yCobra = 200;
    rabo = [];
    partes = 0;
    velocidadeMovimentacao = 3;
    meusPontos = 0;

  }
}

function incluirPontos() {
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text('Meus Pontos: ' + meusPontos, width / 4, 20);
}