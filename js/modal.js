// modal.js — Modal de detalle de producto y WhatsApp

import { NOMBRES_CATEGORIAS } from './datos.js';
import { estaAutenticado } from './auth.js';

// Elementos del DOM que se inicializan al cargar el módulo
let modal, imagenModal, modalImgWrapper, categoriaModal, tituloModal, codigoModal, descripcionModal, botonCotizar;

// desde app.js
let referenciaProductos = [];

export function establecerProductosReferencia(productos) {
    referenciaProductos = productos;
}

export function abrirModal(id) {
    const producto = referenciaProductos.find(elemento => elemento.id === id);
    if (!producto || !modal) return;

    const nombreCategoria = NOMBRES_CATEGORIAS[producto.categoria] || producto.categoria;
    const tieneImagen = producto.imagen && typeof producto.imagen === 'string' && producto.imagen.trim().length > 0;

    imagenModal.onload = null;
    imagenModal.onerror = null;
    imagenModal.style.display = 'none';
    modalImgWrapper?.classList.remove('has-image');

    if (tieneImagen) {
        imagenModal.onload = () => {
            imagenModal.style.display = 'block';
            modalImgWrapper?.classList.add('has-image');
        };
        imagenModal.onerror = () => {
            imagenModal.style.display = 'none';
            imagenModal.removeAttribute('src');
            modalImgWrapper?.classList.remove('has-image');
        };
        imagenModal.src = producto.imagen;
        imagenModal.alt = producto.nombre;
    } else {
        imagenModal.removeAttribute('src');
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
    modalImgWrapper = document.getElementById('modal-img-wrapper');
    categoriaModal = document.getElementById('modal-producto-categoria');
    tituloModal = document.getElementById('modal-producto-titulo');
    codigoModal = document.getElementById('modal-producto-codigo');
    descripcionModal = document.getElementById('modal-producto-descripcion');
    botonCotizar = document.getElementById('modal-btn-cotizar');
    const modalAcceso = document.getElementById('login-modal');

    const botonCerrarModal = document.getElementById('close-modal-btn');

    if (botonCotizar) {
        botonCotizar.addEventListener('click', (evento) => {
            if (estaAutenticado()) return;
            evento.preventDefault();
            if (modalAcceso) modalAcceso.classList.add('active');
        });
    }

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
