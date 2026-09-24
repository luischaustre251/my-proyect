// ============================================================
// slider.js — Slider del banner principal
// ============================================================

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

let currentSlide = 0;
let slideInterval = null;

function showSlide(index, slides, sliderTitle, sliderDesc) {
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

function resetTimer(slides, sliderTitle, sliderDesc) {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1, slides, sliderTitle, sliderDesc);
    }, 6000);
}

export function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const sliderTitle = document.getElementById('slider-title');
    const sliderDesc = document.getElementById('slider-desc');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (slides.length === 0) return;

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1, slides, sliderTitle, sliderDesc);
            resetTimer(slides, sliderTitle, sliderDesc);
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1, slides, sliderTitle, sliderDesc);
            resetTimer(slides, sliderTitle, sliderDesc);
        });
    }

    // Iniciar auto-play
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1, slides, sliderTitle, sliderDesc);
    }, 6000);
}
