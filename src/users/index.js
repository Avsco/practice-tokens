import Routes from "./routes";
import Controller from "./controller";
import Service from "./service";
import userModel from "./models/users";
import roleModel from "./models/roles";

const service = new Service(userModel, roleModel);
const controller = new Controller(service);
const routes = new Routes(controller);

export default routes.getRouter();
