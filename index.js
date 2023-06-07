import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import SiswaRoute from "./routes/SiswaRoute.js"
import BayarRoute from "./routes/BayarRoute.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(SiswaRoute);
app.use(BayarRoute);

app.listen(5000, ()=> console.log("Server Sedang berjalan di http://localhost:5000"));