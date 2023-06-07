import Bayar from "../models/BayarModel.js";
import path from "path";
import fs from "fs";

export const getBayar = async (req, res) => {
  try {
    const response = await Bayar.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBayarById = async (req, res) => {
  try {
    const response = await Bayar.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveBayar = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const nama = req.body.nama;
  const kelas = req.body.kelas;
  const semester = req.body.semester;
  const jumlah = req.body.jumlah;
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
      await Bayar.create({
        nama: nama,
        kelas: kelas,
        semester: semester,
        jumlah: jumlah,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Bayar Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateBayar = async (req, res) => {
  const bayar = await Bayar.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!bayar) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = bayar.image;
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

    const filepath = `./public/images/${bayar.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const nama = req.body.nama;
  const kelas = req.body.kelas;
  const semester = req.body.semester;
  const jumlah = req.body.jumlah;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Bayar.update(
      {
        nama: nama,
        kelas: kelas,
        semester: semester,
        jumlah: jumlah,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Bayar Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBayar = async (req, res) => {
  const bayar = await Bayar.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!bayar) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${bayar.image}`;
    fs.unlinkSync(filepath);
    await Bayar.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Bayar Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
