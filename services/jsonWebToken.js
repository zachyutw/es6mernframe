import jwt from 'jsonwebtoken';

const getToken = (data, jwtSecrect, expireMinutes) => {
	const token = jwt.sign(data, jwtSecrect, {
		expiresIn: 60 * 24 * 3 * expireMinutes
	});
	return token;
};

const decodedToken = (token, jwtSecrect) => {
	return jwt.verify(token, jwtSecrect, (err, decoded) => (err ? {} : decoded));
};
const jsonWebToken = {
	getToken,
	decodedToken
};
export default jsonWebToken;
