import express from 'express';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/products', productRouter);




app.listen(8080, () => console.log('Server running OK on port 8080'));

