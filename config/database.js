import { Sequelize } from "sequelize";

const db = new Sequelize('manajemen_spp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;