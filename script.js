document.addEventListener('DOMContentLoaded', () => {

    const shippingData = {
        'pichincha': {
            'quito': {
                'carcelen': 6.00,
                'calderon': 6.50,
                'centro-historico': 6.00
            },
            'ruminahui': {
                'sangolqui': 6.50
            },
            'cayambe': {
                'cayambe': 7.00
            }
        },
        'guayas': {
            'guayaquil': {
                'guayaquil-centro': 6.00,
                'guayaquil-sur': 6.50
            },
            'duran': {
                'duran': 6.50
            },
            'samborondon': {
                'samborondon': 7.00
            }
        },
        // Añade aquí los datos para todas las provincias, cantones y parroquias que necesites
    };

    const provinceSelect = document.getElementById('province-select');
    const cantonSelect = document.getElementById('canton-select');
    const parishSelect = document.getElementById('parish-select');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const cartContainer = document.querySelector('.cart-container');
    const botonesComprar = document.querySelectorAll('.buy-button');

    let cart = [];

    function populateSelect(selectElement, data, defaultText) {
        if (!selectElement) return; // Validación para evitar errores si el elemento no existe
        selectElement.innerHTML = `<option value="">${defaultText}</option>`;
        selectElement.disabled = false;
        if (data) {
            Object.keys(data).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                selectElement.appendChild(option);
            });
        } else {
            selectElement.disabled = true;
        }
    }

    if (provinceSelect) {
        populateSelect(provinceSelect, shippingData, 'Selecciona...');
    }

    // Event Listeners para actualizar los selectores en cascada
    if (provinceSelect) {
        provinceSelect.addEventListener('change', () => {
            const selectedProvince = provinceSelect.value;
            const cantons = selectedProvince ? shippingData[selectedProvince] : null;
            populateSelect(cantonSelect, cantons, 'Selecciona un cantón...');
            populateSelect(parishSelect, null, 'Selecciona una parroquia...');
            updateCart();
        });
    }

    if (cantonSelect) {
        cantonSelect.addEventListener('change', () => {
            const selectedProvince = provinceSelect.value;
            const selectedCanton = cantonSelect.value;
            const parishes = (selectedProvince && selectedCanton) ? shippingData[selectedProvince][selectedCanton] : null;
            populateSelect(parishSelect, parishes, 'Selecciona una parroquia...');
            updateCart();
        });
    }

    if (parishSelect) {
        parishSelect.addEventListener('change', () => {
            updateCart();
        });
    }
    
        const total = subtotal + (cart.length > 0 && shippingCost ? shippingCost : 0);

        const summaryHtml = `
            <div class="cart-summary">
                <p>Subtotal: $${subtotal.toFixed(2)}</p>
                <p>Costo de Envío: $${shippingCost ? shippingCost.toFixed(2) : '0.00'}</p>
            </div>
        `;
        cartItemsDiv.insertAdjacentHTML('beforeend', summaryHtml);

        cartTotalSpan.textContent = total.toFixed(2);

        if (subtotal > 0) {
            cartContainer.style.display = 'block';
            checkoutButton.style.display = 'inline-block';
        } else {
            cartContainer.style.display = 'none';
            checkoutButton.style.display = 'none';
        }
    }
    
    // Lógica para añadir productos al carrito
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const name = productCard.querySelector('.product-name').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            
            cart.push({ name, price });
            updateCart();
        });
    });

    // Lógica para ir a la página de pago
    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('totalPrice', cartTotalSpan.textContent);
        window.location.href = 'pago-transferencia.html';
    });
});
