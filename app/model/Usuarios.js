class Usuarios{
    constructor(id_usuario, usuario, email, password, nombre, apellido, fecha_nacimiento, telefono, direccion, ciudad, provincia, pais, codigo_postal, rol, status) {
        this.id_usuario = id_usuario,
        this.usuario = usuario,
        this.email = email,
        this.password = password,
        this.nombre = nombre,
        this.apellido = apellido,
        this.fecha_nacimiento = fecha_nacimiento,
        this.telefono = telefono,
        this.direccion = direccion,
        this.ciudad = ciudad,
        this.provincia = provincia,
        this.pais = pais,
        this.codigo_postal = codigo_postal,
        this.rol = rol,
        this.status = status
    }
}

module.exports = Usuarios

