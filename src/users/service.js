import jwt from "jsonwebtoken";
import config from "../config";

export default class Service {
	_userModel = null;
	_roleModel = null;

	constructor(userModel, roleModel) {
		this._userModel = userModel;
		this._roleModel = roleModel;
	}

	async signIn({ password, email }) {
		const modelFound = await this._userModel.findOne({ email }).populate("roles");
		if (!modelFound) return null;
		const matchPassword = await this._userModel.comparePassword(password, modelFound.password);
		if (!matchPassword) return null;

		const token = jwt.sign({ id: modelFound._id }, config.SECRET, { expiresIn: 86400 });

		return { token };
	}

	async signUp({ username, password, email, roles }) {
		const newModel = new this._userModel({
			username,
			password: await this._userModel.encryptPassword(password),
			email,
		});

		if (roles) {
			const foundRoles = await this._roleModel.find({ name: { $in: roles } });
			newModel.roles = foundRoles.map((role) => role._id);
		} else {
			const role = await this._roleModel.findOne({ name: "user" });
			newModel.roles = [role._id];
		}

		const modelSaved = await newModel.save();

		const token = jwt.sign({ id: modelSaved._id }, config.SECRET, {
			expiresIn: 86400, //24 hours
		});

		return { token };
	}
}
