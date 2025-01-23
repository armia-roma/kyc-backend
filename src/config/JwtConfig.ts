export default {
	jwtSecret: process.env.TOKEN_SECRET || "secret",
	jwtExpiration: "1h", // Token expiration time
};
