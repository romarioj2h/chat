module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        details: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'mysql'
        }
    }
}