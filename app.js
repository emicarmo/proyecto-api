const RestApiServer = require('./1.Presentation/RestApi/rest.server');
const FrontServer = require('./1.Presentation/Frontend/front.server')

const restApiServer = new RestApiServer();
const frontServer = new FrontServer();

restApiServer.start();
frontServer.start();