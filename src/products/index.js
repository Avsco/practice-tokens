import Routes from "./routes";
import Controller from "./controller";
import Service from "./service";
import model from "./model";

const service = new Service(model);
const controller = new Controller(service);
const routes = new Routes(controller);

export default routes.getRouter();
