const path = require('path');


const upload_dir_name = 'images';
const uploadPath = path.join(__dirname, '../../', upload_dir_name);
const serverUrl = 'https://proyecto-api-q9a2.onrender.com'

async function upload(file){

    if(!file || Object.keys(file) === 0 || !file.imagen){
        throw new Error("No se ha subido ninguna imagen");
    }

    const fileName = file.imagen.name.replace(/ /g, '_');

    try{
        await new Promise((resolve, reject)=>{
            file.imagen.mv(`${uploadPath}/${fileName}`, (err)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve();
                }
            });

        });
        return `${serverUrl}/${upload_dir_name}/${fileName}`
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {upload};
