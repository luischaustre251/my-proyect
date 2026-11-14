// ============================================================
// modal.js — Modal de detalle de producto y WhatsApp
// ============================================================

// Mapa de nombres legibles de categorías
const CAT_NAMES = {
    transmision: "Transmisión",
    rodamientos: "Rodamientos",
    suspension: "Suspensión",
    motor: "Motor",
    bombas: "Bombas"
};

// Elementos del DOM (se inicializan en init)
let modal, modalImg, modalNoImg, modalCategoria, modalTitulo, modalCodigo, modalDesc, btnCotizar;

// Referencia a la lista de productos (se inyecta desde app.js)
let productosRef = [];

export function setProductosRef(productos) {
    productosRef = productos;
}

export function openModal(id) {
    const prod = productosRef.find(p => p.id === id);
    if (!prod || !modal) return;

    const readableCategory = CAT_NAMES[prod.categoria] || prod.categoria;
    const tieneImagen = prod.imagen && typeof prod.imagen === 'string' && prod.imagen.trim().length > 0;

    if (tieneImagen) {
        modalImg.style.display = 'block';
        if (modalNoImg) modalNoImg.classList.add('hidden');
        modalImg.src = prod.imagen;
        modalImg.alt = prod.nombre;
        modalImg.onerror = () => {
            modalImg.style.display = 'none';
            if (modalNoImg) modalNoImg.classList.remove('hidden');
        };
    } else {
        modalImg.style.display = 'none';
        modalImg.src = '';
        if (modalNoImg) modalNoImg.classList.remove('hidden');
    }

    modalCategoria.textContent = readableCategory;
    modalTitulo.textContent = prod.nombre;
    modalCodigo.textContent = prod.codigo;
    modalDesc.innerHTML = `
        ${prod.descripcion || 'Sin descripción técnica disponible.'}<br><br>
        <strong>Aplicación/Compatibilidad:</strong> ${prod.compatibilidad || 'Consultar compatibilidad con nuestro equipo mayorista.'}
    `;

    const phone = "582763550137";
    const mensaje = `Hola Casique C.A., me interesa solicitar cotización para el siguiente repuesto mayorista:\n\n*Código:* ${prod.codigo}\n*Producto:* ${prod.nombre}\n*Categoría:* ${readableCategory}\n\nQuedo atento a la disponibilidad y precio del producto en sus almacenes de San Cristóbal. ¡Muchas gracias!`;

    btnCotizar.href = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

export function initModal() {
    modal = document.getElementById('producto-modal');
    modalImg = document.getElementById('modal-producto-img');
    modalNoImg = document.getElementById('modal-producto-no-img');
    modalCategoria = document.getElementById('modal-producto-categoria');
    modalTitulo = document.getElementById('modal-producto-titulo');
    modalCodigo = document.getElementById('modal-producto-codigo');
    modalDesc = document.getElementById('modal-producto-descripcion');
    btnCotizar = document.getElementById('modal-btn-cotizar');

    const closeModalBtn = document.getElementById('close-modal-btn');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
