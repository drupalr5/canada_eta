const jwt = require("jsonwebtoken");

const generateJwtToken = (profile) => {
	const { id, name, email, type, profile_path } = profile;
	secretkey = 'default';

	const user = {
		id,
		name,
		email,
		type,
		profile_path
	};
	return jwt.sign({ user }, secretkey, { expiresIn: "1y" });
}

module.exports = {
	generateJwtToken
};