// quando o botão "começar" for clicado, marca o tutorial como visto
document.querySelector('.btn-start').addEventListener('click', function () {
    localStorage.setItem('tutorialVisto', 'true');
});