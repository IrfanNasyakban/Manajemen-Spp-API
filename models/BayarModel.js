import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Bayar = db.define('bayar', {
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING,
    semester: DataTypes.STRING,
    jumlah: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Bayar;

(async()=> {
    await db.sync();
})();