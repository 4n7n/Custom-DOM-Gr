
const newsContainer = document.getElementById('newsContainer');
const favoritesList = document.getElementById('favoritesList');
const pageInfo = document.getElementById('pageInfo');

function displayNews(articles, currentPage) {
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

    if (filteredArticles.length === 0) {
        newsContainer.innerHTML = '<p>No hay noticias disponibles.</p>';
    }

    pageInfo.textContent = `Página ${currentPage}`;
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
    details.style.display = details.style.display === "none" ? "block" : "none"; // Alterna la visibilidad
}

function removeFavorite(button) {
    button.parentElement.remove();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
