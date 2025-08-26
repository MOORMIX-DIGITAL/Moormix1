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
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
        
        // Obtenemos los valores de los campos
        const nombre = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('message').value;

        // Una validación simple
        if (nombre && email && mensaje) {
            alert('¡Mensaje enviado con éxito! Gracias por tu contacto.');
            // Aquí en el futuro podrías enviar los datos a un servidor
            formulario.reset(); // Limpia el formulario
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});
