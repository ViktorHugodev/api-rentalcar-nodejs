
function verificaExtensao(event) {

  var extArquivo = event?.split('.').pop();
  let verifyCond = extPermitidas.includes(extArquivo)
  let extProibida = false
  if (!verifyCond) {
    extProibida = true
    if (extProibida) {
      msgError.parentElement.style.display = 'block'
      msgError.innerText = 'Extensão de arquivo não permitida.'
    }
    alert('Extensão "' + extArquivo + '" não permitida!');
  } else {
    return
  }
}


function deletaExtensao(array) {
  array.forEach((item, index) => {
    let extArquivo = item.innerText.split('.').pop()
    let count = 0
    let verifyCond = extPermitidas.includes(extArquivo)
    console.log('veryfi', verifyCond)
    let extProibida = false
    if (!verifyCond) {
      count++
    } else {
      console.log('dot not del')
      return
    }
   if (count > 0) {
      extProibida = true
      if (extProibida) {
        msgError.parentElement.style.display = 'block'
        msgError.innerText = 'Extensão de arquivo não permitida. '
      } else {
        msgError.parentElement.style.display = 'hidden'
      }
    }

  })
}
    