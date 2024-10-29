import express from 'express';
import UserManager from './managers/user-manager.js';
import { userValidator } from './middlewares/user.validator.js';


const userManager = new UserManager('./users.json');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/users', async (req, res) => {
    try {
        const users = await userManager.getUsers(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userManager.getUserById(id);
        res.status(200).json({name: user.name, email: user.email, id: user.id});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.post('/users/', userValidator, async (req, res) => {
    try {
        const user = await userManager.createUser(req.body);
        res.status(201).json({name: user.name, id: user.id, email: user.email});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const userToDelete = await userManager.deleteUser(id);
        res.status(200).json({message: `User ID ${userToDelete.id} deleted`});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.delete('/users/', async (req, res) => {
    try {
        await userManager.deleteAll();
        res.status(200).json({message: 'All users deleted'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedUser = await userManager.updateUser(req.body, id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.listen(8080, () => console.log('Server OK on port 8080'));

