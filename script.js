document.addEventListener('DOMContentLoaded', () => {
    // Diccionario de costos de envío por provincia, cantón y parroquia
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
    };

    // Referencias a los selectores HTML
    const provinceSelect = document.getElementById('province-select');
    const cantonSelect = document.getElementById('canton-select');
    const parishSelect = document.getElementById('parish-select');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const cartContainer = document.querySelector('.cart-container');
    const botonesComprar = document.querySelectorAll('.buy-button');

    let cart = [];

    // Función para llenar los selectores
    function populateSelect(selectElement, data, defaultText) {
        if (!selectElement) return;
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

    // Llenar el selector de provincias al cargar la página si existe
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

    // Función principal para actualizar el carrito y calcular el total
    function updateCart() {
        if (!cartItemsDiv || !cartTotalSpan || !cartContainer) return;

        let shippingCost = 0;
        const selectedProvince = provinceSelect ? provinceSelect.value : '';
        const selectedCanton = cantonSelect ? cantonSelect.value : '';
        const selectedParish = parishSelect ? parishSelect.value : '';

        if (selectedProvince && selectedCanton && selectedParish && shippingData[selectedProvince] && shippingData[selectedProvince][selectedCanton] && shippingData[selectedProvince][selectedCanton][selectedParish]) {
            shippingCost = shippingData[selectedProvince][selectedCanton][selectedParish];
        }

        cartItemsDiv.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="remove-button" data-index="${index}">Eliminar</button>
            `;
            cartItemsDiv.appendChild(itemElement);
            subtotal += item.price;
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = e.target.getAttribute('data-index');
                cart.splice(indexToRemove, 1);
                updateCart();
            });
        });

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
            if (checkoutButton) {
                checkoutButton.style.display = 'inline-block';
            }
        } else {
            cartContainer.style.display = 'none';
            if (checkoutButton) {
                checkoutButton.style.display = 'none';
            }
        }
    }

    // Lógica para añadir productos al carrito
    if (botonesComprar) {
        botonesComprar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const name = productCard.querySelector('.product-name').textContent;
                const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
                
                cart.push({ name, price });
                updateCart();
            });
        });
    }

    // Lógica para ir a la página de pago
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const selectedProvince = provinceSelect ? provinceSelect.value : '';
            const selectedCanton = cantonSelect ? cantonSelect.value : '';
            const selectedParish = parishSelect ? parishSelect.value : '';

            let shippingCost = 0;
            if (selectedProvince && selectedCanton && selectedParish && shippingData[selectedProvince] && shippingData[selectedProvince][selectedCanton] && shippingData[selectedProvince][selectedCanton][selectedParish]) {
                shippingCost = shippingData[selectedProvince][selectedCanton][selectedParish];
            }
            
            localStorage.setItem('shippingCost', shippingCost.toFixed(2));
            localStorage.setItem('totalPrice', cartTotalSpan.textContent);
            
            window.location.href = 'pago-transferencia.html';
        });
    }

    // Lógica para mostrar el total en la página de pago
    const paymentTotalSpan = document.getElementById('payment-total');
    const paymentShippingSpan = document.getElementById('payment-shipping');
    const paymentSubtotalSpan = document.getElementById('payment-subtotal');
    
    if (paymentTotalSpan && paymentShippingSpan && paymentSubtotalSpan) {
        const totalPrice = localStorage.getItem('totalPrice');
        const shippingCost = localStorage.getItem('shippingCost');
        const subtotal = (parseFloat(totalPrice) - parseFloat(shippingCost)).toFixed(2);
        
        paymentTotalSpan.textContent = `$${totalPrice}`;
        paymentShippingSpan.textContent = `$${shippingCost}`;
        paymentSubtotalSpan.textContent = `$${subtotal}`;
    }

    // Lógica para la página de rastreo
    const trackButton = document.getElementById('track-button');
    const trackingNumberInput = document.getElementById('tracking-number');
    const trackingResultsDiv = document.getElementById('tracking-results');

    if (trackButton && trackingNumberInput && trackingResultsDiv) {
        trackButton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace recargue la página
            const trackingNumber = trackingNumberInput.value.trim();

            if (trackingNumber === '') {
                trackingResultsDiv.innerHTML = '<p class="error">Por favor, ingresa un número de guía.</p>';
                return;
            }

            // Simulación de rastreo (aquí iría la lógica real)
            trackingResultsDiv.innerHTML = '<p>Buscando el estado de tu pedido...</p>';

            // En un sitio web real, aquí se haría una llamada a la API de Servientrega o de la empresa de envíos
            // Por ahora, mostraremos un mensaje simulado.
            setTimeout(() => {
                // Aquí puedes mostrar un mensaje diferente para cada estado de envío
                const trackingStatus = `
                    <div class="tracking-status">
                        <h3>Estado del Pedido:</h3>
                        <p><strong>Número de Guía:</strong> ${trackingNumber}</p>
                        <p><strong>Estado:</strong> En tránsito</p>
                        <p><strong>Ubicación Actual:</strong> Quito, Ecuador</p>
                        <p><strong>Fecha Estimada de Entrega:</strong> 2-3 días hábiles</p>
                    </div>
                `;
                trackingResultsDiv.innerHTML = trackingStatus;
            }, 2000); // Simula un retraso de 2 segundos
        });
    }
});
