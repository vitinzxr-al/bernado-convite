const video = document.getElementById('intro-video');
const music = document.getElementById('background-music');
const musicStatus = document.getElementById('music-status');
let isPlaying = false;

// Volume inicial em 50%
if (music) {
    music.volume = 0.5;
}

// Inicia o vídeo de capa rodando mudo (garante o autoplay no celular)
window.addEventListener('DOMContentLoaded', () => {
    if (musicStatus) musicStatus.textContent = "Tocar";
    isPlaying = false;
    
    if (video) {
        video.muted = true;
        video.play().catch(e => console.log("Autoplay bloqueado pelo navegador:", e));
    }
});

// Pausa o vídeo de capa quando ele terminar sozinho
if (video) {
    video.onended = function() {
        video.pause();
    };
}

// Clicou na tela de capa: vai para o convite e ativa a música
function irParaConvite() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (video) video.pause();

    if (music && !isPlaying) {
        music.play().then(() => {
            if (musicStatus) musicStatus.textContent = "Pausar";
            isPlaying = true;
        }).catch(e => console.log("Erro ao reproduzir áudio:", e));
    }

    if (videoScreen && invitationScreen) {
        videoScreen.classList.add('hidden');
        invitationScreen.classList.remove('hidden');
    }
}

// Clicou em voltar: retorna para o vídeo de capa
function voltarAoVideo() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (invitationScreen) invitationScreen.classList.add('hidden');
    if (videoScreen) {
        videoScreen.classList.remove('hidden');
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    }
}

// Botão Confirmar Presença (WhatsApp)
function confirmarPresenca() {
    const meuNumeroWhatsApp = "5516991500666"; 
    const mensagem = encodeURIComponent("Olá! Confirmo minha presença no aniversário de 2 anos do Bernardo! 🤠🎉");
    window.open(`https://wa.me/${meuNumeroWhatsApp}?text=${mensagem}`, '_blank');
}

// Botão Local da Festa (Google Maps)
function abrirMapa() {
    const endereco = encodeURIComponent("Rua Miguel Barachini, 340 - Parque dos Bandeirantes");
    window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
}

// Função para ligar/desligar a música pelo botão flutuante
function toggleMusica() {
    if (!music) return;
    if (isPlaying) {
        music.pause();
        if (musicStatus) musicStatus.textContent = "Tocar";
        isPlaying = false;
    } else {
        music.play().then(() => {
            if (musicStatus) musicStatus.textContent = "Pausar";
            isPlaying = true;
        }).catch(e => console.log("Erro ao alternar áudio:", e));
    }
}
