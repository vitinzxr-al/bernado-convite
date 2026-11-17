const video = document.getElementById('intro-video');

video.onended = function() {
    video.pause();
};

function irParaConvite() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    video.pause();

    videoScreen.style.opacity = '0';
    videoScreen.style.transform = 'scale(1.05)';

    setTimeout(() => {
        videoScreen.style.display = 'none';
        invitationScreen.classList.remove('hidden');
    }, 400);
}

function voltarAoVideo() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    invitationScreen.classList.add('hidden');
    videoScreen.style.display = 'flex';
    
    setTimeout(() => {
        videoScreen.style.opacity = '1';
        videoScreen.style.transform = 'scale(1)';
        video.currentTime = 0;
        video.play();
    }, 50);
}

function confirmarPresenca() {
    const mensagem = encodeURIComponent("Olá! Confirmo minha presença no aniversário de 2 anos do Bernardo! 🤠🎉");
    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
}

function abrirMapa() {
    const endereco = encodeURIComponent("Rua Miguel Barachini, 340 - Parque dos Bandeirantes");
    window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
}