import Role from "../users/models/roles";

export const createRoles = async () => {
	const count = await Role.estimatedDocumentCount();

	if (count > 0) return;

	try {
		const values = await Promise.all([
			new Role({ name: "user" }).save(),
			new Role({ name: "admin" }).save(),
			new Role({ name: "moderator" }).save(),
		]);
		console.log(values);
	} catch (error) {
		console.log(error);
	}
};
