document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    // 2. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. LÓGICA DEL MODAL DE PRODUCTOS
    // Detecta clics en los botones "Ver detalles"
    const detailButtons = document.querySelectorAll('.btn-details');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const modalWhatsapp = document.getElementById('modalWhatsapp');

    // Reemplaza esto con tu número real
    const MY_PHONE_NUMBER = "5561456717"; 

    // Instancia del modal de Bootstrap
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));

    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Encuentra la tarjeta padre
            const card = e.target.closest('.product-card');
            
            // Extrae datos del HTML
            const title = card.querySelector('.card-title').innerText;
            const price = card.querySelector('.card-price').innerText;
            const imgSrc = card.querySelector('.card-img-top').src;
            // Busca la descripción completa oculta
            const fullDesc = card.querySelector('.full-desc').innerText;

            // Rellena el modal
            modalTitle.innerText = title;
            modalPrice.innerText = price;
            modalImage.src = imgSrc;
            modalDesc.innerText = fullDesc;

            // Configura el botón de WhatsApp del Modal
            const waMsg = `Hola, vi el producto *${title}* (${price}) en la web y quiero comprarlo.`;
            modalWhatsapp.href = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(waMsg)}`;

            // Muestra el modal
            productModal.show();
        });
    });

    // 4. FORMULARIO DE CONTACTO A WHATSAPP
    const contactForm = document.getElementById('whatsappForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que recargue la página

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        // Construye el mensaje
        const whatsappMessage = `Hola, estos son mis datos:\n*Nombre:* ${nombre}\n*Teléfono:* ${telefono}\n*Correo:* ${correo}\n*Mensaje:* ${mensaje}`;

        // Redirige a WhatsApp
        const url = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(url, '_blank');
        
        // Opcional: limpiar formulario
        contactForm.reset();
    });
});