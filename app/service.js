const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Mi api');
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});