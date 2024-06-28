const { request, response } = require('express');
const { UserModel } = require('../../../2.Domain/Models/index');
const validator = require('../../../Utils/validator');

class UsersController {
    constructor() {
        this.model = new UserModel();
    }

    // Query functions
    async getAll(req = request, res = response) {
        try {
            const result = await this.model.getAll();
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req = request, res = response) {
        try {
            const id = req.params.id;
            const result = await this.model.getById(id);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByEmail(req = request, res = response) {
        try {
            const email = req.params.email;
            const result = await this.model.findByEmail(email);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async isEmailRegistered(req = request, res = response) {
        try {
            const email = req.params.email;
            const result = await this.model.isEmailRegistered(email);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async verifyCredentials(req = request, res = response) {
        try {
            const { email, password } = req.body;
            const result = await this.model.verifyCredentials(email, password);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Commands functions
    async createUser(req = request, res = response) {
        try {
            const userEntity = req.body;
            validator.validateUser(userEntity);
            const result = await this.model.add(userEntity);
            res.json({ result, userEntity });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req = request, res = response) {
        try {
            const id = req.params.id;
            const userEntity = req.body;
            validator.validateUser(userEntity);
            const result = await this.model.update(userEntity, id);
            res.json({ result, id, userEntity });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req = request, res = response) {
        try {
            const id = req.params.id;
            const result = await this.model.delete(id);
            res.json({ result, id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}


module.exports = UsersController;

