import { Router } from "express";

export default class Routes {
	ROUTE = "/products";
	_router = Router();
	_controller = null;

	constructor(controller) {
		this._controller = controller;
		this.initRouter();
	}

	initRouter() {
		this._router.post("/signup", this._controller.signUp);
		this._router.post("/signin", this._controller.signIn);
	}

	getRouter = () => this._router;
}
