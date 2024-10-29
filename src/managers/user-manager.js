import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export default class UserManager {
    constructor(path) {
        this.path = path;
    }

    #createHash(user) {
        user.key = crypto.randomBytes(128).toString()
        user.password = crypto.createHmac('sha256', user.key).update(user.password).digest('hex');
    };

    async getUsers() {
        try {
            if (fs.existsSync(this.path)) {
                const usersJson = await fs.promises.readFile(this.path, 'utf8');
                const users = JSON.parse(usersJson);
                return users;
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(obj) {
        try {
            const user = {
                id: uuidv4(),
                name: obj.name,
                email: obj.email,
                password: obj.password,
            }

            const users = await this.getUsers();

            const userExist = users.find((i) => i.email === user.email);
            if (userExist) throw new Error('User already exists');

            this.#createHash(user);


            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));

            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }


    async getUserById(id) {
        try {
            const users = await this.getUsers();
            if(users.lenght = 0) {
                throw new Error('Users list is empty')
            } else {
                const user = users.find((i) => i.id === id);
                if (!user) throw new Error('User not found');
                return user;
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(obj, id) {
        try {
            const users = await this.getUsers();
            const userId = await this.getUserById(id);

            const user = {...userId, ...obj};

            if(obj.password) {
                this.#createHash(user);
            }

            const newUsers = users.filter((i) => i.id !== id);

            newUsers.push(user);

            await fs.promises.writeFile(this.path, JSON.stringify(newUsers));
            return user;
        } catch {
            throw new Error(error);
        }
    }


    async deleteUser(id) {
        try {
            const user = await this.getUserById(id);
            const users = await this.getUsers();
            const newUsers = users.filter((i) => i.id!== id);

            await fs.promises.writeFile(this.path, JSON.stringify(newUsers));
            return user;

        } catch {
            throw new Error(error);
        }

}

    async deleteAll() {
        try {
            const users = await this.getUsers();
            if (users.lenght = 0) {
                return 'Users list is empty';
            } 
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return 'All users deleted';
        } catch {
            throw new Error(error);
        }
    }

}
