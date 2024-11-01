import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { productManager } from './product-manager.js'


export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getAllCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf8');
                const cartsJSON = JSON.parse(carts);
                return cartsJSON;
            } else {
                return [];
            }

        }
        catch (error) {
            throw new Error(error);
        }
    }

    async createCart() {
        try {
            const newCart = {
                id: uuidv4(),
                products: []
            };
            const carts = await this.getAllCarts();
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return newCart;
        }
        catch (error) {
            throw new Error(error);
        }

    }

    async getCartById(id) {
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find((cart) => cart.id === id);
            if (!cart) {
                throw new Error('Cart not found');
            }
            return cart;
        }
        catch (error) {
            throw new Error(error);
        }

    }


    async addProdToCart(idCart, idProduct) {
        try {
            const prodExist = await productManager.getProdById(idProduct);
            if (!prodExist) {
                throw new Error('Product not found');
            }
    
            const currentCarts = await this.getAllCarts();
            const cartExists = await this.getCartById(idCart);
            if (!cartExists) {
                throw new Error('Cart not found');
            }
    
            const productAlreadyInCart = cartExists.products.find((product) => product.id === idProduct);
            if (!productAlreadyInCart) {
                const product = {
                    id: idProduct,
                    quantity: 1
                };
                cartExists.products.push(product);
            } else {
                productAlreadyInCart.quantity++;
            }
    
            const updatedCart = currentCarts.map((cart) => 
                cart.id === idCart ? cartExists : cart 
            );
    
            await fs.promises.writeFile(this.path, JSON.stringify(updatedCart));
            return cartExists;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    


    async deleteAllCarts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([]));
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

export const cartManager = new CartManager(path.join(process.cwd(), "src/data/carts.json"));

