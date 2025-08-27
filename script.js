document.addEventListener('DOMContentLoaded', () => {

    const shippingData = {
        'pichincha': {
            'quito': { 'carcelen': 6.00, 'calderon': 6.50, 'centro-historico': 6.00 },
            'ruminahui': { 'sangolqui': 6.50 },
            'cayambe': { 'cayambe': 7.00 }
        },
        'guayas': {
            'guayaquil': { 'guayaquil-centro': 6.00, 'guayaquil-sur': 6.50 },
            'duran': { 'duran': 6.50 },
            'samborondon': { 'samborondon': 7.00 }
        },
    };

    const products = {
        'prod_01': {
            name: 'Samsung Galaxy A54 5G',
            price: 300,
            description: 'Un smartphone de gama media con una excelente relación calidad-precio. Pantalla vibrante, cámara de alta resolución y batería de larga duración. Ideal para el uso diario.',
            images: ['img/samsung-a54.jpg', 'img/samsung-a54-2.jpg', 'img/samsung-a54-3.jpg']
        },
        'prod_02': {
            name: 'Xiaomi Redmi Note 12 Pro',
            price: 250,
            description: 'Disfruta de una experiencia fluida con el Xiaomi Redmi Note 12 Pro. Con una potente cámara, carga rápida y un diseño elegante, es perfecto para los amantes de la tecnología.',
            images: ['img/xiaomi-redmi-note-12-pro.jpg', 'img/xiaomi-redmi-note-12-pro-2.jpg', 'img/xiaomi-redmi-note-12-pro-3.jpg']
        },
        'prod_03': {
            name: 'Apple iPhone 14',
            price: 800,
            description: 'El iPhone 14 ofrece un rendimiento excepcional, un sistema de cámara avanzado y una seguridad inigualable. El ecosistema de Apple en su máxima expresión.',
            images: ['img/iphone-14.jpg', 'img/iphone-14-2.jpg', 'img/iphone-14-3.jpg']
        },
        'prod_04': {
            name: 'Samsung Galaxy S23 Ultra',
            price: 1200,
            description: 'El teléfono más avanzado de Samsung. Con la mejor cámara del mercado, un rendimiento sin igual y el S Pen integrado para llevar tu productividad a otro nivel.',
            images: ['img/samsung-s23-ultra.jpg', 'img/samsung-s23-ultra-2.jpg', 'img/samsung-s23-ultra-3.jpg']
        },
        'prod_05': {
            name: 'Laptop HP Spectre x360',
            price: 1500,
            description: 'La combinación perfecta de potencia y portabilidad. La HP Spectre x360 es una laptop convertible 2 en 1 con pantalla táctil, ideal para creativos y profesionales.',
            images: ['img/hp-spectre.jpg', 'img/hp-spectre-2.jpg', 'img/hp-spectre-3.jpg']
        },
        'prod_06': {
            name: 'MacBook Pro M3',
            price: 2500,
            description: 'Rendimiento y eficiencia inigualables con el chip M3 de Apple. La MacBook Pro es la herramienta definitiva para diseñadores, desarrolladores y editores de video.',
            images: ['img/macbook-pro-m3.jpg', 'img/macbook-pro-m3-2.jpg', 'img/macbook-pro-m3-3.jpg']
        },
        'prod_07': {
            name: 'Samsung Galaxy Watch 6',
            price: 350,
            description: 'Un reloj inteligente con estilo y funcionalidad. Monitorea tu salud, recibe notificaciones y paga con tu muñeca. Es el complemento perfecto para tu teléfono.',
            images: ['img/samsung-galaxy-watch-6.jpg', 'img/samsung-galaxy-watch-6-2.jpg', 'img/samsung-galaxy-watch-6-3.jpg']
        },
        'prod_08': {
            name: 'Auriculares Sony WH-1000XM5',
            price: 300,
            description: 'Cancelación de ruido líder en la industria. Los auriculares Sony WH-1000XM5 ofrecen una experiencia de sonido inmersiva y un diseño ultraligero y cómodo.',
            images: ['img/sony-wh-1000xm5.jpg', 'img/sony-wh-1000xm5-2.jpg', 'img/sony-wh-1000xm5-3.jpg']
        },
        'prod_09': {
            name: 'AirPods Pro (2da gen)',
            price: 250,
            description: 'Los AirPods Pro con audio adaptativo que se ajusta a tu entorno. Disfruta de una calidad de sonido superior y de una experiencia mágica con todos tus dispositivos Apple.',
            images: ['img/airpods-pro.jpg', 'img/airpods-pro-2.jpg', 'img/airpods-pro-3.jpg']
        },
        'prod_10': {
            name: 'Monitor Curvo Samsung de 27 pulgadas',
            price: 280,
            description: 'Un monitor curvo que te envuelve en la acción. Perfecto para gaming, trabajo y multimedia, con colores vibrantes y un diseño minimalista.',
            images: ['img/monitor-samsung.jpg', 'img/monitor-samsung-2.jpg', 'img/monitor-samsung-3.jpg']
        }
    };

    let cart = [];

    const productCards = document.querySelectorAll('.product-card');
    const buyButtons = document.querySelectorAll('.buy-button');

    const productModal = document.getElementById('product-modal');
    const cartModal = document.getElementById('cart-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const openCartButton = document.getElementById('open-cart-button');
    const checkoutButton = document.getElementById('checkout-button');

    // Funciones para abrir y cerrar modales
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.modal-overlay'));
        });
    });

    // Cerrar modal haciendo clic fuera de la ventana
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });

    // Abrir modal del carrito
    openCartButton.addEventListener('click', () => {
        updateCart();
        openModal(cartModal);
    });

    // Llenar el modal de producto
    productCards.forEach(card => {
        const productId = card.dataset.productId;
        card.addEventListener('click', (e) => {
            // No abrir el modal si se hizo clic en el botón de comprar
            if (e.target.classList.contains('buy-button')) {
                return;
            }
            const product = products[productId];
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = `$${product.price}`;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-main-image').src = product.images[0];
            document.getElementById('modal-add-to-cart').dataset.productId = productId;
            
            const thumbnailContainer = document.getElementById('modal-thumbnail-container');
            thumbnailContainer.innerHTML = '';
            product.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = `Thumbnail ${index + 1}`;
                if (index === 0) {
                    img.classList.add('active');
                }
                img.addEventListener('click', () => {
                    document.getElementById('modal-main-image').src = image;
                    // Remover 'active' de todas las miniaturas y añadirlo a la seleccionada
                    thumbnailContainer.querySelectorAll('img').forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    img.classList.add('active');
                });
                thumbnailContainer.appendChild(img);
            });
            openModal(productModal);
        });
    });

    // Lógica para añadir productos al carrito
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.dataset.productId;
            const product = products[productId];
            cart.push({ id: productId, name: product.name, price: product.price });
            updateCart();
            openModal(cartModal);
        });
    });

    // Lógica para añadir productos al carrito desde el modal de producto
    const modalAddToCartButton = document.getElementById('modal-add-to-cart');
    if (modalAddToCartButton) {
        modalAddToCartButton.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const product = products[productId];
            cart.push({ id: productId, name: product.name, price: product.price });
            updateCart();
            closeModal(productModal);
            openModal(cartModal);
        });
    }

    // Llenar los selectores de envío y actualizar el carrito
    const provinceSelect = document.getElementById('province-select');
    const cantonSelect = document.getElementById('canton-select');
    const parishSelect = document.getElementById('parish-select');

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

    if (provinceSelect) {
        populateSelect(provinceSelect, shippingData, 'Selecciona una provincia...');
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

    // Función principal para actualizar el carrito
    function updateCart() {
        const cartItemsDiv = document.getElementById('modal-cart-items');
        const cartTotalSpan = document.getElementById('cart-total-price');
        
        if (!cartItemsDiv || !cartTotalSpan) return;

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
                <span>$${item.price.toFixed(2)}</span>
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
        
        if (cart.length > 0 && checkoutButton) {
            checkoutButton.style.display = 'block';
        } else if (checkoutButton) {
            checkoutButton.style.display = 'none';
        }
    }

    // Lógica para el botón de Pagar
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const selectedProvince = provinceSelect.value;
            const selectedCanton = cantonSelect.value;
            const selectedParish = parishSelect.value;

            let shippingCost = 0;
            if (selectedProvince && selectedCanton && selectedParish) {
                shippingCost = shippingData[selectedProvince][selectedCanton][selectedParish];
            }

            const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
            const total = subtotal + (shippingCost || 0);

            localStorage.setItem('totalPrice', total.toFixed(2));
            localStorage.setItem('shippingCost', (shippingCost || 0).toFixed(2));

            window.location.href = 'pago-transferencia.html';
        });
    }

    // Lógica de pago-transferencia.html
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
});
