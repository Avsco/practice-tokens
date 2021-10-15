import mongoose from "mongoose";

mongoose
	.connect("mongodb://localhost/companydb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((db) => console.log("Db is conected"))
	.catch((error) => console.log("Fail to conect database", error));
