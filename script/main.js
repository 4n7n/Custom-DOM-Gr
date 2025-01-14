// main.js

// Inicializar Eventos
function initEvents() {
    searchButton.addEventListener('click', () => {
        currentPage = 1;
        fetchNews();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            currentPage = 1;
            fetchNews();
        }
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchNews();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage * 20 < totalResults) {
            currentPage++;
            fetchNews();
        }
    });

    toggleThemeButton.addEventListener('click', toggleTheme);
}

// Llamada inicial
initEvents();
