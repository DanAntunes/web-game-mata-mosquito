//Globais
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

//nivel do game
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1500
	criaMosquitoTempo = 1500
} else if(nivel === 'hard') {
	//1000
	criaMosquitoTempo = 1000
} else if(nivel === 'johnwick') {
	//750
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//cronometro win or lose
var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosca)
		window.location.href = 'winner.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1000)

//criando posições randônmicas
function posicaoRandomica() {


	//remover o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3) {

			window.location.href = 'game_over.html'
		} else {
			document.getElementById('v' + vidas).src = "/public/assets/img/coracao_vazio.png"

			vidas++
		}
	}
	//ajustar tamanho do palco do jogo para caber na janela do navegador.
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	//controle operador ternario
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('img')
	mosquito.src = '/public/assets/img/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	//interação 
	mosquito.onclick = function() {
		this.remove()
	}

	document.body.appendChild(mosquito)

}
//função para tamanho randômico do mob
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}
//mudar orientação da imagem lado a/b
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}

