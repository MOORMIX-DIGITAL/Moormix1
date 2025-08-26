document.addEventListener('DOMContentLoaded', () => {
    // Lógica para los botones de compra (REEMPLAZAR)
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
        // Guardar el total en el almacenamiento local para la siguiente página
        localStorage.setItem('totalPrice', cartTotalSpan.textContent);
        window.location.href = 'pago-transferencia.html';
    });
    
    // ---
    // (Mantener el resto de tu código JS aquí, como la lógica del formulario de contacto y los filtros)
    // ---
});
