// se o tutorial ainda não foi visto, redireciona para ele
if (!localStorage.getItem('tutorialVisto')) {
    window.location.href = 'tutorial.html';
}