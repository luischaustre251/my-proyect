// ============================================================
// menu.js — Menú hamburguesa (responsive)
// ============================================================

export function inicializarMenu() {
    const botonMenu = document.getElementById('hamburger-btn');
    const menuNavegacion = document.getElementById('nav-menu');

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
