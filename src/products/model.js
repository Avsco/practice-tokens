import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		name: String,
		category: String,
		price: Number,
		imageUrl: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("product", schema);
