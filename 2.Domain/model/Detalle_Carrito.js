class Detalle_Carrito {
    constructor(carrito_id_carrito, libros_id, cantidad_producto) {
        this.carrito_id_carrito = carrito_id_carrito,
        this.libros_id = libros_id,
        this.cantidad_producto = cantidad_producto
    }
}

module.exports = Detalle_Carrito;