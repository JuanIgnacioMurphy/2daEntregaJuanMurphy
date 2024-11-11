import express from 'express';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import morgan from 'morgan';
import path from 'path';



const app = express();

app.use('/static', express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);




app.listen(8080, () => console.log('Server running OK on port 8080'));

