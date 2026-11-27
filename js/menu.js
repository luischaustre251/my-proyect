// ============================================================
// menu.js — Menú hamburguesa (responsive)
// ============================================================

function marcarEnlaceActivo() {
    const archivo = window.location.pathname.split('/').pop() || 'index.html';
    const enInicio = archivo === '' || archivo === 'index.html';
    const hash = window.location.hash;

    document.querySelectorAll('#nav-menu a').forEach((enlace) => {
        const href = enlace.getAttribute('href') || '';
        let activo = false;

        if (enInicio) {
            activo = hash === '#categorias'
                ? href.includes('#categorias')
                : href === '#inicio' || href.endsWith('#inicio');
        } else {
            activo = href === archivo;
        }

        enlace.classList.toggle('active-nav', activo);
    });
}

export function inicializarMenu() {
    const botonMenu = document.getElementById('hamburger-btn');
    const menuNavegacion = document.getElementById('nav-menu');

    marcarEnlaceActivo();
    window.addEventListener('hashchange', marcarEnlaceActivo);

    if (!botonMenu || !menuNavegacion) return;

    botonMenu.addEventListener('click', () => {
        botonMenu.classList.toggle('active');
        menuNavegacion.classList.toggle('active');
    });

    menuNavegacion.querySelectorAll('a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            botonMenu.classList.remove('active');
            menuNavegacion.classList.remove('active');
        });
    });
}
