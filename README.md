# Gestor de Noticias

Aplicación web moderna para navegar, buscar y gestionar artículos de noticias con una interfaz responsive y soporte para modo oscuro.

## Características

- Búsqueda de noticias por palabras clave o país
- Filtrado por categorías (General, Tecnología, Deportes, Negocios, Salud)
- Ordenamiento por fecha, popularidad o relevancia
- Guardado de artículos favoritos
- Cambio entre tema claro/oscuro
- Diseño responsive con grid
- Sistema de paginación

## Stack Tecnológico

- HTML5
- CSS3 (con características modernas como Grid, Flexbox)
- JavaScript Vanilla
- NewsAPI para el contenido

## Estructura del Proyecto

```
├── index.html
├── styles/
│   ├── components.css
│   ├── dark-mode.css
│   ├── general.css
│   └── layout.css
└── script/
    ├── api.js
    ├── events.js
    └── ui.js
```

## Instalación

1. Clonar el repositorio
2. Reemplazar `apiKey` en `api.js` con tu clave de NewsAPI
3. Abrir `index.html` en un navegador moderno

## Configuración de API

La aplicación utiliza NewsAPI. Obtén tu clave API en [NewsAPI.org](https://newsapi.org).

## Compatibilidad con Navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Cómo Contribuir

1. Hacer fork del repositorio
2. Crear una rama para la nueva funcionalidad
3. Enviar pull request

## Licencia

Licencia MIT