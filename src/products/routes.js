import { Router } from "express";
import { verifyToken, isModerator } from "../middlewares";

export default class Routes {
	ROUTE = "/products";
	_router = Router();
	_controller = null;

	constructor(controller) {
		this._controller = controller;
		this.initRouter();
	}

	initRouter() {
		this._router.get(this.ROUTE, [verifyToken, isModerator], this._controller.getAll);
		this._router.get(`${this.ROUTE}/:id`, this._controller.index);
		this._router.post(this.ROUTE, this._controller.create);
		this._router.put(`${this.ROUTE}/:id`, this._controller.update);
		this._router.delete(`${this.ROUTE}/:id`, this._controller.delete);
	}

	getRouter = () => this._router;
}
