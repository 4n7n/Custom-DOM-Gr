// favorites-functions.js

// Funciones de Favoritos
function addToFavorites(title, url) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${title} 
        <button onclick="removeFavorite(this)">Eliminar</button>
        <button onclick="toggleFavoriteDetails(this)">Detalles</button>
        <div class="favorite-details">
            <a href="${url}" target="_blank" rel="noopener noreferrer">Leer más</a>
        </div>
    `;
    li.dataset.url = url;
    favoritesList.appendChild(li);
}

function toggleFavoriteDetails(button) {
    const details = button.nextElementSibling;
    details.style.display = details.style.display === "none" ? "block" : "none";
}

function removeFavorite(button) {
    button.parentElement.remove();
}
