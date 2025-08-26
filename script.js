document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones con la clase 'buy-button'
    const botonesComprar = document.querySelectorAll('.buy-button');

    // Itera sobre cada botón para agregar un evento de clic
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            alert('¡Producto añadido al carrito!');
            // En el futuro, aquí se añadiría la lógica real para el carrito de compras
        });
    });
});
