
// 1 VARIABLES GLOBALES

let productos = [];           // lo llena desde datos.js
let activeCategory = 'todos';
let searchQuery = '';


// 2 SLIDER

const slides = document.querySelectorAll('.slide');
const sliderTitle = document.getElementById('slider-title');
const sliderDesc = document.getElementById('slider-desc');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');

let currentSlide = 0;
const slideContent = [
    {
        title: "Servicios especializados<br>Marcas reconocidas.",
        desc: "Somos una organización líder en la distribución al por mayor de repuestos automotrices en toda Venezuela."
    },
    {
        title: "Transmisión y Suspensión<br>Calidad y Durabilidad.",
        desc: "Contamos con un portafolio especializado de más de 45 grupos de repuestos de importación directa."
    },
    {
        title: "Logística Eficiente<br>Despacho a tu negocio.",
        desc: "Garantizamos rutas de entrega constantes en San Cristóbal y envíos asegurados a todo el territorio nacional."
    }
];

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');

    if (sliderTitle && sliderDesc) {
        const contentParent = document.querySelector('.banner-content');
        if (contentParent) contentParent.style.opacity = '0.3';

        setTimeout(() => {
            sliderTitle.innerHTML = slideContent[currentSlide].title;
            sliderDesc.textContent = slideContent[currentSlide].desc;
            if (contentParent) contentParent.style.opacity = '1';
        }, 150);
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); resetTimer(); });
    nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); resetTimer(); });
}

let slideInterval = setInterval(() => showSlide(currentSlide + 1), 6000);

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 6000);
}


// 3.CATÁLOGO

const productosContainer = document.getElementById('productos-container');
const buscarInput = document.getElementById('buscar-producto');
const btnClearSearch = document.getElementById('btn-clear-search');
const filtroBtns = document.querySelectorAll('.filtro-btn');
const categoryItems = document.querySelectorAll('.categoria-item');
const noResults = document.getElementById('no-results');
const btnResetFilters = document.getElementById('btn-reset-filters');


// 4. RENDERIZADO

function renderProductos() {
    if (!productosContainer) return;

    productosContainer.style.opacity = '0.3';

    setTimeout(() => {
        productosContainer.innerHTML = '';

        const normalizar = (texto) => {
            if (texto === null || texto === undefined) return '';
            return String(texto)
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/ñ/g, 'n')
                .replace(/\s+/g, ' ')
                .trim();
        };

        const searchLower = normalizar(searchQuery);

        // Filtrar
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

        // "no resultados"
        if (filtered.length === 0) {
            noResults.classList.remove('hidden');
            productosContainer.style.display = 'none';
        } else {
            noResults.classList.add('hidden');
            productosContainer.style.display = 'grid';

            filtered.forEach(prod => {
                const card = document.createElement('article');
                card.className = 'producto-card';
                card.dataset.id = prod.id;

                const catNames = {
                    transmision: "Transmisión",
                    rodamientos: "Rodamientos",
                    suspension: "Suspensión",
                    motor: "Motor",
                    bombas: "Bombas"
                };
                const readableCategory = catNames[prod.categoria] || prod.categoria;

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


// 5. CATEGORÍAs

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


// 6. BUSCADOR

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
            btnClearSearch.style.display = 'none';
        }
        filtroBtns.forEach(b => b.classList.remove('activo'));
        if (filtroBtns[0]) filtroBtns[0].classList.add('activo');
        renderProductos();
    });
}

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


// 7. WHATSAPP

const modal = document.getElementById('producto-modal');
const modalImg = document.getElementById('modal-producto-img');
const modalCategoria = document.getElementById('modal-producto-categoria');
const modalTitulo = document.getElementById('modal-producto-titulo');
const modalCodigo = document.getElementById('modal-producto-codigo');
const modalDesc = document.getElementById('modal-producto-descripcion');
const btnCotizar = document.getElementById('modal-btn-cotizar');
const closeModalBtn = document.getElementById('close-modal-btn');

function openModal(id) {
    const prod = productos.find(p => p.id === id);
    if (!prod || !modal) return;

    const catNames = {
        transmision: "Transmisión",
        rodamientos: "Rodamientos",
        suspension: "Suspensión",
        motor: "Motor",
        bombas: "Bombas"
    };
    const readableCategory = catNames[prod.categoria] || prod.categoria;

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

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
});

// 8. INICIALIZACIÓN

document.addEventListener('DOMContentLoaded', () => {
    if (typeof ITEMS_DATA === 'undefined') {
        console.error('❌ ERROR: No se encontró ITEMS_DATA. ¿Cargaste datos.js ANTES de script.js?');
        return;
    }

    productos = ITEMS_DATA;
    console.log('✅ Productos cargados:', productos.length);

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

    renderProductos();

    if (params.get('focusSearch') === 'true' && buscarInput) {
        setTimeout(() => {
            buscarInput.focus();
            buscarInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
});