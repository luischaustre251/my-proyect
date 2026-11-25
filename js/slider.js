// ============================================================
// slider.js — Slider del banner principal
// ============================================================

const contenidoDiapositivas = [
    {
        titulo: "Servicios especializados<br>Marcas reconocidas.",
        descripcion: "Somos una organización líder en la distribución al por mayor de repuestos automotrices en toda Venezuela."
    },
    {
        titulo: "Transmisión y Suspensión<br>Calidad y Durabilidad.",
        descripcion: "Contamos con un portafolio especializado de más de 45 grupos de repuestos de importación directa."
    },
    {
        titulo: "Logística Eficiente<br>Despacho a tu negocio.",
        descripcion: "Garantizamos rutas de entrega constantes en San Cristóbal y envíos asegurados a todo el territorio nacional."
    }
];

let diapositivaActual = 0;
let intervaloCarrusel = null;

function mostrarDiapositiva(indice, diapositivas, tituloCarrusel, descripcionCarrusel) {
    if (diapositivas.length === 0) return;

    diapositivas.forEach(diapositiva => diapositiva.classList.remove('active'));
    diapositivaActual = (indice + diapositivas.length) % diapositivas.length;
    diapositivas[diapositivaActual].classList.add('active');

    if (tituloCarrusel && descripcionCarrusel) {
        const contenidoBanner = document.querySelector('.banner-content');
        if (contenidoBanner) contenidoBanner.style.opacity = '0.3';

        setTimeout(() => {
            tituloCarrusel.innerHTML = contenidoDiapositivas[diapositivaActual].titulo;
            descripcionCarrusel.textContent = contenidoDiapositivas[diapositivaActual].descripcion;
            if (contenidoBanner) contenidoBanner.style.opacity = '1';
        }, 150);
    }
}

function reiniciarTemporizador(diapositivas, tituloCarrusel, descripcionCarrusel) {
    clearInterval(intervaloCarrusel);
    intervaloCarrusel = setInterval(() => {
        mostrarDiapositiva(diapositivaActual + 1, diapositivas, tituloCarrusel, descripcionCarrusel);
    }, 6000);
}

export function inicializarCarrusel() {
    const diapositivas = document.querySelectorAll('.slide');
    const tituloCarrusel = document.getElementById('slider-title');
    const descripcionCarrusel = document.getElementById('slider-desc');
    const botonAnterior = document.getElementById('slider-prev');
    const botonSiguiente = document.getElementById('slider-next');

    if (diapositivas.length === 0) return;

    if (botonAnterior && botonSiguiente) {
        botonAnterior.addEventListener('click', () => {
            mostrarDiapositiva(diapositivaActual - 1, diapositivas, tituloCarrusel, descripcionCarrusel);
            reiniciarTemporizador(diapositivas, tituloCarrusel, descripcionCarrusel);
        });

        botonSiguiente.addEventListener('click', () => {
            mostrarDiapositiva(diapositivaActual + 1, diapositivas, tituloCarrusel, descripcionCarrusel);
            reiniciarTemporizador(diapositivas, tituloCarrusel, descripcionCarrusel);
        });
    }

    intervaloCarrusel = setInterval(() => {
        mostrarDiapositiva(diapositivaActual + 1, diapositivas, tituloCarrusel, descripcionCarrusel);
    }, 6000);
}
