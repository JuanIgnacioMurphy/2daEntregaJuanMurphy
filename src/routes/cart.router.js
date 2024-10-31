import { Router } from "express";
import CartManager from "../managers/cart-manager.js";

const cartManager = new CartManager("./carts.json");

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
        res.json(await cartManager.getCartById(req.params.idCart));
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}
)



export default router;