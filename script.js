const video = document.getElementById('intro-video');
const music = document.getElementById('background-music');
const musicStatus = document.getElementById('music-status');
const volumeSlider = document.getElementById('volume-slider');
let isPlaying = false;

// Volume inicial em 50%
if (music) {
    music.volume = 0.5;
    if (volumeSlider) volumeSlider.value = 0.5;
}

// Garante que o vídeo de capa tente rodar mudo assim que carregar
window.addEventListener('DOMContentLoaded', () => {
    if (musicStatus) musicStatus.textContent = "Tocar";
    isPlaying = false;
    
    if (video) {
        video.muted = true; // Necessário para autoplay em alguns mobile
        video.play().catch(e => console.log("Autoplay do vídeo bloqueado:", e));
    }
});

// Quando o vídeo de capa terminar, ele pode pausar ou reiniciar
if (video) {
    video.onended = function() {
        video.pause();
    };
}

// Clicou no botão invisível de abrir o convite
function irParaConvite() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    // Pausa o vídeo de capa
    if (video) video.pause();

    // Dispara a música de fundo do convite com segurança
    if (music && !isPlaying) {
        music.play().then(() => {
            if (musicStatus) musicStatus.textContent = "Pausar";
            isPlaying = true;
        }).catch(e => console.log("Erro ao reproduzir áudio:", e));
    }

    // Faz a transição suave para a tela do convite
    if (videoScreen && invitationScreen) {
        videoScreen.style.opacity = '0';
        videoScreen.style.transform = 'scale(1.05)';

        setTimeout(() => {
            videoScreen.style.display = 'none';
            invitationScreen.classList.remove('hidden');
        }, 400);
    }
}

// Clicou em voltar: retorna para o vídeo de capa reiniciando do zero
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
    const meuNumeroWhatsApp = "5516991500666"; 
    const mensagem = encodeURIComponent("Olá! Confirmo minha presença no aniversário de 2 anos do Bernardo! 🤠🎉");
    window.open(`https://wa.me/${meuNumeroWhatsApp}?text=${mensagem}`, '_blank');
}

// Botão Local da Festa (Google Maps)
function abrirMapa() {
    const endereco = encodeURIComponent("Rua Miguel Barachini, 340 - Parque dos Bandeirantes");
    window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
}

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
        }).catch(e => console.log("Erro ao alternar áudio:", e));
    }
}

// Configuração da barra deslizante de volume
function mudarVolume(valor) {
    if (music) {
        music.volume = valor;
    }
}
