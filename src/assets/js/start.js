function iniciarJogo() {
  const nivel = document.getElementById('nivel').value

  if(nivel === '') {
    alert('Selecione um nível para iniciar o jogo')
    return false
  }

  window.location.href = `game.html?${nivel}`

}