document.addEventListener('DOMContentLoaded', () => {

    // Lógica para los botones de compra y el carrito
    const botonesComprar = document.querySelectorAll('.buy-button');
    const cartContainer = document.querySelector('.cart-container');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');

    let cart = [];

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="remove-button" data-index="${index}">Eliminar</button>
            `;
            cartItemsDiv.appendChild(itemElement);
            total += item.price;
        });

        // Agregamos el event listener para los nuevos botones de eliminar
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = e.target.getAttribute('data-index');
                cart.splice(indexToRemove, 1);
                updateCart(); // Volvemos a llamar a la función para actualizar la vista
            });
        });

        cartTotalSpan.textContent = total;
        if (total > 0) {
            cartContainer.style.display = 'block';
            checkoutButton.style.display = 'inline-block';
        } else {
            cartContainer.style.display = 'none';
            checkoutButton.style.display = 'none';
        }
    }

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const name = productCard.querySelector('.product-name').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));

            cart.push({ name, price });
            updateCart();
        });
    });

    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('totalPrice', cartTotalSpan.textContent);
        window.location.href = 'pago-transferencia.html';
    });

    // Lógica para mostrar y ocultar el modal de contacto
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
                contactModal.classList.remove('active'); // Ocultar el modal después de enviar
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});

// Lógica para el rastreo de pedidos
const trackButton = document.getElementById('trackButton');
const trackingInput = document.getElementById('trackingNumber');

if (trackButton && trackingInput) {
    trackButton.addEventListener('click', () => {
        const trackingNumber = trackingInput.value;
        if (trackingNumber) {
            // URL de rastreo de Servientrega. El número de guía va al final.
            const servientregaURL = `https://www.servientrega.com.ec/rastreo-de-envios?guia=${trackingNumber}`;
            window.open(servientregaURL, '_blank');
        } else {
            alert('Por favor, ingresa un número de guía válido.');
        }
    });
}
