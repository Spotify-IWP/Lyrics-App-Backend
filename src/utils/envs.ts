const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET!;
const dbURL = process.env.DB_URL!;

export {
    port,
    jwtSecret,
    dbURL,
};
