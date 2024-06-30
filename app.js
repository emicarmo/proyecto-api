const RestApiServer = require('./1.Presentation/RestApi/rest.server.js');
const FrontServer = require('./1.Presentation/Frontend/front.server.js');

(async()=>{
    await main();
})()


//entry point function
async function main(){

    const restApiServer = new RestApiServer();
    const frontServer = new FrontServer();
    
    restApiServer.start();
    frontServer.start();

}