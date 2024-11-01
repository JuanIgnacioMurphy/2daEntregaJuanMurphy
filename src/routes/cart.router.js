import { Router } from "express";
import { cartManager } from "../managers/cart-manager.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

router.get('/:idCart', async (req, res) => {
    try {
        const { idCart } = req.params;
        res.json(await cartManager.getCartById(idCart));
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}
);

router.get('/', async (req, res) => {
    try {
        const allCarts = await cartManager.getAllCarts();
        res.json(allCarts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

router.post('/:idCart/product/:idProduct', async (req, res)=> {

    try {
        const {idProduct} = req.params;
        const {idCart} = req.params;
        const addingProdToCart = await cartManager.addProdToCart(idCart, idProduct);
        res.json(addingProdToCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.delete('/', async (req, res) => {
    try {
        await cartManager.deleteAllCarts();
        res.status(200).json({ message: 'All carts deleted' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:idCart/product/:idProduct', async (req, res) => {
    try {
        const { idProduct, idCart } = req.params;
        const updatedCart = await cartManager.removeProdFromCart(idCart, idProduct);
        res.status(200).json({ 
            message: `Product with ID '${idProduct}' deleted from cart with ID '${idCart}'`,
            updatedCart 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;