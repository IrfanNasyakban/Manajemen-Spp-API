import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Siswa = db.define('siswa', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    kelas: DataTypes.STRING,
    nis: DataTypes.STRING,
    ttl: DataTypes.STRING,
    alamat: DataTypes.STRING,
    wali_kelas: DataTypes.STRING,
    ayah: DataTypes.STRING,
    pekerjaan_ayah: DataTypes.STRING,
    ibu: DataTypes.STRING,
    pekerjaan_ibu: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Siswa;

(async()=> {
    await db.sync();
})();