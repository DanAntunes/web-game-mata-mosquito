// game.js - Código unificado

/* Função para iniciar o jogo (originalmente em start.js) */
function iniciarJogo() {
  const nivel = document.getElementById('nivel').value

  if(nivel === '') {
    alert('Selecione um nível para iniciar o jogo')
    return false
  }

  window.location.href = `./src/assets/pages/app.html?${nivel}`
}

/* Lógica principal do jogo (originalmente em script.js + timer.js) */

// Variáveis globais
let altura = 0
let largura = 0
let vidas = 1
let tempo = 15
let criaMosquitoTempo = 1500

// Configurar nível do jogo
const nivelParam = window.location.search.replace('?', '')

switch(nivelParam) {
  case 'normal':
    criaMosquitoTempo = 1500
    break
  case 'hard':
    criaMosquitoTempo = 1000
    break
  case 'johnwick':
    criaMosquitoTempo = 750
    break
}

// Configurar tamanho do palco
function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight
  largura = window.innerWidth
}
ajustaTamanhoPalcoJogo()

// Sistema de tempo e mosquitos
let cronometro = setInterval(() => {
  tempo -= 1
  document.getElementById('cronometro').innerHTML = tempo

  if(tempo < 0) {
    clearInterval(cronometro)
    clearInterval(criaMosca)
    window.location.href = 'winner.html'
  }
}, 1000)

let criaMosca = setInterval(() => {
  posicaoRandomica()
}, criaMosquitoTempo)

// Lógica dos mosquitos
function posicaoRandomica() {
  if(document.getElementById('mosquito')) {
    document.getElementById('mosquito').remove()
    
    if(vidas > 3) {
      window.location.href = 'game_over.html'
    } else {
      document.getElementById(`v${vidas}`).src = "./public/assets/img/coracao_vazio.png"
      vidas++
    }
  }

  const posicaoX = Math.max(Math.floor(Math.random() * largura) - 90, 0)
  const posicaoY = Math.max(Math.floor(Math.random() * altura) - 90, 0)

  const mosquito = document.createElement('img')
  mosquito.src = './public/assets/img/mosquito.png'
  mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`
  mosquito.style.cssText = `left: ${posicaoX}px; top: ${posicaoY}px; position: absolute;`
  mosquito.id = 'mosquito'
  mosquito.onclick = () => mosquito.remove()

  document.body.appendChild(mosquito)
}

// Funções auxiliares
function tamanhoAleatorio() {
  const sizes = ['mosquito1', 'mosquito2', 'mosquito3']
  return sizes[Math.floor(Math.random() * 3)]
}

function ladoAleatorio() {
  return Math.random() < 0.5 ? 'ladoA' : 'ladoB'
}