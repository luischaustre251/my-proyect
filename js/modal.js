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
let modal, modalImg, modalCategoria, modalTitulo, modalCodigo, modalDesc, btnCotizar;

// Referencia a la lista de productos (se inyecta desde app.js)
let productosRef = [];

export function setProductosRef(productos) {
    productosRef = productos;
}

export function openModal(id) {
    const prod = productosRef.find(p => p.id === id);
    if (!prod || !modal) return;

    const readableCategory = CAT_NAMES[prod.categoria] || prod.categoria;

    modalImg.src = prod.imagen;
    modalImg.alt = prod.nombre;
    modalCategoria.textContent = readableCategory;
    modalTitulo.textContent = prod.nombre;
    modalCodigo.textContent = prod.codigo;
    modalDesc.innerHTML = `
        ${prod.descripcion}<br><br>
        <strong>Aplicación/Compatibilidad:</strong> ${prod.compatibilidad}
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
