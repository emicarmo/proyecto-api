// App
const express = require('express');
const app = express();
const router = require('./app/restApi/middlewares/auth');

// Port
const PORT = process.env.PORT || 5000;

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log(`Servidor api corriendo en el puerto ${PORT}`);
});