const { CategoryRepository } = require('../../3.Persistence/DAO.MySql');


class CategoryModel {
    constructor(){
        this.repository = new CategoryRepository();
    }
    //TODO: Create a standard response object to be returned.

    async getAll(){
        return await this.repository.findAll();
    }

    async getById(id){
        return await this.repository.findById(id);
    }
    
}


module.exports = CategoryModel;