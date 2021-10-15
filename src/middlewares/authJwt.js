import jwt from "jsonwebtoken";
import config from "../config";
import modelUser from "../users/models/users";
import modelRole from "../users/models/roles";

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) return res.status(403).json({ msg: "token not provided" });

		const decoded = jwt.verify(token, config.SECRET);
		req.userId = decoded.id;

		const user = await modelUser.findById(req.userId, { password: 0 });
		if (!user) res.status(404).json({ msg: "token not valid" });

		next();
	} catch (error) {
		res.status(401).json({ msg: "Unauthorized" });
	}
};

export const isModerator = async (req, res, next) => {
	const haveRole = await isRole(req.userId, "moderator");
	if (haveRole) {
		next();
		return;
	}
	res.status(401).json({ msg: "Unauthorized" });
};

export const isAdmin = async (req, res, next) => {
	const haveRole = await isRole(req.userId, "admin");
	if (haveRole) {
		next();
		return;
	}
	res.status(401).json({ msg: "Unauthorized" });
};

const isRole = async (userId, searchRole) => {
	let isRole = false;
	const user = await modelUser.findById(userId);
	const roles = await modelRole.find({ _id: { $in: user.roles } });
	roles.forEach((role) => {
		if (role.name == searchRole) {
			isRole = true;
		}
	});
	return isRole;
};
