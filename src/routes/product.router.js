import { Router } from "express";
import { productManager } from "../managers/product-manager.js";
import { productValidator } from "../middlewares/product.validator.js";



const router = Router();



router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productManager.getProdById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.post('/', productValidator , async (req, res) => {
    try {
        const product = await productManager.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const productToDelete = await productManager.deleteProduct(id);
        res.status(200).json({message: `Product with ID ${productToDelete.id} deleted successfully`});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.delete('/', async (req, res) => {
    try {
        await productManager.deleteAllProducts();
        res.status(200).json({message: 'All products deleted'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedProduct = await productManager.updateProduct(req.body, id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})


export default router;

