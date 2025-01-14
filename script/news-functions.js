// news-functions.js

// Función para obtener noticias
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

// Función para mostrar noticias
function displayNews(articles) {
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
}
