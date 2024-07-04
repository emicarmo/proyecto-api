const baseRepository = require('./base.repository');

class CategoryRepository extends baseRepository{
    constructor(){
        super('categoria');
    }
}

module.exports = CategoryRepository;