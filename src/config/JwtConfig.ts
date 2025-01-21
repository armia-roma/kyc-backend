export default {
	jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
	jwtExpiration: "1h", // Token expiration time
};
