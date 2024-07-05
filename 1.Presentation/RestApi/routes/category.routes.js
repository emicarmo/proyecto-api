const { Router } = require('express');
const CategoryController = require('../controllers/category.controller');

const router = Router();
const categoryController = new CategoryController(); 


// Query Routes Definition:
// Note: Routes must be specified from most specific to least specific.
/// Es necesario bindear hacia la instancia de la clase para que no se pierda el contexto *
router.get('/', categoryController.getAll.bind(categoryController));
router.get('/:id', categoryController.getById.bind(categoryController));


module.exports = router;