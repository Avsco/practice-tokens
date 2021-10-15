export default class Controller {
	_service;

	constructor(service) {
		this._service = service;
	}

	getAll = async (req, res) => {
		const response = await this._service.getAll();
		res.status(200).json(response);
	};

	index = async (req, res) => {
		const id = req.params.id;

		const response = await this._service.index(id);
		res.status(200).json(response);
	};

	update = async (req, res) => {
		const id = req.params.id;
		const body = req.body;

		const response = await this._service.update(id, body);
		res.status(200).json(response);
	};

	create = async (req, res) => {
		const body = req.body;

		const response = await this._service.create(body);
		res.status(201).json(response);
	};

	delete = async (req, res) => {
		const id = req.params.id;

		const response = await this._service.delete(id);
		res.status(200).json(response);
	};
}
