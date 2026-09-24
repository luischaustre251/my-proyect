// ============================================================
// menu.js — Menú hamburguesa (responsive)
// ============================================================

export function initMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburgerBtn || !navMenu) return;

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace de navegación
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
