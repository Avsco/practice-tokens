export default class Service {
	_model = null;

	constructor(model) {
		this._model = model;
	}

	async getAll() {
		const response = await this._model.find();
		return response;
	}

	async index(id) {
		const response = await this._model.findById(id);
		return response;
	}

	async update(id, object) {
		const response = await this._model.findByIdAndUpdate(id, object, { new: true });
		return response;
	}

	async create(object) {
		const newSchema = new this._model(object);
		const schemaSaved = await newSchema.save();
		return schemaSaved;
	}

	async delete(id) {
		const response = await this._model.findByIdAndDelete(id);
		return response;
	}
}
