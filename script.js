const video = document.getElementById('intro-video');
const music = document.getElementById('background-music');
const musicStatus = document.getElementById('music-status');
const volumeSlider = document.getElementById('volume-slider');
let isPlaying = true;

// Volume inicial em 50%
if (music) {
    music.volume = 0.5;
    if (volumeSlider) volumeSlider.value = 0.5;
}

// Tenta iniciar a música ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    if (music) {
        music.play().then(() => {
            if (musicStatus) musicStatus.textContent = "Pausar";
            isPlaying = true;
        }).catch(e => {
            console.log("Autoplay bloqueado aguardando clique.");
            if (musicStatus) musicStatus.textContent = "Tocar";
            isPlaying = false;
        });
    }
});

// Função para ligar/desligar a música pelo botão
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
        });
    }
}

// Função para controlar o volume pela barrinha
function mudarVolume(valor) {
    if (music) {
        music.volume = valor;
    }
}

// Configuração do vídeo de introdução
if (video) {
    video.onended = function() {
        video.pause();
    };
}

// Clicou no vídeo de capa: abre o convite e garante a música
function irParaConvite() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (video) video.pause();

    if (music && !isPlaying) {
        music.play().then(() => {
            if (musicStatus) musicStatus.textContent = "Pausar";
            isPlaying = true;
        }).catch(e => console.log(e));
    }

    if (videoScreen && invitationScreen) {
        videoScreen.style.opacity = '0';
        videoScreen.style.transform = 'scale(1.05)';

        setTimeout(() => {
            videoScreen.style.display = 'none';
            invitationScreen.classList.remove('hidden');
        }, 400);
    }
}

// Clicou em voltar: retorna para o vídeo de capa
function voltarAoVideo() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (invitationScreen) invitationScreen.classList.add('hidden');
    if (videoScreen) {
        videoScreen.style.display = 'flex';
        
        setTimeout(() => {
            videoScreen.style.opacity = '1';
            videoScreen.style.transform = 'scale(1)';
            if (video) {
                video.currentTime = 0;
                video.play();
            }
        }, 50);
    }
}

// Botão Confirmar Presença (WhatsApp)
function confirmarPresenca() {
    const meuNumeroWhatsApp = "5511999999999"; // <-- Lembre de colocar seu número aqui com DDI e DDD
    const mensagem = encodeURIComponent("Olá! Confirmo minha presença no aniversário de 2 anos do Bernardo! 🤠🎉");
    window.open(`https://wa.me/${meuNumeroWhatsApp}?text=${mensagem}`, '_blank');
}

// Botão Local da Festa (Google Maps)
function abrirMapa() {
    const endereco = encodeURIComponent("Rua Miguel Barachini, 340 - Parque dos Bandeirantes");
    window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
}
