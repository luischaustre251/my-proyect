// ============================================================
// modal.js — Modal de detalle de producto y WhatsApp
// ============================================================

import { NOMBRES_CATEGORIAS } from './datos.js';

// Elementos del DOM que se inicializan al cargar el módulo
let modal, imagenModal, sinImagenModal, categoriaModal, tituloModal, codigoModal, descripcionModal, botonCotizar;

// Referencia a la lista de productos (se inyecta desde app.js)
let referenciaProductos = [];

export function establecerProductosReferencia(productos) {
    referenciaProductos = productos;
}

export function abrirModal(id) {
    const producto = referenciaProductos.find(elemento => elemento.id === id);
    if (!producto || !modal) return;

    const nombreCategoria = NOMBRES_CATEGORIAS[producto.categoria] || producto.categoria;
    const tieneImagen = producto.imagen && typeof producto.imagen === 'string' && producto.imagen.trim().length > 0;

    if (tieneImagen) {
        if (imagenModal?.parentElement) imagenModal.parentElement.style.display = 'block';
        imagenModal.style.display = 'block';
        if (sinImagenModal) sinImagenModal.classList.add('hidden');
        imagenModal.src = producto.imagen;
        imagenModal.alt = producto.nombre;
        imagenModal.onerror = () => {
            imagenModal.style.display = 'none';
            if (sinImagenModal) sinImagenModal.classList.remove('hidden');
        };
    } else {
        if (imagenModal?.parentElement) imagenModal.parentElement.style.display = 'none';
        imagenModal.style.display = 'none';
        imagenModal.src = '';
        if (sinImagenModal) sinImagenModal.classList.remove('hidden');
    }

    categoriaModal.textContent = nombreCategoria;
    tituloModal.textContent = producto.nombre;
    codigoModal.textContent = producto.codigo;
    descripcionModal.innerHTML = `
        ${producto.descripcion || 'Sin descripción técnica disponible.'}<br><br>
        <strong>Aplicación/Compatibilidad:</strong> ${producto.compatibilidad || 'Consultar compatibilidad con nuestro equipo mayorista.'}
    `;

    const telefono = "584126709100";
    const mensaje = `Hola Casique C.A., me interesa solicitar cotización para el siguiente repuesto mayorista:\n\n*Código:* ${producto.codigo}\n*Producto:* ${producto.nombre}\n*Categoría:* ${nombreCategoria}\n\nQuedo atento a la disponibilidad y precio del producto en sus almacenes de San Cristóbal. ¡Muchas gracias!`;

    botonCotizar.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

export function inicializarModal() {
    modal = document.getElementById('producto-modal');
    imagenModal = document.getElementById('modal-producto-img');
    sinImagenModal = document.getElementById('modal-producto-no-img');
    categoriaModal = document.getElementById('modal-producto-categoria');
    tituloModal = document.getElementById('modal-producto-titulo');
    codigoModal = document.getElementById('modal-producto-codigo');
    descripcionModal = document.getElementById('modal-producto-descripcion');
    botonCotizar = document.getElementById('modal-btn-cotizar');

    const botonCerrarModal = document.getElementById('close-modal-btn');

    if (botonCerrarModal) {
        botonCerrarModal.addEventListener('click', cerrarModal);
    }

    if (modal) {
        modal.addEventListener('click', (evento) => {
            if (evento.target === modal) cerrarModal();
        });
    }

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && modal && modal.classList.contains('active')) {
            cerrarModal();
        }
    });
}
