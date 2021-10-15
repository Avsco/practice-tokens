import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const schema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		roles: [
			{
				type: Schema.Types.ObjectId,
				ref: "role",
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

schema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const newPassword = await bcrypt.hash(password, salt);
	return newPassword;
};

schema.statics.comparePassword = async (password, receivedPassword) => {
	const isSamePassword = await bcrypt.compare(password, receivedPassword);
	return isSamePassword;
};

export default model("user", schema);
