
const apiKey = '27bc68fc51bd467f9cd356622b3155b0';

function fetchNews(currentPage, query, category, sort) {
    const url = query 
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sort}&page=${currentPage}&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?category=${category}&page=${currentPage}&apiKey=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error en la red');
            return response.json();
        })
        .catch(error => console.error('Error al obtener noticias:', error));
}
