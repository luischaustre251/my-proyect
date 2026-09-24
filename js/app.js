// ============================================================
// app.js — Punto de entrada principal (inicialización)
// ============================================================

import { ITEMS_DATA } from './datos.js';
import { initMenu } from './menu.js';
import { initSlider } from './slider.js';
import { initModal, setProductosRef } from './modal.js';
import { initCatalogo } from './catalogo.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú hamburguesa (todas las páginas)
    initMenu();

    // 2. Slider del banner (solo index.html)
    initSlider();

    // 3. Modal de producto (solo catalogo.html)
    initModal();

    // 4. Catálogo de productos
    setProductosRef(ITEMS_DATA);
    initCatalogo(ITEMS_DATA);
});
