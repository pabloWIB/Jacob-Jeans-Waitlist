$(function () {
    // Definir la secuencia de animaciones
    const animations = [
        { element: '#firstScreen', class: 'firstScreenAnimation', delay: 750 },
        { element: '#firstScreen', class: 'secondScreenAnimation', delay: 2250 },
        { element: '#main', class: 'mainAnimation', delay: 3250 },
        { element: '#main', class: 'mainThirdAnimation', delay: 4250 },
        { element: '#main', class: 'mainFourthAnimation', delay: 4750 },
        { element: '#main', class: 'mainSecondAnimation', delay: 5250 },
        { element: '#main', class: 'mainFifthAnimation', delay: 5550 },
        { element: '#section', class: 'sectionAnimation', delay: 6250 }
    ];

    // Función para aplicar las animaciones
    function applyAnimation({ element, class: className, delay }) {
        setTimeout(() => {
            $(element).addClass(className);
        }, delay);
    }

    // Aplicar todas las animaciones
    animations.forEach(applyAnimation);
});

emailjs.init('Amo5GBjS_00-An44w')

const btn = document.getElementById('button');
const btn2 = document.getElementById('button2');

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Suscribing...';

    const serviceID = 'default_service';
   const templateID = 'template_inofmni';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Suscribed';
            formSubmitted = true; // Marcar como enviado
            showThankYou(); // Mostrar mensaje de agradecimiento
            this.reset(); // Opcional: resetear el formulario
        }, (err) => {
            btn.value = 'Suscribed';
            alert(JSON.stringify(err));
        });
});

document.getElementById('form2').addEventListener('submit', function (event) {
    event.preventDefault();

    btn2.value = 'Suscribing...';

    const serviceID = 'default_service';
   const templateID = 'template_1n53v5q';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn2.value = 'Suscribed';
            formSubmitted = true; // Marcar como enviado
            showThankYou(); // Mostrar mensaje de agradecimiento
            this.reset(); // Opcional: resetear el formulario
        }, (err) => {
            btn2.value = 'Suscribed';
            alert(JSON.stringify(err));
        });
});

// El resto del código permanece igual...

// Elementos del DOM
const closeWindow = document.getElementById("closeWindow");
const thankContainer = document.getElementById("thankContainer");
const modal = document.getElementById("exitModal");
const closeBtn = document.querySelector(".close");

// Variables de estado
let formSubmitted = false;
let showModal = true;
let canShowModal = false;

// Función para controlar el scroll del body
function toggleScroll(disable) {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
}

// Funciones para el contenedor de agradecimiento
function showThankYou() {
    thankContainer.classList.remove("Cerrar");
    thankContainer.classList.add("thank-you-container-show");
    toggleScroll(true); // Deshabilitar scroll
}

function hideThankYou() {
    thankContainer.classList.remove("thank-you-container-show");
    thankContainer.classList.add("Cerrar");
    toggleScroll(false); // Habilitar scroll
}

// Funciones para el modal
function showExitModal() {
    modal.style.display = "block";
    toggleScroll(true); // Deshabilitar scroll
}

function hideExitModal() {
    modal.style.display = "none";
    toggleScroll(false); // Habilitar scroll
}

// Temporizador para el modal de salida
setTimeout(() => {
    canShowModal = true;
}, 4000);

// Event Listeners
document.addEventListener("mouseleave", e => {
    if (e.clientY <= 0 && showModal && !formSubmitted && canShowModal) {
        showExitModal();
        showModal = false;
    }
});

closeBtn.onclick = hideExitModal;

window.onclick = e => {
    if (e.target === modal) {
        hideExitModal();
    }
};

closeWindow.addEventListener("click", hideThankYou);

$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
      items: 3,
      itemsDesktop: [1000, 3],
      itemsDesktopSmall: [980, 2],
      itemsTablet: [768, 2],
      itemsMobile: [650, 1],
      pagination: true,
      navigation: false,
      slideSpeed: 1000,
      autoPlay: true
    });
  });

  // Abrir el popup usando ID
document.getElementById('aboutTitle').addEventListener('click', function() {
    document.getElementById('overlayAbout').style.display = 'block';
});

// Cerrar el popup usando ID
document.getElementById('closeAbout').addEventListener('click', function() {
    document.getElementById('overlayAbout').style.display = 'none';
});

// Cerrar el popup si se hace clic fuera del contenido
document.getElementById('overlayAbout').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});