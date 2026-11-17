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

window.addEventListener('DOMContentLoaded', () => {
    if (musicStatus) musicStatus.textContent = "Tocar";
    isPlaying = false;
});

// 1. Assim que o utilizador clica em QUALQUER LUGAR da tela de capa:
function interagirTelaCapa() {
    // Libera e toca a música de fundo
    if (music && !isPlaying) {
        music.play().then(() => {
            if (musicStatus) musicStatus.textContent = "Pausar";
            isPlaying = true;
        }).catch(e => console.log(e));
    }

    // Garante que o vídeo da capa está a reproduzir
    if (video) {
        video.play();
    }
}

// 2. Quando o vídeo da capa CHEGAR AO FIM, transita automaticamente para o convite!
if (video) {
    video.onended = function() {
        irParaConvite();
    };
}

// 3. Função única de transição para o convite do celeiro
function irParaConvite() {
    const videoScreen = document.getElementById('video-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (video) video.pause();

    // Garante que a música toca ao entrar no convite, caso ainda não esteja a tocar
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

// 4. Função para voltar ao vídeo de capa (botão de voltar)
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

// 5. Botão Confirmar Presença (WhatsApp)
function confirmarPresenca() {
    const meuNumeroWhatsApp = "5516991500666";
    const mensagem = encodeURIComponent("Olá! Confirmo minha presença no aniversário de 2 anos do Bernardo! 🤠🎉");
    window.open(`https://wa.me/${meuNumeroWhatsApp}?text=${mensagem}`, '_blank');
}

// 6. Botão Local da Festa (Google Maps)
function abrirMapa() {
    const endereco = encodeURIComponent("Rua Miguel Barachini, 340 - Parque dos Bandeirantes");
    window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
}

// 7. Botão para ligar/desligar a música no topo
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

// 8. Controlo de volume pela barra
function mudarVolume(valor) {
    if (music) {
        music.volume = valor;
    }
}
