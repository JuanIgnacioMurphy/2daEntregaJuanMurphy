const clientSocket = io();

clientSocket.on('connect', () => {
    console.log('Connected to server');
});

const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const products = document.getElementById('products');

form.onsubmit = (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    clientSocket.emit('addProduct', { name, price });
};

clientSocket.on('productsArray', (array) => {
    products.innerHTML = '';
    array.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        products.appendChild(li);
    });
})