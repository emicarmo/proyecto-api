const path = require('path');



const uploadPath = path.join(__dirname, '../../Frontend/', 'public', 'images');
const baseImagePath = "image/";

async function upload(file){

    if(!file || Object.keys(file) === 0 || !file.imagen){
        throw new Error("No se ha subido ninguna imagen");
    }

    const fileName = file.imagen.name.replace(/ /g, '_');

    try{
        file.imagen.mv(`${uploadPath}/${fileName}`, (err)=>{
            if(err){
                console.log(err);
                throw new Error(err);
            }
        });
        return `${baseImagePath}${fileName}`
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {upload};