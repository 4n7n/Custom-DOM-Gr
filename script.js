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

  let url;

  if (query) {
    // Use `/everything` for keyword-based searches
    url = `https://newsapi.org/v2/everything?q=${query}&sortBy=${sort}&page=${currentPage}&apiKey=${apiKey}`;
  } else {
    // Use `/top-headlines` for category-based filtering
    url = `https://newsapi.org/v2/top-headlines?category=${category}&page=${currentPage}&apiKey=${apiKey}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalResults = data.totalResults;
      pageInfo.textContent = `Página ${currentPage}`;
      displayNews(data.articles);
    })
    .catch(error => console.error('Error al obtener noticias:', error));
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        // Verifica si la imagen existe, y usa el placeholder si no es válida.
        const imageUrl = article.urlToImage && article.urlToImage.startsWith('http') 
            ? article.urlToImage 
            : 'assets/placeholder.png';

        const newsItem = document.createElement('article');
        newsItem.innerHTML = `
            <img src="${imageUrl}" alt="Imagen de ${article.title || 'noticia'}" style="width: 100%;">
            <h3>${article.title || 'Título no disponible'}</h3>
            <p>${article.description || 'Sin descripción disponible'}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">Leer más</a>
            <button onclick="addToFavorites('${article.title || 'Título no disponible'}', '${article.url}')">Agregar a Favoritos</button>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function addToFavorites(title, url) {
  const li = document.createElement('li');
  li.innerHTML = `${title} <button onclick="removeFavorite(this)">Eliminar</button>`;
  li.dataset.url = url;
  favoritesList.appendChild(li);
}

function removeFavorite(button) {
  button.parentElement.remove();
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

// Inicializar con categoría "general"
fetchNews();