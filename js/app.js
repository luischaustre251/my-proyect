
// app.js

import { DATOS_PRODUCTOS } from './datos.js';
import { inicializarMenu } from './menu.js';
import { inicializarCarrusel } from './slider.js';
import { inicializarModal, establecerProductosReferencia } from './modal.js';
import { inicializarCatalogo } from './catalogo.js';
import { inicializarAutenticacion } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. menu hamburguesa (todas las páginas)
    inicializarMenu();

    // 2. Slider del banner (index.html)
    inicializarCarrusel();

    // 3. Modal de producto (catalogo.html)
    inicializarModal();

    // 4. Catalogo de productos
    establecerProductosReferencia(DATOS_PRODUCTOS);
    inicializarCatalogo(DATOS_PRODUCTOS);

    // 5. Validador(admin / 12345678)
    inicializarAutenticacion();
});
