import { abrirModal } from './modal.js';
import { NOMBRES_CATEGORIAS } from './datos.js';

// Estado del catálogo
let productos = [];
let categoriaActiva = 'todos';
let consultaBusqueda = '';

// Elementos del DOM
let productosContenedor, entradaBusqueda, botonLimpiarBusqueda, botonesFiltro, sinResultados, botonRestablecer, contadorElementos;

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

function actualizarCategoriaActiva(categoria) {
    categoriaActiva = categoria;
    if (!botonesFiltro) return;

    botonesFiltro.forEach(boton => {
        boton.classList.toggle('activo', boton.dataset.categoria === categoria);
    });
}

/**
 * Filtra y renderiza los productos en pantalla.
 */
function renderizarProductos() {
    if (!productosContenedor) return;

    const consultaNormalizada = normalizar(consultaBusqueda);

    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = categoriaActiva === 'todos' || producto.categoria === categoriaActiva;
        if (!coincideCategoria) return false;
        if (consultaNormalizada === '') return true;

        return (
            normalizar(producto.nombre).includes(consultaNormalizada) ||
            normalizar(producto.codigo).includes(consultaNormalizada) ||
            normalizar(producto.descripcion).includes(consultaNormalizada) ||
            normalizar(producto.compatibilidad).includes(consultaNormalizada)
        );
    });

    if (contadorElementos) {
        const total = productosFiltrados.length;
        const plural = total === 1 ? '' : 's';
        const etiquetaCategoria = categoriaActiva === 'todos' ? `repuesto${plural}` : (NOMBRES_CATEGORIAS[categoriaActiva] || categoriaActiva);
        const textoConsulta = consultaNormalizada ? ` para "${consultaBusqueda}"` : '';
        contadorElementos.textContent = `Mostrando ${total} ${etiquetaCategoria}${textoConsulta}`;
    }

    const noHayResultados = productosFiltrados.length === 0;
    if (sinResultados) sinResultados.classList.toggle('hidden', !noHayResultados);
    productosContenedor.style.display = noHayResultados ? 'none' : 'flex';

    if (noHayResultados) {
        productosContenedor.innerHTML = '';
        return;
    }

    const fragment = document.createDocumentFragment();

    productosFiltrados.forEach(producto => {
        const fila = document.createElement('article');
        fila.className = 'producto-fila';
        fila.dataset.id = producto.id;
        fila.setAttribute('tabindex', '0');
        fila.setAttribute('role', 'button');
        fila.setAttribute('aria-label', `Ver detalles de ${producto.nombre}`);

        const nombreCategoria = NOMBRES_CATEGORIAS[producto.categoria] || producto.categoria;
        const tieneImagen = typeof producto.imagen === 'string' && producto.imagen.trim() !== '';

        fila.innerHTML = `
            ${tieneImagen ? `
                <div class="fila-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
            ` : ''}
            <div class="fila-info">
                <div class="fila-meta">
                    <span class="tag-categoria">${nombreCategoria}</span>
                    <span class="tag-codigo">Cód: <strong>${producto.codigo}</strong></span>
                </div>
                <h3 class="fila-nombre">${producto.nombre}</h3>
                ${producto.descripcion ? `<p class="fila-descripcion">${producto.descripcion}</p>` : ''}
                ${producto.compatibilidad ? `<div class="fila-compatibilidad"><strong>Compatibilidad:</strong> ${producto.compatibilidad}</div>` : ''}
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

        fila.addEventListener('click', () => abrirModal(producto.id));
        fila.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                abrirModal(producto.id);
            }
        });

        fragment.appendChild(fila);
    });

    productosContenedor.replaceChildren(fragment);
}

/**
 * Configura los filtros por categoría.
 */
function configurarFiltros() {
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            actualizarCategoriaActiva(boton.dataset.categoria);
            renderizarProductos();
        });
    });

    document.querySelectorAll('.categoria-item').forEach(elemento => {
        elemento.addEventListener('click', () => {
            const categoria = elemento.dataset.filter;
            if (!productosContenedor) {
                window.location.href = `catalogo.html?categoria=${encodeURIComponent(categoria)}`;
                return;
            }
            actualizarCategoriaActiva(categoria);
            document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
            renderizarProductos();
        });
    });
}

/**
 * Limpia búsqueda y filtros activos.
 */
function resetearFiltros() {
    actualizarCategoriaActiva('todos');
    consultaBusqueda = '';

    if (entradaBusqueda) {
        entradaBusqueda.value = '';
    }
    if (botonLimpiarBusqueda) {
        botonLimpiarBusqueda.style.display = 'none';
    }

    renderizarProductos();
}

/**
 * Configura el buscador en tiempo real y acciones relacionadas.
 */
function configurarBusqueda() {
    if (entradaBusqueda) {
        entradaBusqueda.addEventListener('input', (evento) => {
            consultaBusqueda = evento.target.value;
            if (botonLimpiarBusqueda) {
                botonLimpiarBusqueda.style.display = consultaBusqueda.length > 0 ? 'block' : 'none';
            }
            renderizarProductos();
        });
    }

    if (botonLimpiarBusqueda) {
        botonLimpiarBusqueda.addEventListener('click', () => {
            if (entradaBusqueda) {
                entradaBusqueda.value = '';
                entradaBusqueda.focus();
            }
            consultaBusqueda = '';
            botonLimpiarBusqueda.style.display = 'none';
            renderizarProductos();
        });
    }

    if (botonRestablecer) {
        botonRestablecer.addEventListener('click', resetearFiltros);
    }

    const botonBuscarEncabezado = document.getElementById('header-search-btn');
    if (botonBuscarEncabezado) {
        botonBuscarEncabezado.addEventListener('click', () => {
            const destino = document.getElementById('productos');
            if (!destino) return;

            destino.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                entradaBusqueda?.focus();
            }, 800);
        });
    }
}

/**
 * Inicializa el catálogo: carga datos y renderiza.
 */
export function inicializarCatalogo(datosProductos) {
    productos = datosProductos;

    productosContenedor = document.getElementById('productos-container');
    entradaBusqueda = document.getElementById('buscar-producto');
    botonLimpiarBusqueda = document.getElementById('btn-clear-search');
    botonesFiltro = document.querySelectorAll('.filtro-btn');
    sinResultados = document.getElementById('no-results');
    botonRestablecer = document.getElementById('btn-reset-filters');
    contadorElementos = document.getElementById('catalogo-contador');

    const categoriaUrl = new URLSearchParams(window.location.search).get('categoria');
    if (categoriaUrl && NOMBRES_CATEGORIAS[categoriaUrl]) {
        actualizarCategoriaActiva(categoriaUrl);
    }

    configurarFiltros();
    configurarBusqueda();
    renderizarProductos();

}