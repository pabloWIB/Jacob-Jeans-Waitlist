

// Elementos del DOM
const closeWindow = document.getElementById("closeWindow");
const thankContainer = document.getElementById("thankContainer");
const modal = document.getElementById("exitModal");
const closeBtn = document.querySelector(".close");

// Variables de estado
let formSubmitted = false;
let showModal = true;
let canShowModal = false;


// Funciones para el contenedor de agradecimiento
function showThankYou() {
    thankContainer.classList.remove("Cerrar");
    thankContainer.classList.add("thank-you-container-show");
}

function hideThankYou() {
    thankContainer.classList.remove("thank-you-container-show");
    thankContainer.classList.add("Cerrar");
}

// Funciones para el modal
function showExitModal() {
    modal.style.display = "block";
}

function hideExitModal() {
    modal.style.display = "none";
}

// Temporizador para el modal de salida
setTimeout(() => {
    canShowModal = true;
}, 3000);

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

document.getElementById('aboutTitle').addEventListener('click', function(event) {
    const dropdown = document.getElementById('aboutDropdown');
    dropdown.classList.toggle('show');
    event.stopPropagation();
});

const reviewsHeading = document.getElementById('reviews');
const popup = document.getElementById('reviewsPopup');
const closeButton = document.getElementById('close-button');

// Event Listeners
reviewsHeading.addEventListener('click', () => {
    popup.classList.add('active');
});

closeButton.addEventListener('click', () => {
    popup.classList.remove('active');
});

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        popup.classList.remove('active');
    }
});




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
            hideExitModal();
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
            hideExitModal();
            showThankYou(); // Mostrar mensaje de agradecimiento
            this.reset(); // Opcional: resetear el formulario
        }, (err) => {
            btn2.value = 'Suscribed';
            alert(JSON.stringify(err));
        });
});

// El resto del código permanece igual...