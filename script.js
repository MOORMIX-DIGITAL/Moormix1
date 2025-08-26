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
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
            `;
            cartItemsDiv.appendChild(itemElement);
            total += item.price;
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

    // Lógica para el filtro de productos (si ya la agregaste)
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    if (sortSelect && productGrid) {
        sortSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            let sortedCards = [...productCards];

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
