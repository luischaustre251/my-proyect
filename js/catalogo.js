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
let productosContainer, buscarInput, btnClearSearch, filtroBtns, noResults, btnResetFilters, contadorEl;

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
 * Renderiza la lista de productos filtrados.
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

        // Actualizar contador informativo
        if (contadorEl) {
            const total = filtered.length;
            const plural = total === 1 ? '' : 's';
            const catLabel = activeCategory === 'todos' ? 'repuesto' + plural : (CAT_NAMES[activeCategory] || activeCategory);
            contadorEl.textContent = `Mostrando ${total} ${catLabel}${searchLower ? ` para "${searchQuery}"` : ''}`;
        }

        // Mostrar / ocultar mensaje de "no resultados"
        if (filtered.length === 0) {
            if (noResults) noResults.classList.remove('hidden');
            productosContainer.style.display = 'none';
        } else {
            if (noResults) noResults.classList.add('hidden');
            productosContainer.style.display = 'flex';

            filtered.forEach(prod => {
                const fila = document.createElement('article');
                fila.className = 'producto-fila';
                fila.dataset.id = prod.id;
                fila.setAttribute('tabindex', '0');
                fila.setAttribute('role', 'button');
                fila.setAttribute('aria-label', `Ver detalles de ${prod.nombre}`);

                const readableCategory = CAT_NAMES[prod.categoria] || prod.categoria;
                const tieneImagen = prod.imagen && typeof prod.imagen === 'string' && prod.imagen.trim().length > 0;

                const imagenHTML = tieneImagen
                    ? `<div class="fila-imagen">
                        <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="sin-imagen" style="display: none;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                            <span>Sin foto</span>
                        </div>
                    </div>`
                    : `<div class="fila-imagen">
                        <div class="sin-imagen">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                            <span>Sin foto</span>
                        </div>
                    </div>`;

                fila.innerHTML = `
                    ${imagenHTML}
                    <div class="fila-info">
                        <div class="fila-meta">
                            <span class="tag-categoria">${readableCategory}</span>
                            <span class="tag-codigo">Cód: <strong>${prod.codigo}</strong></span>
                        </div>
                        <h3 class="fila-nombre">${prod.nombre}</h3>
                        ${prod.descripcion ? `<p class="fila-descripcion">${prod.descripcion}</p>` : ''}
                        ${prod.compatibilidad ? `<div class="fila-compatibilidad"><strong>Compatibilidad:</strong> ${prod.compatibilidad}</div>` : ''}
                    </div>
                    <div class="fila-acciones">
                        <span class="btn-ver-detalles">
                            Ver Detalles
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </div>
                `;

                fila.addEventListener('click', () => openModal(prod.id));
                fila.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(prod.id);
                    }
                });

                productosContainer.appendChild(fila);
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
    contadorEl = document.getElementById('catalogo-contador');

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
