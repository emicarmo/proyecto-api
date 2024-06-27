/* En este archivo (no confundir con la biblioteca Validator.js) usaremos joi, biblioteca de validacion que permite definir esquemas usando la estructura de los campos de las tablas de la base de datos y luego validarlos contra objetos recibidos. Se usa principalmente en controllers y/o models asegurando asi que los datos recibidos sean validados antes de llegar a la capa de repositories */

const Joi = require('joi');

class Validator {
    constructor() {
        this.userSchema = Joi.object({
            usuario: Joi.string().max(45).required(),
            email: Joi.string().email().max(100).required(),
            contrasena: Joi.string().min(8).max(45).required(),
            nombre: Joi.string().max(45).required(),
            apellido: Joi.string().max(45).required(),
            fecha_nacimiento: Joi.date().optional().allow(null),
            telefono: Joi.string().max(45).required(),
            direccion: Joi.string().max(255).required(),
            ciudad: Joi.string().max(100).required(),
            provincia: Joi.string().max(100).required(),
            pais: Joi.string().max(45).required(),
            codigo_postal: Joi.string().max(45).required(),
            rol: Joi.string().valid('administrador', 'cliente').default('cliente'),
            estado: Joi.string().valid('activo', 'inactivo').default('activo')
        });

        this.categorySchema = Joi.object({
            nombre_cat: Joi.string().max(45).required()
        });

        this.bookSchema = Joi.object({
            nombre: Joi.string().max(200).required(),
            categoria_id: Joi.number().integer().required(),
            editorial: Joi.string().max(200).required(),
            precio: Joi.number().precision(2).required(),
            stock: Joi.number().integer().required(),
            descripcion: Joi.string().required(),
            imagen: Joi.string().max(250).optional().allow(null)
        });

        this.cartSchema = Joi.object({
            usuario_id: Joi.number().integer().required()
        });

        this.cartDetailSchema = Joi.object({
            carrito_id_carrito: Joi.number().integer().required(),
            libros_id: Joi.number().integer().required(),
            cantidad_producto: Joi.number().integer().required(),
            precio_total: Joi.number().precision(2).required()
        });
    }

    validateUser(user) {
        const { error } = this.userSchema.validate(user);
        if (error) {
            throw new Error(`Dato usuario invalido: ${error.message}`);
        }
    }

    validateCategory(category) {
        const { error } = this.categorySchema.validate(category);
        if (error) {
            throw new Error(`Dato categoria invalido: ${error.message}`);
        }
    }

    validateBook(book) {
        const { error } = this.bookSchema.validate(book);
        if (error) {
            throw new Error(`Dato libro invalido: ${error.message}`);
        }
    }

    validateCart(cart) {
        const { error } = this.cartSchema.validate(cart);
        if (error) {
            throw new Error(`Dato carrito invalido: ${error.message}`);
        }
    }

    validateCartDetail(cartDetail) {
        const { error } = this.cartDetailSchema.validate(cartDetail);
        if (error) {
            throw new Error(`Dato detalle carrito invalido: ${error.message}`);
        }
    }

}

module.exports = new Validator();

