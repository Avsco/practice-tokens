import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./lib/initialSetup";

import products from "./products";
import users from "./users";

const app = express();
createRoles();

app.use(morgan("dev"));
app.use(express.json());

app.set("pkg", pkg);

app.get("/", (req, res) => {
	res.json({
		autor: app.get("pkg").autor,
		name: app.get("pkg").name,
		description: app.get("pkg").description,
		version: app.get("pkg").version,
	});
});

app.use(products);
app.use(users);

export default app;
