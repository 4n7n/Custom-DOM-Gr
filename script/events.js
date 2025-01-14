// events.js
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

let currentPage = 1;
let totalResults = 0;

searchButton.addEventListener('click', () => {
    currentPage = 1;
    const query = searchInput.value.trim();
    const category = categorySelect.value;
    const sort = sortSelect.value;
    fetchNews(currentPage, query, category, sort).then(data => {
        totalResults = data.totalResults;
        displayNews(data.articles, currentPage);
    });
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        currentPage = 1;
        const query = searchInput.value.trim();
        const category = categorySelect.value;
        const sort = sortSelect.value;
        fetchNews(currentPage, query, category, sort).then(data => {
            totalResults = data.totalResults;
            displayNews(data.articles, currentPage);
        });
    }
});

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        const query = searchInput.value.trim();
        const category = categorySelect.value;
        const sort = sortSelect.value;
        fetchNews(currentPage, query, category, sort).then(data => {
            displayNews(data.articles, currentPage);
        });
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage * 20 < totalResults) {
        currentPage++;
        const query = searchInput.value.trim();
        const category = categorySelect.value;
        const sort = sortSelect.value;
        fetchNews(currentPage, query, category, sort).then(data => {
            displayNews(data.articles, currentPage);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    categorySelect.value = 'general'; // Ajusta la categoría inicial según sea necesario
    fetchNews(currentPage, '', categorySelect.value, sortSelect.value).then(data => {
        totalResults = data.totalResults;
        displayNews(data.articles, currentPage);
    });
});
