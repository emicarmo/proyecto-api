class Libros {
    constructor(id_libros, nombre, categoria_id, editorial, precio, stock, descripcion, imagen) {
        this.id_libros = id_libros,
        this.nombre = nombre,
        this.categoria_id = categoria_id,
        this.editorial = editorial,
        this.precio = precio,
        this.stock = stock,
        this.descripcion = descripcion,
        this.imagen = imagen
    }
}

module.exports = Libros;