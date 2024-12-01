const productsSocket = io();

productsSocket.on('connection', () => {
    console.log('Connected to server');
});

// const mainContainer = document.getElementById('main-container');
// const productContainer = document.getElementById('product-container');

// const addProductForm = document.getElementById('products-form');
// const titleInput = document.getElementById('title');
// const descriptionInput = document.getElementById('description');
// const priceInput = document.getElementById('price');
// const stockInput = document.getElementById('stock');
// const categoryInput = document.getElementById('category');
// const productList = document.getElementById('product-display');

const productContainer = document.getElementById('product-container');
const productList = document.getElementById('product-display'); 

const addProductForm = document.getElementById('products-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const categoryInput = document.getElementById('category');



productsSocket.on('productsArray', (array) => {
    if (productContainer) {
        productContainer.innerHTML = ''; // Para realTimeProducts.handlebars
        array.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <h3>${product.title}</h3>
                <div class="details">
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                </div>
            `;
            productContainer.appendChild(productItem);
        });
    }

    if (productList) {
        productList.innerHTML = ''; // Para home.handlebars
        array.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.textContent = `${product.title} - $${product.price}`;
            productList.appendChild(productItem);
        });
    }
});

// Manejo del formulario de creación (solo en realTimeProducts.handlebars)
if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const price = parseFloat(priceInput.value);
        const stock = parseInt(stockInput.value);
        const category = categoryInput.value;

        productsSocket.emit('addProduct', { title, description, price, stock, category });
        addProductForm.reset();
    });
}



// productsSocket.on('productsArray', (array) => {
//     productContainer.innerHTML = '';
//     productList.innerHTML = '';
//     array.forEach((product) => {
//         const pshow = document.createElement('div');
//         const prodInList = document.createElement('div');
//         pshow.textContent = `${product.title} - $${product.price}`;
//         productContainer.appendChild(pshow);

//         prodInList.textContent = `${product.title} - $${product.price}`;
//         productList.appendChild(prodInList);
//     });

// });

// addProductForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const title = titleInput.value;
//     const description = descriptionInput.value;
//     const price = parseFloat(priceInput.value);
//     const stock = parseInt(stockInput.value);
//     const category = categoryInput.value;
//     productsSocket.emit('addProduct', { title, description, price, stock, category });
// });