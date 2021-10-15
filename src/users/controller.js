export default class Controller {
	_service;

	constructor(service) {
		this._service = service;
	}

	signUp = async (req, res) => {
		const body = req.body;
		const response = await this._service.signUp(body);
		res.status(201).json(response);
	};

	signIn = async (req, res) => {
		const body = req.body;

		const response = await this._service.signIn(body);
		res.status(200).json(response);
	};
}
