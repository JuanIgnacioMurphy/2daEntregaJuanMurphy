import express from 'express';
import handlebars from 'express-handlebars';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

import { productManager } from './managers/product-manager.js';

import morgan from 'morgan';
import path from 'path';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "src", "public")));
app.use(morgan("tiny"));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/', viewsRouter);


const httpServer = app.listen(8080, () => console.log('Server running OK on port 8080'));

const socketServer = new Server(httpServer);


socketServer.on('connection', async (socket) => {
    const productsArray = await productManager.getProducts();
    socketServer.emit('productsArray', productsArray);
    console.log(`Connection established, user ${socket.id} is online`)

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)
    })


    socket.on('addProduct', async (product) => {
        await productManager.createProduct(product);
        const updatedProducts = await productManager.getProducts();
        socketServer.emit('productsArray', updatedProducts);
    });
    


})




