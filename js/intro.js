// intro.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingBar = document.getElementById('loading-bar');
    const loadingMessage = document.getElementById('loading-message');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-button');
  
    const messages = [
      'Chargement de textures...',
      'Chargement du cache...',
      'Chargement des assets...',
      'Prêt à commencer...'
    ];
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      loadingBar.style.width = `${progress}%`;
      
      if (progress < 100) {
        loadingMessage.textContent = messages[progress / 25];
      } else {
        clearInterval(interval);
        loadingMessage.textContent = '';
        startButton.style.display = 'block'; // Affiche le bouton
        startButton.classList.remove('hidden'); // Assure que la classe 'hidden' est enlevée
        
        // Ajoute un écouteur d'événement pour le clic
        startButton.addEventListener('click', () => {
          loadingScreen.style.opacity = 0;
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.opacity = 1;
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
          }, 500);
        });
      }
    }, 1000);
  });
  