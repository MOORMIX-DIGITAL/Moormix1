document.addEventListener('DOMContentLoaded', () => {
    // Lógica para los botones de compra
    const botonesComprar = document.querySelectorAll('.buy-button');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            alert('¡Producto añadido al carrito!');
        });
    });

    // Lógica para el formulario de contacto
    const formulario = document.querySelector('.contact-form form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('message').value;

            if (nombre && email && mensaje) {
                alert('¡Mensaje enviado con éxito! Gracias por tu contacto.');
                formulario.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // Lógica para mostrar y ocultar el modal de contacto (¡el nuevo código!)
    const contactButton = document.getElementById('contact-button');
    const contactModal = document.getElementById('contact-modal');
    const closeButton = document.querySelector('.modal-close');

    if (contactButton && contactModal) {
        contactButton.addEventListener('click', () => {
            contactModal.classList.add('active');
        });

        closeButton.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });

        // Ocultar el modal si se hace clic fuera del contenido
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });
    }

    // Lógica para el filtro de productos (si ya la agregaste)
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card')); // Nota: Esto selecciona todas las tarjetas

    if (sortSelect && productGrid) {
        sortSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            let sortedCards = [...productCards]; // Usar una copia para no modificar el array original

            if (value === 'price-asc') {
                sortedCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                    return priceA - priceB;
                });
            } else if (value === 'price-desc') {
                sortedCards.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                    return priceB - priceA;
                });
            }
            
            productGrid.innerHTML = '';
            sortedCards.forEach(card => {
                productGrid.appendChild(card);
            });
        });
    }
});
