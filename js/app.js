
// app.js — Punto de entrada principal (inicialización)

import { DATOS_PRODUCTOS } from './datos.js';
import { inicializarMenu } from './menu.js';
import { inicializarCarrusel } from './slider.js';
import { inicializarModal, establecerProductosReferencia } from './modal.js';
import { inicializarCatalogo } from './catalogo.js';
import { inicializarAutenticacion } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú hamburguesa (todas las páginas)
    inicializarMenu();

    // 2. Slider del banner (solo index.html)
    inicializarCarrusel();

    // 3. Modal de producto (solo catalogo.html)
    inicializarModal();

    // 4. Catálogo de productos
    establecerProductosReferencia(DATOS_PRODUCTOS);
    inicializarCatalogo(DATOS_PRODUCTOS);

    // 5. Validador de usuario y autenticación (admin / 12345678)
    inicializarAutenticacion();
});
