const apiKey = '27bc68fc51bd467f9cd356622b3155b0';
const newsContainer = document.getElementById('newsContainer');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const favoritesList = document.getElementById('favoritesList');
const toggleThemeButton = document.getElementById('toggleTheme');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let totalResults = 0;

searchButton.addEventListener('click', () => {
    currentPage = 1;
    fetchNews();
});

// Agregar evento para la tecla "Enter"
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

function fetchNews() {
    const query = searchInput.value.trim();
    const category = categorySelect.value;
    const sort = sortSelect.value;

    const url = query 
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sort}&page=${currentPage}&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?category=${category}&page=${currentPage}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error en la red');
            return response.json();
        })
        .then(data => {
            totalResults = data.totalResults;
            pageInfo.textContent = `Página ${currentPage}`;
            displayNews(data.articles);
        })
        .catch(error => console.error('Error al obtener noticias:', error));
}

function displayNews(articles) {
    // Filtrar artículos que no tienen imagen o título
    const filteredArticles = articles.filter(article => article.urlToImage && article.title);

    newsContainer.innerHTML = filteredArticles.map(article => {
        const imageUrl = article.urlToImage.startsWith('http') ? article.urlToImage : 'assets/placeholder.png';

        return `
            <article>
                <img src="${imageUrl}" alt="Imagen de ${article.title}" style="width: 100%;">
                <h3>${article.title}</h3>
                <p>${article.description || 'Sin descripción disponible'}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">Leer más</a>
                <button onclick="addToFavorites('${article.title}', '${article.url}')">Agregar a Favoritos</button>
            </article>
        `;
    }).join('');

    // Mensaje si no hay artículos disponibles
    if (filteredArticles.length === 0) {
        newsContainer.innerHTML = '<p>No hay noticias disponibles.</p>';
    }
}

function addToFavorites(title, url) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${title} 
        <button onclick="removeFavorite(this)">Eliminar</button>
        <button onclick="toggleFavoriteDetails(this)">Detalles</button>
        <div class="favorite-details" style="display:none;">
            <a href="${url}" target="_blank" rel="noopener noreferrer">Leer más</a>
        </div>
    `;
    li.dataset.url = url;
    favoritesList.appendChild(li);
}

function toggleFavoriteDetails(button) {
    const details = button.nextElementSibling; // Obtiene el div de detalles
    if (details.style.display === "none") {
        details.style.display = "block"; // Muestra los detalles
    } else {
        details.style.display = "none"; // Oculta los detalles
    }
}

function removeFavorite(button) {
    button.parentElement.remove();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Inicializar con categoría "general"
fetchNews();
