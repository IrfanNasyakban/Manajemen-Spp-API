import Siswa from "../models/SiswaModel.js";
import path from "path";
import fs from "fs";

export const getSiswa = async (req, res) => {
  try {
    const response = await Siswa.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSiswaById = async (req, res) => {
  try {
    const response = await Siswa.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveSiswa = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const nama = req.body.nama;
  const email = req.body.email;
  const kelas = req.body.kelas;
  const nis = req.body.nis;
  const ttl = req.body.ttl;
  const alamat = req.body.alamat;
  const wali_kelas = req.body.wali_kelas;
  const ayah = req.body.ayah;
  const pekerjaan_ayah = req.body.pekerjaan_ayah;
  const ibu = req.body.ibu;
  const pekerjaan_ibu = req.body.pekerjaan_ibu;
  const no_hp = req.body.no_hp;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Siswa.create({
        nama: nama,
        email: email,
        kelas: kelas,
        nis: nis,
        ttl: ttl,
        alamat: alamat,
        wali_kelas: wali_kelas,
        ayah: ayah,
        pekerjaan_ayah: pekerjaan_ayah,
        ibu: ibu,
        pekerjaan_ibu: pekerjaan_ibu,
        no_hp: no_hp,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Siswa Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!siswa) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = siswa.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${siswa.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const nama = req.body.nama;
  const email = req.body.email;
  const kelas = req.body.kelas;
  const nis = req.body.nis;
  const ttl = req.body.ttl;
  const alamat = req.body.alamat;
  const wali_kelas = req.body.wali_kelas;
  const ayah = req.body.ayah;
  const pekerjaan_ayah = req.body.pekerjaan_ayah;
  const ibu = req.body.ibu;
  const pekerjaan_ibu = req.body.pekerjaan_ibu;
  const no_hp = req.body.no_hp;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Siswa.update(
      { 
        nama: nama,
        email: email,
        kelas: kelas,
        nis: nis,
        ttl: ttl,
        alamat: alamat,
        wali_kelas: wali_kelas,
        ayah: ayah,
        pekerjaan_ayah: pekerjaan_ayah,
        ibu: ibu,
        pekerjaan_ibu: pekerjaan_ibu,
        no_hp: no_hp,
        image: fileName, 
        url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Siswa Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSiswa = async(req, res)=>{
    const siswa = await Siswa.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!siswa) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${siswa.image}`;
        fs.unlinkSync(filepath);
        await Siswa.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Siswa Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}