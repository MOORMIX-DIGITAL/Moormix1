alert('¡Hola!');

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
        // Añade aquí los datos para todas las provincias, cantones y parroquias que necesites
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

    // Llenar el selector de provincias al cargar la página
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

        // Agregamos el resumen del carrito
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

    // Lógica del modal de contacto
    const contactButton = document.getElementById('contact-button');
    const contactModal = document.getElementById('contact-modal');
    const closeButton = document.querySelector('.modal-close');
    if (contactButton && contactModal) {
        contactButton.addEventListener('click', () => { contactModal.classList.add('active'); });
        closeButton.addEventListener('click', () => { contactModal.classList.remove('active'); });
        contactModal.addEventListener('click', (e) => { if (e.target === contactModal) { contactModal.classList.remove('active'); } });
    }

    // Lógica del formulario
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
                contactModal.classList.remove('active');
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});
