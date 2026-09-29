/* ============================================================
   NAVEGAÇÃO ENTRE CÂMERAS KRAS
   Arquivo único: MINI/_navegacao/navegacao.js
   Cada página inclui este script e um contêiner com id
   "kras-navegacao". Para adicionar uma câmera nova, edite
   apenas a lista KRAS_CAMERAS abaixo.
   ============================================================ */

var KRAS_CAMERAS = [
  { pasta: 'MINIE',        nome: 'MiniE' },
  { pasta: 'MINI2 V2',     nome: 'Mini2 V2' },
  { pasta: 'MINI2PLUS V2', nome: 'Mini2 Plus V2' },
  { pasta: 'MINIX',        nome: 'MiniX' },
  { pasta: 'MINI3',        nome: 'Mini3' }
];

(function () {
  function paginaAtual() {
    var partes = window.location.pathname.split('/').filter(function (p) { return p !== ''; });
    if (partes.length && partes[partes.length - 1].indexOf('.') !== -1) {
      partes.pop();
    }
    return partes.length ? decodeURIComponent(partes[partes.length - 1]) : '';
  }

  function linkPara(pasta) {
    return '../' + encodeURIComponent(pasta) + '/index.html';
  }

  function montar() {
    var alvo = document.getElementById('kras-navegacao');
    if (!alvo) return;

    var atual = paginaAtual();
    var indice = -1;
    for (var i = 0; i < KRAS_CAMERAS.length; i++) {
      if (KRAS_CAMERAS[i].pasta === atual) { indice = i; break; }
    }
    if (indice === -1) return;

    var anteriores = KRAS_CAMERAS.slice(0, indice);
    var proximas = KRAS_CAMERAS.slice(indice + 1);
    var html = '<p>Navegue pelas câmeras</p>';

    for (var k = 0; k < anteriores.length; k++) {
      html += '<a class="btn btn-outline btn-lg" href="' + linkPara(anteriores[k].pasta) + '">← CÂMERA ' + anteriores[k].nome + '</a>';
    }
    for (var j = 0; j < proximas.length; j++) {
      html += '<a class="btn btn-primary btn-lg" href="' + linkPara(proximas[j].pasta) + '">IR PARA CÂMERA ' + proximas[j].nome + ' →</a>';
    }

    alvo.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();