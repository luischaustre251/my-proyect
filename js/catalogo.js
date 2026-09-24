// ============================================================
// catalogo.js — Renderizado, filtros y buscador de productos
// ============================================================

import { openModal } from './modal.js';

// Mapa de nombres legibles de categorías
const CAT_NAMES = {
    transmision: "Transmisión",
    rodamientos: "Rodamientos",
    suspension: "Suspensión",
    motor: "Motor",
    bombas: "Bombas"
};

// Estado del catálogo
let productos = [];
let activeCategory = 'todos';
let searchQuery = '';

// Elementos del DOM
let productosContainer, buscarInput, btnClearSearch, filtroBtns, noResults, btnResetFilters;

/**
 * Normalizador: convierte a minúsculas y elimina acentos.
 * Así "piñon" y "piñón" y "PINON" se tratan igual.
 */
function normalizar(texto) {
    if (texto === null || texto === undefined) return '';
    return String(texto)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Renderiza las cards de productos filtrados.
 */
function renderProductos() {
    if (!productosContainer) return;

    productosContainer.style.opacity = '0.3';

    setTimeout(() => {
        productosContainer.innerHTML = '';

        const searchLower = normalizar(searchQuery);

        // Filtramos
        const filtered = productos.filter(prod => {
            const matchesCategory = activeCategory === 'todos' || prod.categoria === activeCategory;

            if (searchLower === '') return matchesCategory;

            const matchesSearch =
                normalizar(prod.nombre).includes(searchLower) ||
                normalizar(prod.codigo).includes(searchLower) ||
                normalizar(prod.descripcion).includes(searchLower) ||
                normalizar(prod.compatibilidad).includes(searchLower);

            return matchesCategory && matchesSearch;
        });

        // Mostrar / ocultar mensaje de "no resultados"
        if (filtered.length === 0) {
            if (noResults) noResults.classList.remove('hidden');
            productosContainer.style.display = 'none';
        } else {
            if (noResults) noResults.classList.add('hidden');
            productosContainer.style.display = 'grid';

            filtered.forEach(prod => {
                const card = document.createElement('article');
                card.className = 'producto-card';
                card.dataset.id = prod.id;

                const readableCategory = CAT_NAMES[prod.categoria] || prod.categoria;

                card.innerHTML = `
                    <div class="card-img-container">
                        <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80'">
                    </div>
                    <div class="card-info">
                        <span class="card-categoria-tag">${readableCategory}</span>
                        <h4>${prod.nombre}</h4>
                        <div class="card-codigo">Código: <span>${prod.codigo}</span></div>
                    </div>
                    <div class="card-footer-btn">Ver Detalles</div>
                `;

                card.addEventListener('click', () => openModal(prod.id));
                productosContainer.appendChild(card);
            });
        }

        productosContainer.style.opacity = '1';
    }, 200);
}

/**
 * Configura los filtros por categoría.
 */
function setupFilters() {
    const categoryItems = document.querySelectorAll('.categoria-item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            activeCategory = btn.dataset.categoria;
            renderProductos();
        });
    });

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const filterVal = item.dataset.filter;

            if (!productosContainer) {
                window.location.href = `catalogo.html?categoria=${filterVal}`;
                return;
            }

            activeCategory = filterVal;
            filtroBtns.forEach(b => {
                if (b.dataset.categoria === filterVal) b.classList.add('activo');
                else b.classList.remove('activo');
            });

            const targetSec = document.getElementById('productos');
            if (targetSec) targetSec.scrollIntoView({ behavior: 'smooth' });

            renderProductos();
        });
    });
}

/**
 * Configura el buscador en tiempo real.
 */
function setupSearch() {
    if (buscarInput) {
        buscarInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;

            if (btnClearSearch) {
                btnClearSearch.style.display = searchQuery.length > 0 ? 'block' : 'none';
            }

            renderProductos();
        });
    }

    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', () => {
            buscarInput.value = '';
            searchQuery = '';
            btnClearSearch.style.display = 'none';
            renderProductos();
            buscarInput.focus();
        });
    }

    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', () => {
            activeCategory = 'todos';
            searchQuery = '';
            if (buscarInput) {
                buscarInput.value = '';
                if (btnClearSearch) btnClearSearch.style.display = 'none';
            }
            filtroBtns.forEach(b => b.classList.remove('activo'));
            if (filtroBtns[0]) filtroBtns[0].classList.add('activo');
            renderProductos();
        });
    }

    // Botón "Buscar" del header
    const headerSearchBtn = document.getElementById('header-search-btn');
    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', () => {
            const targetSec = document.getElementById('productos');
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (buscarInput) buscarInput.focus();
                }, 800);
            } else {
                window.location.href = 'catalogo.html?focusSearch=true';
            }
        });
    }
}

/**
 * Inicializa el catálogo: carga datos, lee parámetros URL, primer render.
 */
export function initCatalogo(productosData) {
    productos = productosData;

    // Cachear elementos del DOM
    productosContainer = document.getElementById('productos-container');
    buscarInput = document.getElementById('buscar-producto');
    btnClearSearch = document.getElementById('btn-clear-search');
    filtroBtns = document.querySelectorAll('.filtro-btn');
    noResults = document.getElementById('no-results');
    btnResetFilters = document.getElementById('btn-reset-filters');

    // Configurar filtros y buscador
    setupFilters();
    setupSearch();

    // Leer parámetros de la URL (categoría, focus search)
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    const hashParam = window.location.hash ? window.location.hash.substring(1) : null;
    const categoryToLoad = catParam || hashParam;

    const validCategories = ['transmision', 'rodamientos', 'suspension', 'motor', 'bombas'];
    if (categoryToLoad && validCategories.includes(categoryToLoad)) {
        activeCategory = categoryToLoad;
        filtroBtns.forEach(b => {
            if (b.dataset.categoria === categoryToLoad) b.classList.add('activo');
            else b.classList.remove('activo');
        });
    }

    // Primer render
    renderProductos();

    // Focus en el buscador si viene por parámetro
    if (params.get('focusSearch') === 'true' && buscarInput) {
        setTimeout(() => {
            buscarInput.focus();
            buscarInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }

    console.log('✅ Productos cargados:', productos.length);
}
